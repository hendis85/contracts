/*// deploy the following contracts:
// * 2Key Economy, coinbase is the owner
// * 2Key registry
// * sample contract for each type of campagin.
// * Use fake constractor parameters. coinbase is the contractor
/* global artifacts */

// const TwoKeyEconomy = artifacts.require('TwoKeyEconomy');
// const ERC20TokenMock = artifacts.require('ERC20TokenMock');
// const TwoKeyUpgradableExchange = artifacts.require('TwoKeyUpgradableExchange');
// const TwoKeyAdmin = artifacts.require('TwoKeyAdmin');
// const EventSource = artifacts.require('TwoKeyEventSource');
// const TwoKeyReg = artifacts.require('TwoKeyReg');
//
// module.exports = function deploy(deployer) {
//   if (deployer.network.startsWith('dev') || deployer.network === 'rinkeby-infura') {
//       deployer.deploy(ERC20TokenMock)
//       .then(() => deployer.deploy(TwoKeyUpgradableExchange, 1, '0xb3fa520368f2df7bed4df5185101f303f6c7decc', ERC20TokenMock.address))
//       .then(() => TwoKeyUpgradableExchange.deployed())
//       .then(() => deployer.deploy(TwoKeyAdmin, TwoKeyEconomy.address, '0xb3fa520368f2df7bed4df5185101f303f6c7decc', TwoKeyUpgradableExchange.address))
//       .then(() => TwoKeyAdmin.deployed())
//       .then(() => deployer.deploy(EventSource, TwoKeyAdmin.address))
//       .then(() => deployer.deploy(TwoKeyReg, EventSource.address))
//       .then(() => true)
//       .catch((err) => {
//         console.log('\x1b[31m', 'Error:', err.message, '\x1b[0m');
//       });
//   } else if (deployer.network.startsWith('plasma')) {
//     const TwoKeyPlasmaEvents = artifacts.require('TwoKeyPlasmaEvents');
//     deployer.deploy(TwoKeyPlasmaEvents);
//   }
// };



const TwoKeyEconomy = artifacts.require('TwoKeyEconomy');
// const ERC20TokenMock = artifacts.require('ERC20TokenMock');
const TwoKeyUpgradableExchange = artifacts.require('TwoKeyUpgradableExchange');
const TwoKeyAdmin = artifacts.require('TwoKeyAdmin');
const EventSource = artifacts.require('TwoKeyEventSource');
const TwoKeyReg = artifacts.require('TwoKeyReg');
const TwoKeyCongress = artifacts.require('TwoKeyCongress');
const Call = artifacts.require('Call');
const TwoKeyPlasmaEvents = artifacts.require('TwoKeyPlasmaEvents');

/*
    TwoKeyCongress constructor need 2 addresses passed, the best'd be if we get that addresses static and always save the same ones
 */

module.exports = function deploy(deployer) {
  var adminInstance;
  let initialCongressMembers = [
    '0x4216909456e770FFC737d987c273a0B8cE19C13e', // Eitan
    '0x5e2B2b278445AaA649a6b734B0945Bd9177F4F03', // Kiki
    '0xd9ce6800b997a0f26faffc0d74405c841dfc64b7', // intcollege
    '0xb3fa520368f2df7bed4df5185101f303f6c7decc', // 2keyeconomy
  ];
  let votingPowers = [1,2];

  deployer.deploy(Call);
  if(deployer.network.startsWith('dev') || deployer.network.startsWith('rinkeby') || deployer.network == 'ropsten') {
    deployer.deploy(TwoKeyCongress, 50, initialCongressMembers, votingPowers)
        .then(() => TwoKeyCongress.deployed())
        .then(() => deployer.deploy(TwoKeyAdmin,TwoKeyCongress.address))
        .then(() => TwoKeyAdmin.deployed())
        .then(function(instance) {
            adminInstance = instance;
        })
        .then(() => deployer.deploy(TwoKeyEconomy, TwoKeyAdmin.address))
        .then(() => deployer.deploy(TwoKeyUpgradableExchange, 1, deployer.network.startsWith('rinkeby') ? '0x99663fdaf6d3e983333fb856b5b9c54aa5f27b2f' : '0xbae10c2bdfd4e0e67313d1ebaddaa0adc3eea5d7', TwoKeyEconomy.address, TwoKeyAdmin.address))
        .then(() => TwoKeyUpgradableExchange.deployed())
        .then(() => deployer.deploy(EventSource, TwoKeyAdmin.address))
        // .then(() => EventSource.deployed())
        // .then(() => adminInstance.setTwoKeyExchange(TwoKeyUpgradableExchange.address))
        .then(() => deployer.deploy(TwoKeyReg, EventSource.address, TwoKeyAdmin.address,deployer.network.startsWith('rinkeby') ? '0x99663fdaf6d3e983333fb856b5b9c54aa5f27b2f' : '0xbae10c2bdfd4e0e67313d1ebaddaa0adc3eea5d7'))
        .then(() => TwoKeyReg.deployed())
        .then(() => EventSource.deployed().then(async(eventSource) => {
            console.log("... Adding TwoKeyReg to EventSource");
            await new Promise(async(resolve,reject) => {
                try {
                    let txHash = await eventSource.addTwoKeyReg(TwoKeyReg.address).then(() => true);
                    resolve(txHash);
                } catch (e) {
                    reject(e);
                }
            });
            console.log("Added TwoKeyReg: " + TwoKeyReg.address + "  to EventSource : " + EventSource.address + "!")
        }))
        .then(() => adminInstance.setSingletones(TwoKeyEconomy.address, TwoKeyUpgradableExchange.address, TwoKeyReg.address, EventSource.address))
        .then(() => true)
        .catch((err) => {
            console.log('\x1b[31m', 'Error:', err.message, '\x1b[0m');
        });
  } else if(deployer.network.startsWith('plasma')) {
    deployer.link(Call,TwoKeyPlasmaEvents);
    deployer.deploy(TwoKeyPlasmaEvents);
  }
};
