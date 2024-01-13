import api from './interceptor'
import { getAllUserCampaigns } from './payload'

export const getAllCampaigns = user =>
  api.post('', {
    query: getAllUserCampaigns(user),
  })
