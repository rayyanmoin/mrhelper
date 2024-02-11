import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getAllUserHelpersEndpoint, getFundingDetailsOfHelperEndpoint } from '../utils/endpoints'
import CampaignCard from '../Components/CampaignCard'
import { CircularProgress } from '@mui/material'
import FundRequests from '../Components/FundRequests'
import CreateHelperModal from '../Components/CreateHelperModal'

const Campaign = () => {
  const [helpers, setHelpers] = useState([])
  const [isCampaignFetching, setIsCampaignFetching] = useState(false)
  const { address: userAddress, isConnected } = useAccount()

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
  }, [isConnected, userAddress])

  return (
    <>
      <CreateHelperModal />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          {isCampaignFetching && <CircularProgress />}
          {helpers.map(campaign => (
            <CampaignCard key={campaign.helper} {...campaign} />
          ))}
        </div>
        <FundRequests />
      </div>
    </>
  )
}

export default Campaign
