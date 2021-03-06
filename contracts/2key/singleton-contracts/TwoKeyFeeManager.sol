pragma solidity ^0.4.24;

import "../upgradability/Upgradeable.sol";
import "../non-upgradable-singletons/ITwoKeySingletonUtils.sol";
import "../interfaces/ITwoKeyCampaignValidator.sol";
import "../interfaces/storage-contracts/ITwoKeyFeeManagerStorage.sol";
import "../interfaces/IUpgradableExchange.sol";
import "../interfaces/ITwoKeyEventSource.sol";
import "../interfaces/IERC20.sol";
import "../libraries/SafeMath.sol";

/**
 * @author Nikola Madjarevic (@madjarevicn)
 */
contract TwoKeyFeeManager is Upgradeable, ITwoKeySingletonUtils {
    /**
     * This contract will store the fees and users registration debts
     * Depending of user role, on some actions 2key.network will need to deduct
     * users contribution amount / earnings / proceeds, in order to cover transactions
     * paid by 2key.network for users registration
     */
    using SafeMath for *;

    bool initialized;
    ITwoKeyFeeManagerStorage PROXY_STORAGE_CONTRACT;

    //Debt will be stored in ETH
    string constant _userPlasmaToDebtInETH = "userPlasmaToDebtInETH";

    //This refferrs only to registration debt
    string constant _isDebtSubmitted = "isDebtSubmitted";
    string constant _totalDebtsInETH = "totalDebtsInETH";

    string constant _totalPaidInETH = "totalPaidInETH";
    string constant _totalPaidInDAI = "totalPaidInDAI";
    string constant _totalPaidIn2Key = "totalPaidIn2Key";

    string constant _totalWithdrawnInETH = "totalWithdrawnInETH";


    /**
     * Modifier which will allow only completely verified and validated contracts to call some functions
     */
    modifier onlyAllowedContracts {
        address twoKeyCampaignValidator = getAddressFromTwoKeySingletonRegistry("TwoKeyCampaignValidator");
        require(ITwoKeyCampaignValidator(twoKeyCampaignValidator).isCampaignValidated(msg.sender) == true);
        _;
    }

    function setInitialParams(
        address _twoKeySingletonRegistry,
        address _proxyStorage
    )
    public
    {
        require(initialized == false);

        TWO_KEY_SINGLETON_REGISTRY = _twoKeySingletonRegistry;
        PROXY_STORAGE_CONTRACT = ITwoKeyFeeManagerStorage(_proxyStorage);

        initialized = true;
    }



    function setDebtInternal(
        address _plasmaAddress,
        uint _registrationFee
    )
    internal
    {
        // Generate the key for debt
        bytes32 keyHashForUserDebt = keccak256(_userPlasmaToDebtInETH, _plasmaAddress);

        // Get current debt
        uint currentDebt = PROXY_STORAGE_CONTRACT.getUint(keyHashForUserDebt);

        // Add on current debt new debt
        PROXY_STORAGE_CONTRACT.setUint(keyHashForUserDebt,currentDebt.add(_registrationFee));

        //Get the key for the total debts in eth
        bytes32 key = keccak256(_totalDebtsInETH);

        //Get the total debts from storage contract and increase by _registrationFee
        uint totalDebts = _registrationFee.add(PROXY_STORAGE_CONTRACT.getUint(key));

        //Set new value for totalDebts
        PROXY_STORAGE_CONTRACT.setUint(key, totalDebts);
    }

    /**
     * @notice          Function which will be used to add additional debts for user
     *                  such as re-registration, and probably more things in the future
     *
     * @param           _plasmaAddress is user plasma address
     * @param           _debtAmount is the amount of debt we're adding to current debt
     * @param           _debtType is selector which will restrict that same debt is submitted
     *                  multiple times
     */
    function addDebtForUser(
        address _plasmaAddress,
        uint _debtAmount,
        string _debtType
    )
    public
    {
        require(msg.sender == getAddressFromTwoKeySingletonRegistry("TwoKeyEventSource"));

        bytes32 keyHashForDebtType = keccak256(_plasmaAddress, _debtType);

        require(PROXY_STORAGE_CONTRACT.getBool(keyHashForDebtType) == false);

        PROXY_STORAGE_CONTRACT.setBool(keyHashForDebtType, true);

        setDebtInternal(_plasmaAddress, _debtAmount);
    }


    /**
     * @notice          Function which will submit registration fees
     *                  It can be called only once par _address
     * @param           _plasmaAddress is the address of the user
     * @param           _registrationFee is the amount paid for the registration
     */
    function setRegistrationFeeForUser(
        address _plasmaAddress,
        uint _registrationFee
    )
    public
    {
        //Check that this function can be called only by TwoKeyEventSource
        require(msg.sender == getAddressFromTwoKeySingletonRegistry("TwoKeyEventSource"));

        // Generate the key for the storage
        bytes32 keyHashIsDebtSubmitted = keccak256(_isDebtSubmitted, _plasmaAddress);

        //Check that for this user we have never submitted the debt in the past
        require(PROXY_STORAGE_CONTRACT.getBool(keyHashIsDebtSubmitted) == false);

        //Set that debt is submitted
        PROXY_STORAGE_CONTRACT.setBool(keyHashIsDebtSubmitted, true);

        setDebtInternal(_plasmaAddress, _registrationFee);
    }

    /**
     * @notice          Function to check for the user if registration debt is submitted
     * @param           _plasmaAddress is users plasma address
     */
    function isRegistrationDebtSubmittedForTheUser(
        address _plasmaAddress
    )
    public
    view
    returns (bool)
    {
        bytes32 keyHashIsDebtSubmitted = keccak256(_isDebtSubmitted, _plasmaAddress);
        return PROXY_STORAGE_CONTRACT.getBool(keyHashIsDebtSubmitted);
    }

    /**
     * @notice          Function where maintainer can set debts per user
     * @param           usersPlasmas is the array of user plasma addresses
     * @param           fees is the array containing fees which 2key paid for user
     * Only maintainer is eligible to call this function.
     */
    function setRegistrationFeesForUsers(
        address [] usersPlasmas,
        uint [] fees
    )
    public
    onlyMaintainer
    {
        uint i = 0;
        uint total = 0;
        // Iterate through all addresses and store the registration fees paid for them
        for(i = 0; i < usersPlasmas.length; i++) {
            // Generate the key for the storage
            bytes32 keyHashIsDebtSubmitted = keccak256(_isDebtSubmitted, usersPlasmas[i]);

            //Check that for this user we have never submitted the debt in the past
            require(PROXY_STORAGE_CONTRACT.getBool(keyHashIsDebtSubmitted) == false);

            //Set that debt is submitted
            PROXY_STORAGE_CONTRACT.setBool(keyHashIsDebtSubmitted, true);

            PROXY_STORAGE_CONTRACT.setUint(keccak256(_userPlasmaToDebtInETH, usersPlasmas[i]), fees[i]);

            total = total.add(fees[i]);
        }

        // Increase total debts
        bytes32 key = keccak256(_totalDebtsInETH);
        uint totalDebts = total.add(PROXY_STORAGE_CONTRACT.getUint(key));
        PROXY_STORAGE_CONTRACT.setUint(key, totalDebts);
    }



    /**
     * @notice          Getter where we can check how much ETH user owes to 2key.network for his registration
     * @param           _userPlasma is user plasma address
     */
    function getDebtForUser(
        address _userPlasma
    )
    public
    view
    returns (uint)
    {
        return PROXY_STORAGE_CONTRACT.getUint(keccak256(_userPlasmaToDebtInETH, _userPlasma));
    }


    /**
     * @notice          Function to check if user has some debts and if yes, take them from _amount
     * @param           _plasmaAddress is the plasma address of the user
     * @param           _debtPaying is the part or full debt user is paying
     */
    function payDebtWhenConvertingOrWithdrawingProceeds(
        address _plasmaAddress,
        uint _debtPaying
    )
    public
    payable
    onlyAllowedContracts
    {
        bytes32 keyHashForDebt = keccak256(_userPlasmaToDebtInETH, _plasmaAddress);
        uint totalDebtForUser = PROXY_STORAGE_CONTRACT.getUint(keyHashForDebt);

        PROXY_STORAGE_CONTRACT.setUint(keyHashForDebt, totalDebtForUser.sub(_debtPaying));

        // Increase amount of total debts paid to 2Key network in ETH
        bytes32 key = keccak256(_totalPaidInETH);
        uint totalPaidInEth = PROXY_STORAGE_CONTRACT.getUint(key);
        PROXY_STORAGE_CONTRACT.setUint(key, totalPaidInEth.add(_debtPaying));

        ITwoKeyEventSource(getAddressFromTwoKeySingletonRegistry("TwoKeyEventSource")).emitDebtEvent(
            _plasmaAddress,
            _debtPaying,
            false,
            "ETH"
        );
    }

    function payDebtWithDAI(
        address _plasmaAddress,
        uint _totalDebtDAI,
        uint _debtAmountPaidDAI
    )
    public
    {
        require(msg.sender == getAddressFromTwoKeySingletonRegistry("TwoKeyUpgradableExchange"));

        bytes32 keyHashForDebt = keccak256(_userPlasmaToDebtInETH, _plasmaAddress);
        uint totalDebtForUser = PROXY_STORAGE_CONTRACT.getUint(keyHashForDebt);

        bytes32 keyHashTotalPaidInDAI = keccak256(_totalPaidInDAI);
        // Set total paid in DAI
        PROXY_STORAGE_CONTRACT.setUint(keyHashTotalPaidInDAI, _debtAmountPaidDAI.add(PROXY_STORAGE_CONTRACT.getUint(keyHashTotalPaidInDAI)));

        totalDebtForUser = totalDebtForUser - totalDebtForUser.mul(_debtAmountPaidDAI.mul(10**18).div(_totalDebtDAI)).div(10**18);

        PROXY_STORAGE_CONTRACT.setUint(keyHashForDebt, totalDebtForUser);

        ITwoKeyEventSource(getAddressFromTwoKeySingletonRegistry("TwoKeyEventSource")).emitDebtEvent(
            _plasmaAddress,
            _debtAmountPaidDAI,
            false,
            "DAI"
        );

    }


    function payDebtWith2Key(
        address _beneficiaryPublic,
        address _plasmaAddress,
        uint _amountOf2keyForRewards
    )
    public
    onlyAllowedContracts
    {
        uint usersDebtInEth = getDebtForUser(_plasmaAddress);
        uint amountToPay = 0;

        if(usersDebtInEth > 0) {
            address upgradableExchange = getAddressFromTwoKeySingletonRegistry("TwoKeyUpgradableExchange");
            uint contractID = IUpgradableExchange(upgradableExchange).getContractId(msg.sender);
            uint ethTo2key = IUpgradableExchange(upgradableExchange).getEth2KeyAverageRatePerContract(contractID);

            // 2KEY / ETH
            uint debtIn2Key = (usersDebtInEth.mul(ethTo2key)).div(10**18); // ETH * (2KEY / ETH) = 2KEY

            // This is the initial amount he has to pay
            amountToPay = debtIn2Key;

            if (_amountOf2keyForRewards > debtIn2Key){
                if(_amountOf2keyForRewards < 3 * debtIn2Key) {
                    amountToPay = debtIn2Key / 2;
                }
            }
            else {
                amountToPay = _amountOf2keyForRewards / 4;
            }

            // Emit event that debt is paid it's inside this if because if there's no debt it will just continue and transfer all tokens to the influencer
            ITwoKeyEventSource(getAddressFromTwoKeySingletonRegistry("TwoKeyEventSource")).emitDebtEvent(
                _plasmaAddress,
                amountToPay,
                false,
                "2KEY"
            );


            // Get keyhash for debt
            bytes32 keyHashForDebt = keccak256(_userPlasmaToDebtInETH, _plasmaAddress);

            bytes32 keyHashTotalPaidIn2Key = keccak256(_totalPaidIn2Key);

            // Set total paid in DAI
            PROXY_STORAGE_CONTRACT.setUint(keyHashTotalPaidIn2Key, amountToPay.add(PROXY_STORAGE_CONTRACT.getUint(keyHashTotalPaidIn2Key)));

            usersDebtInEth = usersDebtInEth - usersDebtInEth.mul(amountToPay.mul(10**18).div(debtIn2Key)).div(10**18);

            PROXY_STORAGE_CONTRACT.setUint(keyHashForDebt, usersDebtInEth);
        }

        address twoKeyEconomy = getNonUpgradableContractAddressFromTwoKeySingletonRegistry("TwoKeyEconomy");
        // Take tokens from campaign contract
        IERC20(twoKeyEconomy).transferFrom(msg.sender, address(this), _amountOf2keyForRewards);
        // Transfer tokens - debt to influencer
        IERC20(twoKeyEconomy).transfer(_beneficiaryPublic, _amountOf2keyForRewards.sub(amountToPay));
    }


    /**
     * @notice          Function to get status of the debts
     */
    function getDebtsSummary()
    public
    view
    returns (uint,uint,uint,uint)
    {
        uint totalDebtsInEth = PROXY_STORAGE_CONTRACT.getUint(keccak256(_totalDebtsInETH));
        uint totalPaidInEth = PROXY_STORAGE_CONTRACT.getUint(keccak256(_totalPaidInETH));
        uint totalPaidInDAI = PROXY_STORAGE_CONTRACT.getUint(keccak256(_totalPaidInDAI));
        uint totalPaidIn2Key = PROXY_STORAGE_CONTRACT.getUint(keccak256(_totalPaidIn2Key));

        return (
        totalDebtsInEth,
        totalPaidInEth,
        totalPaidInDAI,
        totalPaidIn2Key
        );
    }


    function withdrawEtherCollected()
    public
    {
        address twoKeyAdmin = getAddressFromTwoKeySingletonRegistry("TwoKeyAdmin");
        require(msg.sender == twoKeyAdmin);

        uint balance = address(this).balance;

        bytes32 keyHash = keccak256(_totalWithdrawnInETH);
        PROXY_STORAGE_CONTRACT.setUint(keyHash, balance.add(PROXY_STORAGE_CONTRACT.getUint(keyHash)));

        twoKeyAdmin.transfer(balance);
    }

}
