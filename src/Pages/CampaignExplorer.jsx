import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getFundingDetailsOfHelperEndpoint, getHelperDetailsEndpoint } from '../utils/endpoints'
import usePrepareConfig from '../hooks/usePrepareConfig'
import { usePrepareContractWrite, useAccount } from 'wagmi'
import { formatEther } from 'viem'

const CampaignExplorer = () => {
  const [fundingDetails, setFundingDetails] = useState([])
  const [helperDetails, setHelperDetails] = useState({
    recipient:"",
    amount:0,
    deadline:0,
    description:"",
    helper:""
  })
  const {
    pathname,
    state: { beneficiary },
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
    // args: [new BigNumber(100000000000000), 86400, userAddress, 'using wagmi'],
  })

  useEffect(() => {
    const getCampaignDetails = async () => {
      try {
        // const {fundeds} = await getFundingDetailsOfHelperEndpoint(helperAddress)
        // // setCampaigns(campaigns)
        // // console.log(helperCreateds)
        // const {helperCreateds} = await getHelperDetailsEndpoint(address, helperAddress)

        const [{ fundeds }, { fundingLives }] = await Promise.all([
          getFundingDetailsOfHelperEndpoint(helperAddress),
          getHelperDetailsEndpoint(address, helperAddress),
        ])
        console.log(fundeds, fundingLives)
        setFundingDetails(fundeds)
        setHelperDetails(Array.isArray(fundingLives) ? fundingLives[0] : fundingLives)
      } catch (error) {
        console.log(error)
      }
    }
    getCampaignDetails()
  }, [])

  useEffect(() => {
    console.log('helperDetails', helperDetails)
    console.log('fundingDetails', fundingDetails)
    console.log(formatEther('1000000000000000'))
  }, [helperDetails, fundingDetails])

  return (
    <div>
      CampaignExplorer
      <div>
        <p>Recipient : {helperDetails.recipient}</p>
        <p>Amount to Raise: {formatEther(BigInt(helperDetails.amount))} ETH</p>
        <p>Amount Raised so far: {fundingDetails.length > 0 ? fundingDetails[fundingDetails.length - 1].totalFunds : 0}</p>
        <p>Campaign Expires in: {new Date(+helperDetails.deadline).toString()}</p>
        <p>Expiration Status: {helperDetails.deadline < Date.now() ? 'Expired' : 'Active'}</p>
      </div>
      {fundingDetails.map(fund => (
        <div key={fund.transactionHash}>
          <p>{fund.funder}</p>
          <p>{fund.amount}</p>
          <p>{fund.transactionHash}</p>
        </div>
      ))}
    </div>
  )
}

export default CampaignExplorer
