import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import usePrepareConfig from '../hooks/usePrepareConfig'
import FundRequestsCard from './FundRequestsCard'
import { getHelperDeadlineEndpoint } from '../utils/endpoints'

const FundRequests = () => {
  // const [userFundRequests, setFundRequests] = useState([])
  const [helperDeadlines, setHelperDeadlines] = useState([])
  const { address: userAddress, isConnected } = useAccount()
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
    async function getHelperDeadline(userFundRequests) {
      try {
        const response = await Promise.all(userFundRequests.map(request => getHelperDeadlineEndpoint(request.helper)))
        console.log('deadline response', response)
        return response
        //array[i].fundingLives[0].deadline
        // const deadlines =
        // return deadlines
      } catch (error) {
        console.log(error)
      }
    }
    console.log(userFundRequests)
    if (isConnected && userAddress && userFundRequests?.length > 0) {
      getHelperDeadline(userFundRequests).then(deadlines => {
        const refinedDeadlines = deadlines.map(deadline => deadline.fundingLives?.[0].deadline)
        console.log('refinedDeadlines', refinedDeadlines)
        setHelperDeadlines(() => [...refinedDeadlines])
      })
      // console.log('deadlines', deadlines);
    }

    console.log('isUserFundRequestsError', 'isUserFundRequestsLoading')
    console.log(isUserFundRequestsError, isUserFundRequestsLoading)
  }, [userFundRequests, isUserFundRequestsError, isUserFundRequestsLoading])

  return (
    <div>
      {userFundRequests?.map((request, index) => (
        <FundRequestsCard key={index + 1} index={index} {...request} deadline={helperDeadlines[index]} />
      ))}
    </div>
  )
}

export default FundRequests
