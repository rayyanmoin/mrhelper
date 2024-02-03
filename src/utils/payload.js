/**
 *
 * @param {user} user address of connected user
 * @returns all the campaigns deployed by user
 */
export const getAllUserHelpers = user => `{
  helperCreateds(where:{user: "${user}"} orderDirection:asc orderBy:blockTimestamp){
    user
    helper
  }
}`

export const getFundingDetailsOfHelper = campaignAddress => `{
  fundeds(
    where: {helper: "${campaignAddress}"}
    orderDirection: desc
    orderBy: blockTimestamp
  ) {
    funder
    amount
    totalFunds
    transactionHash
  }
}`

export const getHelperDetails = (user, helper) => `{
  fundingLives(where:{recipient: "${user}", helper: "${helper}"}) {
    recipient
    amount
    deadline
    description
    helper
  }
}`
