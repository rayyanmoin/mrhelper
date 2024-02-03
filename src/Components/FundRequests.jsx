import { useEffect } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import usePrepareConfig from '../hooks/usePrepareConfig'
import FundRequestsCard from './FundRequestsCard'

const FundRequests = () => {
  // const [userFundRequests, setFundRequests] = useState([])
  const { address: userAddress } = useAccount()
  const factoryConfig = usePrepareConfig(true)

  const {
    data: userFundRequests,
    isError: isUserFundRequestsError,
    isLoading: isUserFundRequestsLoading,
  } = useContractRead({
    ...factoryConfig,
    functionName: 'getFundRequests',
    watch: true,
    args: [userAddress],
  })

  useEffect(() => {
    console.log(userFundRequests)

    console.log('isUserFundRequestsError', 'isUserFundRequestsLoading')
    console.log(isUserFundRequestsError, isUserFundRequestsLoading)
  }, [userFundRequests, isUserFundRequestsError, isUserFundRequestsLoading])

  return (
    <div>
      {userFundRequests?.map((request, index) => (
        <FundRequestsCard key={index + 1} {...request} />
      ))}
    </div>
  )
}

export default FundRequests
