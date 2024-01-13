import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getAllCampaigns as getAllCampaignsEndpoint, getCampaignDetails as getCampaignDetailsEndpoint } from '../utils/endpoints'

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([])
  const { address, isConnected } = useAccount()

  useEffect(() => {
    const getAllCampaigns = async () => {
      try {
        const { helperCreateds } = await getAllCampaignsEndpoint(address)
        // setCampaigns(campaigns)
        console.log(helperCreateds)

        const helperAddresses = helperCreateds.map(helper => helper.helper)
        const helperFundingDetails = await Promise.all(helperAddresses.map(helper => getCampaignDetailsEndpoint(helper)))
        console.log('helperFundingDetails')
        console.log(helperFundingDetails)

        const helperDetails = helperCreateds.map((helper, index) => {
          return {
            ...helper,
            ...helperFundingDetails[index].fundeds,
          }
        })
        setCampaigns(helperDetails)
        console.log(helperDetails)
      } catch (error) {
        console.log(error)
      }
    }
    console.log(address)

    isConnected && getAllCampaigns()
  }, [isConnected, address])
  return <div>Campaign</div>
}

export default Campaign
