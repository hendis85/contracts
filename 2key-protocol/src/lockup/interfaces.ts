import {BigNumber} from 'bignumber.js';

export interface ILockup {
    withdrawTokens: (twoKeyLockup: string, part: number, from:string) => Promise<string>,
    changeTokenDistributionDate: (twoKeyLockup: string, newDate: number, from: string) => Promise<string>,
    getLockupInformations: (twoKeyLockup: string, from:string) => Promise<LockupInformation>,
}

export interface LockupInformation {
    'baseTokens' : number,
    'bonusTokens' : number,
    'vestingMonths' : number,
    'conversionId' : number,
    'unlockingDays' : number[],
    'areWithdrawn' : boolean[]
}