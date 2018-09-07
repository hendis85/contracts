/* GENERATED BY TYPECHAIN VER. 0.2.7 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import * as TC from "./typechain-runtime";

export class TwoKeyReg extends TC.TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: true,
        inputs: [
          { name: "_operator", type: "address" },
          { name: "_role", type: "string" }
        ],
        name: "checkRole",
        outputs: [],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          { name: "_operator", type: "address" },
          { name: "_role", type: "string" }
        ],
        name: "hasRole",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }, { name: "", type: "uint256" }],
        name: "userToCampaignsWhereReferrer",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }, { name: "", type: "uint256" }],
        name: "userToCampaignsWhereConverter",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "ROLE_CONTROLLER",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "owner2name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "addr", type: "address" },
          { name: "roleName", type: "string" }
        ],
        name: "adminRemoveRole",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }, { name: "", type: "uint256" }],
        name: "userToCampaignsWhereModerator",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "addr", type: "address" },
          { name: "roleName", type: "string" }
        ],
        name: "adminAddRole",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getAdminRole",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "onlyControllerRole",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "ROLE_ADMIN",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "bytes32" }],
        name: "name2owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getControllerRole",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }, { name: "", type: "uint256" }],
        name: "userToCampaignsWhereContractor",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { name: "_twoKeyEventSource", type: "address" },
          { name: "_twoKeyAdmin", type: "address" }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: "owner", type: "address" },
          { indexed: false, name: "name", type: "string" }
        ],
        name: "UserNameChanged",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "operator", type: "address" },
          { indexed: false, name: "role", type: "string" }
        ],
        name: "RoleAdded",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "operator", type: "address" },
          { indexed: false, name: "role", type: "string" }
        ],
        name: "RoleRemoved",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [{ indexed: true, name: "previousOwner", type: "address" }],
        name: "OwnershipRenounced",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "previousOwner", type: "address" },
          { indexed: true, name: "newOwner", type: "address" }
        ],
        name: "OwnershipTransferred",
        type: "event"
      },
      {
        constant: false,
        inputs: [{ name: "_twoKeyEventSource", type: "address" }],
        name: "changeTwoKeyEventSource",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_userAddress", type: "address" },
          { name: "_contractAddress", type: "address" }
        ],
        name: "addWhereContractor",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_userAddress", type: "address" },
          { name: "_contractAddress", type: "address" }
        ],
        name: "addWhereModerator",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_userAddress", type: "address" },
          { name: "_contractAddress", type: "address" }
        ],
        name: "addWhereReferrer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_userAddress", type: "address" },
          { name: "_contractAddress", type: "address" }
        ],
        name: "addWhereConverter",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_userAddress", type: "address" }],
        name: "getContractsWhereUserIsContractor",
        outputs: [{ name: "", type: "address[]" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_userAddress", type: "address" }],
        name: "getContractsWhereUserIsModerator",
        outputs: [{ name: "", type: "address[]" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_userAddress", type: "address" }],
        name: "getContractsWhereUserIsReferrer",
        outputs: [{ name: "", type: "address[]" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_userAddress", type: "address" }],
        name: "getContractsWhereUserIsConverter",
        outputs: [{ name: "", type: "address[]" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "getTwoKeyEventSourceAddress",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_name", type: "string" },
          { name: "_sender", type: "address" }
        ],
        name: "addName",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_name", type: "string" }],
        name: "addNameByUser",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_name", type: "string" }],
        name: "getName2Owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_sender", type: "address" }],
        name: "getOwner2Name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      }
    ];
    super(web3, address, abi);
  }

  static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<TwoKeyReg> {
    const contract = new TwoKeyReg(web3, address);
    const code = await TC.promisify(web3.eth.getCode, [address]);

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get ROLE_CONTROLLER(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.ROLE_CONTROLLER, []);
  }

  public get owner(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.owner, []);
  }

  public get getAdminRole(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getAdminRole, []);
  }

  public get onlyControllerRole(): Promise<boolean> {
    return TC.promisify(this.rawWeb3Contract.onlyControllerRole, []);
  }

  public get ROLE_ADMIN(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.ROLE_ADMIN, []);
  }

  public get getControllerRole(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getControllerRole, []);
  }

  public get getTwoKeyEventSourceAddress(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getTwoKeyEventSourceAddress, []);
  }

  public checkRole(
    _operator: BigNumber | string,
    _role: string
  ): Promise<void> {
    return TC.promisify(this.rawWeb3Contract.checkRole, [
      _operator.toString(),
      _role.toString()
    ]);
  }

  public hasRole(
    _operator: BigNumber | string,
    _role: string
  ): Promise<boolean> {
    return TC.promisify(this.rawWeb3Contract.hasRole, [
      _operator.toString(),
      _role.toString()
    ]);
  }

  public userToCampaignsWhereReferrer(
    arg0: BigNumber | string,
    arg1: BigNumber | number
  ): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.userToCampaignsWhereReferrer, [
      arg0.toString(),
      arg1.toString()
    ]);
  }

  public userToCampaignsWhereConverter(
    arg0: BigNumber | string,
    arg1: BigNumber | number
  ): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.userToCampaignsWhereConverter, [
      arg0.toString(),
      arg1.toString()
    ]);
  }

  public owner2name(arg0: BigNumber | string): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.owner2name, [arg0.toString()]);
  }

  public userToCampaignsWhereModerator(
    arg0: BigNumber | string,
    arg1: BigNumber | number
  ): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.userToCampaignsWhereModerator, [
      arg0.toString(),
      arg1.toString()
    ]);
  }

  public name2owner(arg0: string): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.name2owner, [arg0.toString()]);
  }

  public userToCampaignsWhereContractor(
    arg0: BigNumber | string,
    arg1: BigNumber | number
  ): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.userToCampaignsWhereContractor, [
      arg0.toString(),
      arg1.toString()
    ]);
  }

  public getContractsWhereUserIsContractor(
    _userAddress: BigNumber | string
  ): Promise<string[]> {
    return TC.promisify(
      this.rawWeb3Contract.getContractsWhereUserIsContractor,
      [_userAddress.toString()]
    );
  }

  public getContractsWhereUserIsModerator(
    _userAddress: BigNumber | string
  ): Promise<string[]> {
    return TC.promisify(this.rawWeb3Contract.getContractsWhereUserIsModerator, [
      _userAddress.toString()
    ]);
  }

  public getContractsWhereUserIsReferrer(
    _userAddress: BigNumber | string
  ): Promise<string[]> {
    return TC.promisify(this.rawWeb3Contract.getContractsWhereUserIsReferrer, [
      _userAddress.toString()
    ]);
  }

  public getContractsWhereUserIsConverter(
    _userAddress: BigNumber | string
  ): Promise<string[]> {
    return TC.promisify(this.rawWeb3Contract.getContractsWhereUserIsConverter, [
      _userAddress.toString()
    ]);
  }

  public getName2Owner(_name: string): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getName2Owner, [_name.toString()]);
  }

  public getOwner2Name(_sender: BigNumber | string): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getOwner2Name, [
      _sender.toString()
    ]);
  }

  public renounceOwnershipTx(): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "renounceOwnership",
      []
    );
  }
  public adminRemoveRoleTx(
    addr: BigNumber | string,
    roleName: string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "adminRemoveRole",
      [addr.toString(), roleName.toString()]
    );
  }
  public adminAddRoleTx(
    addr: BigNumber | string,
    roleName: string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "adminAddRole",
      [addr.toString(), roleName.toString()]
    );
  }
  public transferOwnershipTx(
    _newOwner: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "transferOwnership",
      [_newOwner.toString()]
    );
  }
  public changeTwoKeyEventSourceTx(
    _twoKeyEventSource: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "changeTwoKeyEventSource",
      [_twoKeyEventSource.toString()]
    );
  }
  public addWhereContractorTx(
    _userAddress: BigNumber | string,
    _contractAddress: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "addWhereContractor",
      [_userAddress.toString(), _contractAddress.toString()]
    );
  }
  public addWhereModeratorTx(
    _userAddress: BigNumber | string,
    _contractAddress: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "addWhereModerator",
      [_userAddress.toString(), _contractAddress.toString()]
    );
  }
  public addWhereReferrerTx(
    _userAddress: BigNumber | string,
    _contractAddress: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "addWhereReferrer",
      [_userAddress.toString(), _contractAddress.toString()]
    );
  }
  public addWhereConverterTx(
    _userAddress: BigNumber | string,
    _contractAddress: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "addWhereConverter",
      [_userAddress.toString(), _contractAddress.toString()]
    );
  }
  public addNameTx(
    _name: string,
    _sender: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "addName", [
      _name.toString(),
      _sender.toString()
    ]);
  }
  public addNameByUserTx(
    _name: string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "addNameByUser",
      [_name.toString()]
    );
  }

  public UserNameChangedEvent(eventFilter: {}): TC.DeferredEventWrapper<
    { owner: BigNumber | string; name: string },
    {}
  > {
    return new TC.DeferredEventWrapper<
      { owner: BigNumber | string; name: string },
      {}
    >(this, "UserNameChanged", eventFilter);
  }
  public RoleAddedEvent(eventFilter: {
    operator?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    { operator: BigNumber | string; role: string },
    { operator?: BigNumber | string | Array<BigNumber | string> }
  > {
    return new TC.DeferredEventWrapper<
      { operator: BigNumber | string; role: string },
      { operator?: BigNumber | string | Array<BigNumber | string> }
    >(this, "RoleAdded", eventFilter);
  }
  public RoleRemovedEvent(eventFilter: {
    operator?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    { operator: BigNumber | string; role: string },
    { operator?: BigNumber | string | Array<BigNumber | string> }
  > {
    return new TC.DeferredEventWrapper<
      { operator: BigNumber | string; role: string },
      { operator?: BigNumber | string | Array<BigNumber | string> }
    >(this, "RoleRemoved", eventFilter);
  }
  public OwnershipRenouncedEvent(eventFilter: {
    previousOwner?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    { previousOwner: BigNumber | string },
    { previousOwner?: BigNumber | string | Array<BigNumber | string> }
  > {
    return new TC.DeferredEventWrapper<
      { previousOwner: BigNumber | string },
      { previousOwner?: BigNumber | string | Array<BigNumber | string> }
    >(this, "OwnershipRenounced", eventFilter);
  }
  public OwnershipTransferredEvent(eventFilter: {
    previousOwner?: BigNumber | string | Array<BigNumber | string>;
    newOwner?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    { previousOwner: BigNumber | string; newOwner: BigNumber | string },
    {
      previousOwner?: BigNumber | string | Array<BigNumber | string>;
      newOwner?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      { previousOwner: BigNumber | string; newOwner: BigNumber | string },
      {
        previousOwner?: BigNumber | string | Array<BigNumber | string>;
        newOwner?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "OwnershipTransferred", eventFilter);
  }
}
