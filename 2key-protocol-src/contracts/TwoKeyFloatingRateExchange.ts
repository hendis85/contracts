/* GENERATED BY TYPECHAIN VER. 0.2.7 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import * as TC from "./typechain-runtime";

export class TwoKeyFloatingRateExchange extends TC.TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: false,
        inputs: [{ name: "_to", type: "address" }],
        name: "upgrade",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
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
        inputs: [],
        name: "rate",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "_getWTest",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "weiRaised",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "wallet",
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
        inputs: [{ name: "_tokenAmount", type: "uint256" }],
        name: "sellTokens",
        outputs: [],
        payable: true,
        stateMutability: "payable",
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
        constant: false,
        inputs: [{ name: "_beneficiary", type: "address" }],
        name: "buyTokens",
        outputs: [],
        payable: true,
        stateMutability: "payable",
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
        inputs: [],
        name: "token",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      { payable: true, stateMutability: "payable", type: "fallback" },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "purchaser", type: "address" },
          { indexed: true, name: "beneficiary", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
          { indexed: false, name: "amount", type: "uint256" }
        ],
        name: "TokenSell",
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
        anonymous: false,
        inputs: [
          { indexed: true, name: "purchaser", type: "address" },
          { indexed: true, name: "beneficiary", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
          { indexed: false, name: "amount", type: "uint256" }
        ],
        name: "TokenPurchase",
        type: "event"
      },
      {
        constant: false,
        inputs: [{ name: "_newRate", type: "uint256" }],
        name: "setRate",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      }
    ];
    super(web3, address, abi);
  }

  static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<TwoKeyFloatingRateExchange> {
    const contract = new TwoKeyFloatingRateExchange(web3, address);
    const code = await TC.promisify(web3.eth.getCode, [address]);

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get rate(): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.rate, []);
  }

  public get _getWTest(): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract._getWTest, []);
  }

  public get weiRaised(): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.weiRaised, []);
  }

  public get wallet(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.wallet, []);
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

  public get token(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.token, []);
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

  public upgradeTx(
    _to: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "upgrade", [
      _to.toString()
    ]);
  }
  public sellTokensTx(
    _tokenAmount: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.IPayableTxParams> {
    return new TC.DeferredTransactionWrapper<TC.IPayableTxParams>(
      this,
      "sellTokens",
      [_tokenAmount.toString()]
    );
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
  public buyTokensTx(
    _beneficiary: BigNumber | string
  ): TC.DeferredTransactionWrapper<TC.IPayableTxParams> {
    return new TC.DeferredTransactionWrapper<TC.IPayableTxParams>(
      this,
      "buyTokens",
      [_beneficiary.toString()]
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
  public setRateTx(
    _newRate: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "setRate", [
      _newRate.toString()
    ]);
  }

  public TokenSellEvent(eventFilter: {
    purchaser?: BigNumber | string | Array<BigNumber | string>;
    beneficiary?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      purchaser: BigNumber | string;
      beneficiary: BigNumber | string;
      value: BigNumber | number;
      amount: BigNumber | number;
    },
    {
      purchaser?: BigNumber | string | Array<BigNumber | string>;
      beneficiary?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        purchaser: BigNumber | string;
        beneficiary: BigNumber | string;
        value: BigNumber | number;
        amount: BigNumber | number;
      },
      {
        purchaser?: BigNumber | string | Array<BigNumber | string>;
        beneficiary?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "TokenSell", eventFilter);
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
  public TokenPurchaseEvent(eventFilter: {
    purchaser?: BigNumber | string | Array<BigNumber | string>;
    beneficiary?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      purchaser: BigNumber | string;
      beneficiary: BigNumber | string;
      value: BigNumber | number;
      amount: BigNumber | number;
    },
    {
      purchaser?: BigNumber | string | Array<BigNumber | string>;
      beneficiary?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        purchaser: BigNumber | string;
        beneficiary: BigNumber | string;
        value: BigNumber | number;
        amount: BigNumber | number;
      },
      {
        purchaser?: BigNumber | string | Array<BigNumber | string>;
        beneficiary?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "TokenPurchase", eventFilter);
  }
}
