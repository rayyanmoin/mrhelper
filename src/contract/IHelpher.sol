// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IHelper {
    function fund(address beneficiary, address funder) external payable;

    function withdrawFunds() external;

    function withdrawable(address user) external view returns (uint);

    event FundingLive(address helper, address recipient, uint amount, uint deadline, string description);
    event Withdrawn(address beneficiary, uint amount);
    event Funded(address helper, address funder, uint amount);
}