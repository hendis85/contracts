const fs = require('fs');
const path = require('path');
const util = require('util');
const compressor = require('node-minify');
const simpleGit = require('simple-git/promise');
const childProcess = require('child_process');

const readdir = util.promisify(fs.readdir);
const exec = util.promisify(childProcess.exec);
const buildPath = path.join(__dirname, 'build', 'contracts');
const abiPath = path.join(__dirname, 'build', 'sol-interface');

const mainGit = simpleGit();
const solGit = simpleGit(abiPath);

const generateSOLInterface = () => new Promise((resolve, reject) => {
  if (fs.existsSync(buildPath)) {
    const contracts = {
      version: Date.now(),
      date: new Date().toDateString(),
    };
    readdir(buildPath).then(files => {
      files.forEach(file => {
        const { abi, networks, contractName } = JSON.parse(fs.readFileSync(path.join(buildPath, file)))
        if (abi.length && Object.keys(networks).length) {
          contracts[contractName] = { abi, address: Object.values(networks)[0].address }
        }
      });
      if (!fs.existsSync(abiPath)) {
        fs.mkdirSync(abiPath);
      }
      fs.writeFileSync(path.join(abiPath, 'index.js'), `module.exports = ${util.inspect(contracts, { depth: 10 })}`);
      compressor.minify({
        compressor: 'gcc',
        input: path.join(abiPath, 'index.js'),
        output: path.join(abiPath, 'index.js')
      }).then(() => {
        console.log('Done');
        resolve();
      })
      .catch(reject);
    });
  }
});

async function main() {
  try {
    await mainGit.fetch();
    let mainStatus = await mainGit.status();
    let solStatus = await solGit.status();
    if (solStatus.current !== mainStatus.current) {
      const solBranches = await solGit.branch();
      if (solBranches.all.find(item => item.includes(mainStatus.current))) {
        await solGit.checkout(mainStatus.current);
      } else {
        await solGit.checkoutBranch(mainStatus.current, solStatus.current);
      }
    }
    await mainGit.submoduleUpdate();
    console.log(mainStatus);
    const localChanges = mainStatus.files
      .filter(item => !(item.path.includes('build/sol-interface')
        || (process.env.NODE_ENV === 'development' && item.path.includes(process.argv[1].split('/').pop()))));
    if (mainStatus.behind || localChanges.length) {
      console.log('You have unsynced changes!', localChanges);
      process.exit(1);
    }
    console.log(process.argv);
    // const migrate = `truffle ${process.argv.slice(2).join(' ').trim()}`;
    // console.log('Running:', migrate);
    console.time('truffle migrate');
    const truffle = childProcess.spawn('truffle', process.argv.slice(2));
    truffle.stdout.on('data', data => {
      console.log(data.toString('utf8'));
    });
    truffle.stderr.on('data', data => {
      console.log(data.toString('utf8'));
      throw new Error('truffle error');
    });
    truffle.on('close', async code => {
      console.timeEnd('truffle migrate');
      console.log('truffle exit with code', code);
      if (code === 0) {
        await generateSOLInterface();
        mainStatus = await mainGit.status();
        solStatus = await solGit.status();
        const network = process.argv[process.argv.indexOf('--network') + 1];
        const now = new Date();
        const commit = `SOL Deployed to ${network} ${Date.now()}`
        const tag = `${network}-${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
        console.log(commit, tag);
        await solGit.add(solStatus.files.map(item => item.path));
        await solGit.commit(commit);
        await mainGit.add(mainStatus.files.map(item => item.path));
        await mainGit.commit(commit);
        await solGit.addAnnotatedTag(tag, commit);
        await mainGit.addAnnotatedTag(tag, commit);
        await solGit.push();
        await mainGit.push();
        // solGit.add()
      } else {
        await mainGit.reset('hard');
        process.exit(1);
      }
    });
    // console.log(truffleStatus.toString('utf8'));
  } catch (e) {
    if (e.output) {
      e.output.forEach(buff => {
        if (buff && buff.toString) {
          console.log(buff.toString('utf8'));
        }
      });
    } else {
      console.warn('Error', e);
    }
    await mainGit.reset('hard');
  }
}

main();
