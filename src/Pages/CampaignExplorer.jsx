import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getFundingDetailsOfHelperEndpoint, getHelperDetailsEndpoint } from '../utils/endpoints'
import usePrepareConfig from '../hooks/usePrepareConfig'
import { usePrepareContractWrite, useAccount, useNetwork } from 'wagmi'
import { formatEther } from 'viem'
import Fund from '../Components/Fund'
import { EXPLORER_URL } from '../utils/constants'
import { truncate } from 'truncate-ethereum-address'

const CampaignExplorer = () => {
  const [fundingDetails, setFundingDetails] = useState([])
  const [helperDetails, setHelperDetails] = useState({
    recipient: '',
    amount: 0,
    deadline: 0,
    description: '',
    helper: '',
  })
  const {
    pathname,
    state: { beneficiary },
  } = useLocation()
  const network = useNetwork().chain
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
    address && isConnected && getCampaignDetails()
  }, [address, isConnected])

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
        <p>Amount Raised so far: {formatEther(fundingDetails.length > 0 ? fundingDetails[fundingDetails.length - 1].totalFunds : 0)}</p>
        <p>Campaign Expires in: {Date(+helperDetails.deadline).toString()}</p>
        <p>Expiration Status: {helperDetails.deadline < Date.now() ? 'Expired' : 'Active'}</p>
        <p>Description: {helperDetails.description}</p>
      </div>
      <div>
        <Fund helper={helperAddress} beneficiary={beneficiary} />
      </div>
      {fundingDetails.map(fund => (
        <div key={fund.transactionHash}>
          <a href={`${EXPLORER_URL[network?.id].AC}${fund.funder}`} rel="noreferrer" target="_blank">
            {truncate(fund.funder, { separator: 'parenthesis' })}
          </a>
          <p>{formatEther(fund.amount)}</p>
          <a href={`${EXPLORER_URL[network?.id].TX}${fund.transactionHash}`} rel="noreferrer" target="_blank">
            {' '}
            View Transaction on Explorer
          </a>
        </div>
      ))}
    </div>
  )
}

export default CampaignExplorer
