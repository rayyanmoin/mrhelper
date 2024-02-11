import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getFundingDetailsOfHelperEndpoint, getHelperDetailsEndpoint } from '../utils/endpoints'
import usePrepareConfig from '../hooks/usePrepareConfig'
import { usePrepareContractWrite, useAccount, useNetwork } from 'wagmi'
import { formatEther } from 'viem'
import Fund from '../Components/Fund'
import { EXPLORER_URL } from '../utils/constants'
import { truncate } from 'truncate-ethereum-address'
import { Divider } from '@mui/material'
import MakeFundRequest from '../Components/MakeFundRequest'
import { isExpired } from '../utils/utils'
import { WithdrawFunds } from '../Components/WithdrawFunds'

const CampaignExplorer = () => {
  const [totalFund, setTotalFund] = useState(0)
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
        setTotalFund(fundeds.reduce((acc, curr) => acc + +curr.amount, 0))
        setFundingDetails(fundeds)
        setHelperDetails(Array.isArray(fundingLives) ? fundingLives[0] : fundingLives)
      } catch (error) {
        console.log(error)
      }
    }
    address && isConnected && getCampaignDetails()
  }, [address, isConnected, helperAddress])

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
        <p>Amount Raised so far: {formatEther(totalFund)}</p>
        <p>Amount to be Raised: {formatEther(BigInt(helperDetails.amount) - BigInt(totalFund))}</p>
        <p>Campaign Expires in: {new Date(+helperDetails.deadline * 1000).toString()}</p>
        <p>Expiration Status: {isExpired(helperDetails.deadline) ? 'Expired' : 'Active'}</p>
        <p>Description: {helperDetails.description}</p>
      </div>
      <Divider light />
      <Fund helper={helperAddress} beneficiary={beneficiary} />
      <Divider light />
      <MakeFundRequest helper={helperAddress} />
      <Divider light />
      <WithdrawFunds helper={helperAddress} />
      {fundingDetails.map(fund => (
        <>
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
          <Divider light />
        </>
      ))}
    </div>
  )
}

export default CampaignExplorer
