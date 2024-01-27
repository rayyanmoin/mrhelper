import api from './interceptor'
import { getAllUserHelpers, getFundingDetailsOfHelper, getHelperDetails } from './payload'

export const getAllUserHelpersEndpoint = user =>
  api.post('', {
    query: getAllUserHelpers(user),
  })

export const getFundingDetailsOfHelperEndpoint = helperAddress =>
  api.post('', {
    query: getFundingDetailsOfHelper(helperAddress),
  })

export const getHelperDetailsEndpoint = (user, helper) =>
  api.post('', {
    query: getHelperDetails(user, helper),
  })
