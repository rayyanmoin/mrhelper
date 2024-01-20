import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getAllCampaigns as getAllCampaignsEndpoint, getCampaignDetails as getCampaignDetailsEndpoint } from '../utils/endpoints'
import usePrepareConfig from '../hooks/usePrepareConfig'
import { usePrepareContractWrite, useAccount } from 'wagmi'

const CampaignExplorer = () => {
  const {
    pathname,
    state:{beneficiary},
  } = useLocation()
  console.log(beneficiary)
  const helperAddress = pathname.split('/')[2]
  const { address, isConnected } = useAccount()

  const partialConfig = usePrepareConfig()
  const { config } = usePrepareContractWrite({
    ...partialConfig,
    address: helperAddress,
    functionName: 'fund',
    // enabled: !!partialConfig.address,
    args: [new BigNumber(100000000000000), 86400, userAddress, 'using wagmi'],
  })

  useEffect(() => {
    const getCampaignDetails = async () => {
      try {
        
        const helperCreateds = await getCampaignDetailsEndpoint(helperAddress)
        // setCampaigns(campaigns)
        console.log(helperCreateds)

      } catch (error) {
        console.log(error)
      }
    }
    getCampaignDetails()
  })

  useEffect(() => {
    const helperAddress = pathname.split('/')[2]


  }, [pathname])
  return <div>CampaignExplorer</div>
}

export default CampaignExplorer
