import React, { useState, useEffect } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import BigNumber from 'bignumber.js'
import { getAllCampaigns as getAllCampaignsEndpoint, getCampaignDetails as getCampaignDetailsEndpoint } from '../utils/endpoints'
import usePrepareConfig from '../hooks/usePrepareConfig'

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([])
  const { address: userAddress, isConnected } = useAccount()
  const partialConfig = usePrepareConfig(true)
  const { config } = usePrepareContractWrite({
    ...partialConfig,
    functionName: 'createHelper',
    // enabled: !!partialConfig.address,
    args: [new BigNumber(100000000000000), 86400, userAddress, 'using wagmi'],
  })

  const { data, error, isError, isLoading, isSuccess, writeAsync, write } = useContractWrite(config)
  const {
    data: receipt,
    isSuccess: receiptisSuccess,
    error: receiptError,
    isError: receiptisError,
    isFetching,
    refetch,
  } = useWaitForTransaction({
    hash: data?.hash,
  })

  const writeToContract = async () => {
    console.log('cinfig', config)
    console.log('call started')
    write()
    console.log('call ended')
  }

  useEffect(() => {
    if (isError) {
      void refetch()
    }
  }, [isError])

  useEffect(() => {
    const getAllCampaigns = async () => {
      try {
        const { helperCreateds } = await getAllCampaignsEndpoint(userAddress)
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
    console.log(userAddress)

    isConnected && getAllCampaigns()
    //@TODO fetch after 2 seconds of receipt confirmation
    if (isConnected && receipt) {
      // getAllCampaigns()
    }
  }, [isConnected, userAddress, receipt])

  return (
    <div>
      Campaign
      {campaigns.map(campaign => (
        <div key={campaign.helper}>
          <p>contract {campaign.helper}</p>
          <p>recipient {campaign.user}</p>
          <p>amount {campaign.totalFunds}</p>
          <hr />
        </div>
      ))}
      <button disabled={isLoading} onClick={writeToContract}>
        Create Helper
      </button>
    </div>
  )
}

export default Campaign
