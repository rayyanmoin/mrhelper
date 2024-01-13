/**
 *
 * @param {user} user address of connected user
 * @returns all the campaigns deployed by user
 */
export const getAllUserCampaigns = user => `{
      helperCreateds(where:{user: "${user}"}){
        id
        user
        transactionHash
        helper
      }
    }`
