///SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./Helper.sol";

/**
 * @title HelperFactory
 * @author Saim Rayyan
 * @notice creates a helper contract, each Helper contract serves only one purpose
 */

contract HelperFactory {
    struct FundRequest {
        uint amount;
        address helper;
        address beneficiary;
        bool isFunded;
    }

    //user to fund request
    mapping(address => FundRequest[]) private _fundRequest;

    //owner to helper contracts
    mapping(address => address[]) private _helper;
    address[] private _helperAddresses;

    event HelperCreated(address indexed user, address indexed helper);
    event FundRequests(
        address indexed helperContract,
        uint amount,
        address funder,
        address beneficiary
    );

    function getHelperAddress(
        address user
    ) external view returns (address[] memory) {
        return _helper[user];
    }

    function createHelper() external returns (address) {
        address helper = address(new Helper());

        address[] storage userHelpers = _helper[msg.sender];
        userHelpers.push(helper);

        _helperAddresses.push(helper);
        emit HelperCreated(msg.sender, helper);
    }

    /**
     *
     * @param _index helper contract index
     * @param _amount amount to be requested
     * @param _funder user to request amount
     * @notice anyone can request fund for their campaign from anyone
     */
    function requestFund(uint _index, uint _amount, address _funder) external {
        //get specific helper contract details
        address helperContract = _helper[msg.sender][_index];
        
        //get funder details for that specific helper contract
        FundRequest[] storage _details = _fundRequest[_funder];

        _details.push(FundRequest(_amount, helperContract, msg.sender, false));
        emit FundRequests(helperContract, _amount, _funder, msg.sender);
    }

    function getFundRequests(
        address _user
    ) external view returns (FundRequest[] memory) {
        return _fundRequest[_user];
    }

    ///@TODO
    function completeFundDetails()
}