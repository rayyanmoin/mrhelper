import api from './interceptor'
import { getAllUserCampaigns, getFundingDetailsOfHelper } from './payload'

export const getAllCampaigns = user =>
  api.post('', {
    query: getAllUserCampaigns(user),
  })

export const getCampaignDetails = campaignAddress =>
  api.post('', {
    query: getFundingDetailsOfHelper(campaignAddress),
  })
