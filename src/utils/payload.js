/**
 *
 * @param {user} user address of connected user
 * @returns all the campaigns deployed by user
 */
export const getAllUserCampaigns = user => `{
  helperCreateds(where:{user: "${user}"}){
    user
    helper
  }
}`

export const getFundingDetailsOfHelper = campaignAddress => `{
  fundeds(
    where: {helper: "${campaignAddress}"}
    orderDirection: desc
    orderBy: blockTimestamp
    first: 1
  ) {
    funder
    amount
    totalFunds
    transactionHash
  }
}`
