import ipfsAPI from 'ipfs-api';
import { BigNumber } from 'bignumber.js';
import solidityContracts from './contracts/meta';
import { ERC20 } from './contracts/ERC20';
import { TwoKeyEconomy } from './contracts/TwoKeyEconomy';
import { TwoKeyEventSource } from './contracts/TwoKeyEventSource';
import { TwoKeyReg } from './contracts/TwoKeyReg';
import { TwoKeyAcquisitionCampaignERC20 } from './contracts/TwoKeyAcquisitionCampaignERC20';
import {
  EhtereumNetworks,
  ContractsAdressess,
  TwoKeyInit,
  BalanceMeta,
  Transaction,
  CreateCampaign,
  Contract,
  RawTransaction,
} from './interfaces';
import Sign from './sign';
// import HDWalletProvider from './HDWalletProvider';

const contracts = require('./contracts.json');
// console.log(Sign);
// const addressRegex = /^0x[a-fA-F0-9]{40}$/;

const TwoKeyDefaults = {
  ipfsIp: '192.168.47.99',
  ipfsPort: '5001',
  mainNetId: 4,
  syncTwoKeyNetId: 17,
};

export default class TwoKeyNetwork {
  private web3: any;
  private syncWeb3: any;
  private ipfs: any;
  private address: string;
  private gasPrice: number;
  private totalSupply: BigNumber;
  private gas: number;
  private networks: EhtereumNetworks;
  private contracts: ContractsAdressess;
  private twoKeyEconomy: TwoKeyEconomy;
  private twoKeyReg: TwoKeyReg;

  constructor(initValues: TwoKeyInit) {
    // init MainNet Client
    const {
      web3,
      // syncUrl = TwoKeyDefaults.twoKeySyncUrl,
      ipfsIp = TwoKeyDefaults.ipfsIp,
      ipfsPort = TwoKeyDefaults.ipfsPort,
      contracts,
      networks,
    } = initValues;
    if (!web3) {
      throw new Error('Web3 instanse required!');
    }
    if (!web3.eth.defaultAccount) {
      throw new Error('defaultAccount required!');
    }
    this.web3 = web3;
    this.web3.eth.defaultBlock = 'pending';
    this.address = this.web3.eth.defaultAccount;
    if (contracts) {
      this.contracts = contracts;
    } else if (networks) {
      this.networks = networks;
    } else {
      this.networks = {
        mainNetId: TwoKeyDefaults.mainNetId,
        syncTwoKeyNetId: TwoKeyDefaults.syncTwoKeyNetId,
      }
    }
    this.web3.eth.defaultBlock = 'pending';
    // this.pk = wallet.getPrivateKey().toString('hex');

    this.twoKeyEconomy = new TwoKeyEconomy(this.web3, this._getContractDeployedAddress('TwoKeyEconomy'));
    this.twoKeyReg = new TwoKeyReg(this.web3, this._getContractDeployedAddress('TwoKeyReg'));
    // this.twoKeyEventSource = new 

    // init 2KeySyncNet Client
    // const syncEngine = new ProviderEngine();
    // this.syncWeb3 = new Web3(syncEngine);
    // const syncProvider = new WSSubprovider({ rpcUrl: syncUrl });
    // syncEngine.addProvider(syncProvider);
    // syncEngine.start();
    this.ipfs = ipfsAPI(ipfsIp, ipfsPort, { protocol: 'http' });
  }

  public getGasPrice(): number {
    return this.gasPrice;
  }

  public getTotalSupply(): BigNumber {
    return this.totalSupply;
  }

  public getGas(): number {
    return this.gas;
  }

  public getAddress(): string {
    return this.address;
  }

  public getBalance(address: string = this.address): Promise<BalanceMeta> {
    const promises = [
      this._getEthBalance(address),
      this._getTokenBalance(address),
      this._getTotalSupply(),
      this._getGasPrice()
    ];
    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then(([eth, token, total, gasPrice]) => {
          resolve({
            balance: {
              ETH: parseFloat(eth),
              total: parseFloat(this._fromWei(total.toString())),
              '2KEY': parseFloat(token),
            },
            local_address: this.address,
            gasPrice: parseFloat(gasPrice),
          });
        })
        .catch(reject)
    });
  }

  /* TRANSFERS */

  public getERC20TransferGas(to: string, value: number): Promise<number> {
    this.gas = null;
    return new Promise((resolve, reject) => {
      this.twoKeyEconomy.transferTx(to, this._toWei(value, 'ether')).estimateGas({ from: this.address })
        .then(res => {
          this.gas = res;
          resolve(this.gas);
        })
        .catch(reject);
    });
  }

  public getETHTransferGas(to: string, value: number): Promise<number> {
    this.gas = null;
    return new Promise((resolve, reject) => {
      this.web3.eth.estimateGas({ to, value: this._toWei(value, 'ether').toString() }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          this.gas = res;
          resolve(this.gas);
        }
      });
    });
  }

  public async transferTokens(to: string, value: number, gasPrice: number = this.gasPrice): Promise<any> {
    const balance = parseFloat(await this._getEthBalance(this.address));
    const tokenBalance = parseFloat(await this._getTokenBalance(this.address));
    const gasRequired = await this.getERC20TransferGas(to, value);
    const etherRequired = parseFloat(this._fromWei(gasPrice * gasRequired, 'ether'));
    if (tokenBalance < value || balance < etherRequired) {
      throw new Error('Not enough founds');
    }
    const params = { from: this.address, gasLimit: this._toHex(this.gas), gasPrice };
    return this.twoKeyEconomy.transferTx(to, this._toWei(value, 'ether')).send(params);
  }

  public async transferEther(to: string, value: number, gasPrice: number = this.gasPrice): Promise<any> {
    const balance = parseFloat(await this._getEthBalance(this.address));
    const gasRequired = await this.getETHTransferGas(to, value);
    const totalValue = value + parseFloat(this._fromWei(gasPrice * gasRequired, 'ether'));
    if (totalValue > balance) {
      throw new Error('Not enough founds');
    }
    const params = { to, gasPrice, gasLimit: this._toHex(this.gas), value: this._toWei(value, 'ether').toString(), from: this.address }
    return new Promise((resolve, reject) => {
      this.web3.eth.sendTransaction(params, async (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  /* HANDLE */

  public setHandle(handle: string, gasPrice: number = this.gasPrice): Promise<string> {
    return this.twoKeyReg.addNameTx(handle, this.address).send({ from: this.address, gasPrice, gas: 2000000 });
  }

  public getAddressHandle(address: string = this.address): Promise<string> {
    // return this.twoKeyReg.getOwner2Name(address);
    return this.twoKeyReg.getName2Owner(address);
  }

  public async getContractorCampaigns(): Promise<any> {
    const eventSource = await TwoKeyEventSource.createAndValidate(this.web3, this._getContractDeployedAddress('TwoKeyEventSource'));
    // return eventSource.CreatedEvent({ _owner: this.address }).get({ fromBlock: 0, toBlock: 'pending' });
    return eventSource.CreatedEvent({}).get({ fromBlock: 0, toBlock: 'pending' });
  }

  /* CAMPAIGN */

  public estimateSaleCampaign(data: CreateCampaign): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const whiteListGas = await this._estimateSubcontractGas(solidityContracts.TwoKeyWhitelisted);
        // console.log('TwoKeyWhiteList', whiteListGas);
        const campaignGas = await this._estimateSubcontractGas(solidityContracts.TwoKeyAcquisitionCampaignERC20, [
          this._getContractDeployedAddress('TwoKeyEventSource'),
          this.twoKeyEconomy.address,
          // Fake WhiteListInfluence address
          this.twoKeyEconomy.address,
          // Fake WhiteListConverter address
          this.twoKeyEconomy.address,
          data.contractor || this.address,
          data.moderator || this.address,
          data.openingTime,
          data.closingTime,
          data.expiryConversion,
          data.bonusOffer,
          data.rate,
          data.maxCPA,
        ]);
        // console.log('TwoKeyAcquisitionCampaignERC20', campaignGas);
        const totalGas = whiteListGas * 2 + campaignGas;
        resolve(totalGas);
      } catch (err) {
        reject(err);
      }
    });
  }
  // Create Campaign
  public createSaleCampaign(data: CreateCampaign, gasPrice?: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const gasRequired = await this.estimateSaleCampaign(data);
        await this._checkBalanceBeforeTransaction(gasRequired, gasPrice || this.gasPrice);
        // console.log('Creating TwoKeyWhitelisted...');
        const whitelistInfluencerAddress = await this._createContract(solidityContracts.TwoKeyWhitelisted);
        // console.log('whitelistInfluencerAddress', whitelistInfluencerAddress);
        // console.log('Creating TwoKeyWhitelisted...');
        const whitelistConverterAddress = await this._createContract(solidityContracts.TwoKeyWhitelisted);
        // console.log('whitelistConverterAddress', whitelistConverterAddress);
        // console.log('Creating TwoKeyAcquisitionCampaignERC20...');
        const campaignAddress = await this._createContract(solidityContracts.TwoKeyAcquisitionCampaignERC20, gasPrice, [
          this._getContractDeployedAddress('TwoKeyEventSource'),
          this.twoKeyEconomy.address,
          whitelistInfluencerAddress,
          whitelistConverterAddress,
          data.contractor || this.address,
          data.moderator || this.address,
          data.openingTime,
          data.closingTime,
          data.expiryConversion,
          data.bonusOffer,
          data.rate,
          data.maxCPA,
        ]);
        const campaign = await TwoKeyAcquisitionCampaignERC20.createAndValidate(this.web3, campaignAddress);
  
        resolve(campaign.address);
      } catch (err) {
        reject(err);
      }
    });
  }
  // Add Asset ERC20 Contract
  public addAssetContractERC20(campaignAddress: string, erc20: string, gasPrice: number = this.gasPrice): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const campaign = await TwoKeyAcquisitionCampaignERC20.createAndValidate(this.web3, campaignAddress);
        const currentErc20address = await campaign.getAssetContractAddress;
        if (parseInt(currentErc20address, 16)) {
          if (currentErc20address !== erc20) {
            reject(new Error(`ERC20(${currentErc20address}) already set from this campaign`));
          } else {
            resolve(currentErc20address);
          }
        } else {
          const data = {
            from: this.address,
            to: campaignAddress,
            value: '0x0',
            data: campaign.addAssetContractERC20Tx(erc20).getData()
          }
          const gas = await this._estimateTransactionGas(data);
          await this._checkBalanceBeforeTransaction(gas, gasPrice);
          const txHash = await campaign.addAssetContractERC20Tx(erc20).send({ from: this.address, gasPrice, gas });
          await this._waitForTransactionMined(txHash)
          resolve(erc20);
        }
      } catch (err) {
        reject(err);
      }

    });
  }
  // Get Asset ERC20 Contract
  public getAssetContractAddress(campaignAddress: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const campaign = await TwoKeyAcquisitionCampaignERC20.createAndValidate(this.web3, campaignAddress);
        const currentErc20address = await campaign.getAssetContractAddress;
        resolve(currentErc20address);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async getFungibleInventory(erc20Address, inventoryAddress): Promise<any> {
    const erc20 = new ERC20(this.web3, erc20Address);
    return new Promise(async (resolve, reject) => {
      try {
        const inventory = await erc20.balanceOf(inventoryAddress);
        resolve(inventory.toNumber());
      } catch (err) {
        reject(err);
      }
    });
  }
  // Set Public Link ()
  public setPublicLink(campaignAddress: string, publicKey: string, gasPrice: number = this.gasPrice): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const campaign = await TwoKeyAcquisitionCampaignERC20.createAndValidate(this.web3, campaignAddress);
        // const currentLink = await campaign.public_link_key(this.address);
        // const data = {
        //   from: this.address,
        //   to: campaignAddress,
        //   data: campaign.setPublicLinkKeyTx(publicKey).getData(),
        //   value: '0x0',
        // }
        // console.log(data);
        // const gas = await this._estimateTransactionGas(data);
        // console.log('Gas required', gas);
        // await this._checkBalanceBeforeTransaction(gas, gasPrice);
        const txHash = await campaign.setPublicLinkKeyTx(publicKey).send({ from: this.address, gas: 2000000, gasPrice });
        await this._waitForTransactionMined(txHash);
        console.log(`Public Link for (${this.address}) is ${publicKey}`);
        resolve(publicKey);
      } catch (err) {
        reject(err);
      }
    });
  }
  // Join Ofchain
  public joinCampaign(campaignAddress: string, cut: number, fromHash?: string, gasPrice: number = this.gasPrice): Promise<string> {
    // TODO AP Implement method shortUrl
    // If we want to shortLink
    // 1. Check ures tokenArcs TwoKeyAcquisitionCampaignERC20.balanceOf()
    // 2. Transfer Arc if needed TwoKeyAcquisitionCampaignERC20.transferSig(sign.fre_take(...fromHash))  
    // 3. Generate new PublicLink (without Hash)
    // 4. TwoKeyAcquisitionCampaignERC20.setPublicLink()
    // 5. If need TwoKeyAcquisitionCampaignERC20.setCut()

    let pk = Sign.generatePrivateKey();
    let public_address = Sign.privateToPublic(pk);
    const private_key = pk.toString('hex');

    return new Promise(async (resolve, reject) => {
      try {
        let new_message;
        if (fromHash) {
          const { f_address, f_secret, p_message } = this._getUrlParams(fromHash);
          new_message = Sign.free_join(this.address, public_address, f_address, f_secret, p_message, cut);
        } else {
          await this.setPublicLink(campaignAddress, `0x${public_address}`, gasPrice);
        }
        resolve(`f_address=${this.address}&f_secret=${private_key}&p_message=${new_message || ''}`);
        // resolve('hash');
      } catch (err) {
        reject(err);
      }
    });
  }

  /* UTILS */

  private _fromWei(number: string | number | BigNumber, unit?: string): string {
    return this.web3.fromWei(number, unit);
  }

  private _toWei(number: string | number | BigNumber, unit?: string): number | BigNumber {
    return this.web3.toWei(number, unit);
  }

  private _toHex(data: any): string {
    return this.web3.toHex(data);
  }

  private _getContractDeployedAddress(contract: string): string {
    return this.contracts ? this.contracts[contract] : solidityContracts[contract].networks[this.networks.mainNetId].address
  }

  private _getGasPrice(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getGasPrice((err, res) => {
        if (err) {
          reject(err);
        } else {
          this.gasPrice = res.toNumber();
          resolve(res.toString());
        }
      });
    });
  }

  private _getEthBalance(address: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBalance(address, this.web3.eth.defaultBlock, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(this._fromWei(res.toString(), 'ether'));
        }
      })
    })
  }

  private _getTokenBalance(address: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.twoKeyEconomy.balanceOf(address)
        .then(res => {
          resolve(this._fromWei(res.toString()))
        })
        .catch(reject);
    });
  }

  private _getTotalSupply(): Promise<string> {
    if (this.totalSupply) {
      return Promise.resolve(this._fromWei(this.totalSupply.toString()));
    }
    return new Promise((resolve, reject) => {
      this.twoKeyEconomy.totalSupply
        .then(res => {
          this.totalSupply = res;
          resolve(this._fromWei(this.totalSupply.toString()));
        })
        .catch(reject);
    });
  }

  public _getTransaction(txHash: string): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getTransaction(txHash, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  private _createContract(contract: Contract, gasPrice: number = this.gasPrice, params?: any[]): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const { abi, bytecode: data } = contract;
      const gas = await this._estimateSubcontractGas(contract, params);
      const createParams = params ? [...params, { data, from: this.address, gas, gasPrice }] : [{ data, from: this.address, gas, gasPrice }];
      this.web3.eth.contract(abi).new(...createParams, (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.address) {
            resolve(res.address);
          } // else {
          // console.log('Transaction Hash:', res.transactionHash);
          // }
        }
      });
    });
  }

  private _estimateSubcontractGas(contract: Contract, params?: any[]): Promise<number> {
    return new Promise(async (resolve, reject) => {
      const { abi, bytecode: data } = contract;
      const estimateParams = params ? [...params, { data, from: this.address }] : [{ data, from: this.address }];
      this.web3.eth.estimateGas({
        data: this.web3.eth.contract(abi).new.getData(...estimateParams),
      }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    });
  }

  private _estimateTransactionGas(data: RawTransaction): Promise<number> {
    return new Promise((resolve, reject) => {
      this.web3.eth.estimateGas(data, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  private _getNonce(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getTransactionCount(this.address, 'pending', (err, res) => {
        if (err) {
          reject(err);
        } else {
          // console.log('NONCE', res, this.address);
          resolve(res);
        }
      });
    });
  }

  private _getBlock(block: string | number): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBlock(block, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  private _waitForTransactionMined(txHash: string, timeout: number = 60000): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let fallbackTimer;
      let interval;
      fallbackTimer = setTimeout(() => {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        if (fallbackTimer) {
          clearTimeout(fallbackTimer);
          fallbackTimer = null;
        }
        reject();
      }, timeout);
      interval = setInterval(async () => {
        let tx = await this._getTransaction(txHash);
        if (tx.blockNumber) {
          if (fallbackTimer) {
            clearTimeout(fallbackTimer);
            fallbackTimer = null;
          }
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
          resolve(true);
        }
      }, 1000);
    });
  }

  private _ipfsAdd(data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.ipfs.add([Buffer.from(JSON.stringify(data))], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res[0].hash);
        }
      });
    })
  }

  private _getUrlParams(url: string): any {
    let hashes = url.slice(url.indexOf('?') + 1).split('&');
    let params = {};
    hashes.map(hash => {
      let [key, val] = hash.split('=')
      params[key] = decodeURIComponent(val);
    })
    return params;
  }

  private async _checkBalanceBeforeTransaction(gasRequired: number, gasPrice: number): Promise<boolean> {
    const balance = parseFloat(await this._getEthBalance(this.address));
    const transactionFee = parseFloat(this._fromWei(gasPrice || this.gasPrice * gasRequired, 'ether'));

    if (transactionFee > balance) {
      throw new Error(`Not enough founds. Required: ${transactionFee}. Your balance: ${balance}`);
    }
    return true;
  }
}
