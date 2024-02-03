import { useState, useEffect } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import BigNumber from 'bignumber.js'
import { getAllUserHelpersEndpoint, getFundingDetailsOfHelperEndpoint } from '../utils/endpoints'
import usePrepareConfig from '../hooks/usePrepareConfig'
import CampaignCard from '../Components/CampaignCard'
import { CircularProgress, Button } from '@mui/material'
import FundRequests from '../Components/FundRequests'
const Campaign = () => {
  const [helpers, setHelpers] = useState([])
  const [isCampaignFetching, setIsCampaignFetching] = useState(false)
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
        setIsCampaignFetching(true)
        const { helperCreateds } = await getAllUserHelpersEndpoint(userAddress)
        // setHelpers(helpers)
        console.log(helperCreateds)

        const helperAddresses = helperCreateds.map(helper => helper.helper)
        const helperFundingDetails = await Promise.all(helperAddresses.map(helper => getFundingDetailsOfHelperEndpoint(helper)))
        console.log('helperFundingDetails')
        console.log(helperFundingDetails)

        const helperDetails = helperCreateds.map((helper, index) => {
          return {
            ...helper,
            ...helperFundingDetails[index].fundeds[0],
          }
        })
        setHelpers(helperDetails)
        console.log(helperDetails)
        setIsCampaignFetching(false)
      } catch (error) {
        setIsCampaignFetching(false)
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div>
        Campaign
        {!isCampaignFetching && (
          <Button disabled={isLoading} onClick={writeToContract} variant="outlined">
            Create Helper
          </Button>
        )}
        {isCampaignFetching && <CircularProgress />}
        {helpers.map(campaign => (
          <CampaignCard key={campaign.helper} {...campaign} />
        ))}
      </div>
      <FundRequests />
    </div>
  )
}

export default Campaign
