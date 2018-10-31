import {ITwoKeyBase, ITwoKeyHelpers, ITwoKeyUtils} from '../interfaces';
import {ITwoKeyCongress} from './interfaces';
import {promisify} from '../utils'


export default class TwoKeyCongress implements ITwoKeyCongress {
    private readonly base: ITwoKeyBase;
    private readonly helpers: ITwoKeyHelpers;
    private readonly utils: ITwoKeyUtils;
    private readonly congress: any;

    constructor(twoKeyProtocol: ITwoKeyBase, helpers: ITwoKeyHelpers, utils: ITwoKeyUtils) {
        this.base = twoKeyProtocol;
        this.helpers = helpers;
        this.utils = utils;
        this.congress = twoKeyProtocol.twoKeyCongress;
    }

    /**
     *
     * @param {string} from
     * @returns {Promise<string[]>}
     */
    public getAllowedMethods(from: string) : Promise<string[]> {
        return new Promise(async(resolve,reject) => {
            try {
                const allowedMethods = await promisify(this.congress.getAllowedMethods, [{from}]);
                resolve(allowedMethods);
            } catch (e) {
                reject(e);
            }
        })
    }

    /**
     *
     * @param {string} member
     * @param {string} from
     * @returns {Promise<boolean>}
     */
    public isUserMemberOfCongress(member: string, from:string) : Promise<boolean> {
        return new Promise(async(resolve, reject) => {
            try {
                const isUserMember = await promisify(this.congress.checkIsMember,[member, {from}]);
                resolve(isUserMember);
            } catch (e) {
                reject(e);
            }
        })
    }

    /**
     *
     * @param {string} beneficiary
     * @param {number} weiAmount
     * @param {string} jobDescription
     * @param {string} transactionBytecode
     * @param {string} from
     * @returns {Promise<number>}
     */
    public submitNewProposal(beneficiary: string, weiAmount: number, jobDescription: string, transactionBytecode: string, from:string) : Promise<number> {
        return new Promise( async(resolve, reject) => {
            try {
                const nonce = await this.helpers._getNonce(from);
                let proposalId = await promisify(this.congress.newProposal,[beneficiary,weiAmount,jobDescription,transactionBytecode,{from, nonce}]);
                resolve(proposalId);
            } catch(e) {
                reject(e);
            }
        });
    }

    /**
     *
     * @param {string} beneficiary
     * @param {number} etherAmount
     * @param {string} jobDescription
     * @param {string} transactionBytecode
     * @param {string} from
     * @returns {Promise<number>}
     */
    public newProposalInEther(beneficiary: string, etherAmount: number, jobDescription: string, transactionBytecode: string, from:string) : Promise<number> {
        return new Promise( async(resolve, reject) => {
            try {
                const nonce = await this.helpers._getNonce(from);
                let proposalId = await promisify(this.congress.newProposal,[beneficiary,etherAmount,jobDescription,transactionBytecode,{from, nonce}]);
                resolve(proposalId);
            } catch(e) {
                reject(e);
            }
        });
    }

    /**
     *
     * @param {string} from
     * @returns {Promise<any>}
     */
    public getAllProposals(from:string) : Promise<any> {
        return new Promise(async(resolve,reject) => {
            try {

            } catch(e) {
                reject(e);
            }
        });
    }

    /**
     *
     * @param {number} proposalNumber
     * @param {boolean} supportsProposal
     * @param {string} justificationText
     * @param {string} from
     * @returns {Promise<number>}
     */
    public vote(proposalNumber:number, supportsProposal: boolean, justificationText:string, from:string): Promise<number> {
        return new Promise(async(resolve,reject) => {
            try {
                const nonce = await this.helpers._getNonce(from);
                let voteId = await promisify(this.congress.vote, [proposalNumber, supportsProposal, justificationText, {from, nonce}]);
                resolve(voteId);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     *
     * @param {number} proposalNumber
     * @param {string} transactionBytecode
     * @param {string} from
     * @returns {Promise<string>}
     */
    public executeProposal(proposalNumber: number, transactionBytecode: string, from: string) : Promise<string> {
        return new Promise(async(resolve,reject) => {
            try {
                const nonce = await this.helpers._getNonce(from);
                let txHash = await promisify(this.congress.executeProposal, [proposalNumber,transactionBytecode, {from, nonce}]);
                resolve(txHash);
            } catch(e) {
                reject(e);
            }
        })
    }

    /**
     *
     * @param {number} proposalNumber
     * @param {string} from
     * @returns {Promise<any>}
     */
    public getVoteCount(proposalNumber: number, from:string) : Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                let numberOfVotes,
                    currentResult,
                    description;

                [numberOfVotes,currentResult,description] = await promisify(this.congress.getVoteCount, [{from}]);
                let obj = {
                    numberOfVotes: numberOfVotes,
                    currentResult: currentResult,
                    description: description
                };
                resolve(obj);
            } catch (e) {
                reject(e);
            }
        })
    }

    /**
     *
     * @param {string} from
     * @returns {Promise<any>}
     */
    public getMemberInfo(from: string) : Promise<any> {
        return new Promise( async(resolve, reject) => {
            try {
                let address,
                    name,
                    votingPower,
                    memberSince;

                [address, name, votingPower,memberSince] = await promisify(this.congress.getMemberInfo, [{from}]);

                let member = {
                    memberAddress: address,
                    memberName: name,
                    memberVotingPower: votingPower,
                    memberSince: memberSince
                };
                resolve(member);
            } catch(e) {
                reject(e);
            }
        })
    }

    /**
     *
     * @param {string} hash
     * @param {string} from
     * @returns {Promise<any>}
     */
    public getMethodNameFromHash(congress: any, hash: string, from: string) : Promise<any> {
        return new Promise( async(resolve,reject) => {
            try {
                let methodName = await promisify(this.congress.getMethodNameFromMethodHash, [hash, {from}]);
                resolve(methodName);
            } catch (e) {
                reject(e);
            }
        })
    }

    //p.amount, p.description, p.minExecutionDate, p.executed, p.numberOfVotes, p.currentResult
    public getProposalInformations(congress: any, proposalId: number, from: string) : Promise<any> {
        return new Promise( async(resolve, reject) => {
            try {
                let proposalAmount,
                    proposalDescription,
                    proposalExecutionDate,
                    proposalIsExecuted,
                    proposalNumberOfVotes,
                    proposalCurrentResult,
                    proposalTransactionBytecode;

                [
                    proposalAmount,
                    proposalDescription,
                    proposalExecutionDate,
                    proposalIsExecuted,
                    proposalNumberOfVotes,
                    proposalCurrentResult,
                    proposalTransactionBytecode
                ] = await promisify(this.congress.getProposalData, [proposalId, {from}]);

                let proposal = {
                    proposalAmount: proposalAmount,
                    proposalDescription: proposalDescription,
                    proposalExecutionDate: proposalExecutionDate,
                    proposalIsExecuted: proposalIsExecuted,
                    proposalNumberOfVotes: proposalNumberOfVotes,
                    proposalCurrentResult: proposalCurrentResult
                };

                resolve(proposal);
            } catch (e) {
                reject(e);
            }
        })
    }
}
