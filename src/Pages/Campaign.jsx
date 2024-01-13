import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getAllCampaigns as getAllCampaignsEndpoint } from '../utils/endpoints'

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([])
  const { address, isConnected } = useAccount()

  useEffect(() => {
    const getAllCampaigns = async () => {
      try {
        const campaigns = await getAllCampaignsEndpoint(address)
        // setCampaigns(campaigns)
        console.log(campaigns)
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
