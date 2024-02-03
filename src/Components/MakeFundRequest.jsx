import { useEffect, useState } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { getAllUserHelpersEndpoint } from '../utils/endpoints'
import usePrepareConfig from '../hooks/usePrepareConfig'
import { parseUnits, isAddress } from 'viem'

const MakeFundRequest = ({ helper }) => {
  const [helperIndex, setHelperIndex] = useState(0)
  const { address, isConnected } = useAccount()
  const [fundRequestData, setFundRequestData] = useState({
    amount: 0,
    funderAddress: '',
  })

  const partialConfig = usePrepareConfig(true)
  const { config } = usePrepareContractWrite({
    ...partialConfig,
    functionName: 'requestFund',
    // enabled: !!partialConfig.address,
    args: [helperIndex, parseUnits(fundRequestData.amount.toString(), 18), fundRequestData.funderAddress],
  })
  console.log(config)

  const { data, error, isError, isLoading, isSuccess, writeAsync, write, status } = useContractWrite(config)
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

  const onRequestFundSubmit = async e => {
    try {
      e.preventDefault()
      console.log('called with values', e)
      write()
    } catch (error) {
      console.log(error)
    }
  }

  const setFundRequestDataHandler = e => {
    setFundRequestData({
      ...fundRequestData,
      [e.target.name]: e.target.value,
    })
  }

  //fetch all helpers created
  //address == helper return index
  useEffect(() => {
    const getAllHelpers = async () => {
      try {
        const { helperCreateds } = await getAllUserHelpersEndpoint(address)
        console.log(helperCreateds)
        console.log(helper)

        //get index of helper
        setHelperIndex(helperCreateds.findIndex(hel => hel.helper === helper))
        console.log(
          'index: ',
          helperCreateds.findIndex(hel => hel.helper === helper),
        )
      } catch (error) {
        console.log(error)
      }
    }
    address && isConnected && getAllHelpers()
  }, [helper, address, isConnected])

  useEffect(() => {
    console.log(fundRequestData)
  }, [fundRequestData.amount])

  return (
    <div>
      MakeFundRequest
      <form onSubmit={onRequestFundSubmit}>
        <input value={fundRequestData.amount} onChange={setFundRequestDataHandler} type="number" name="amount" placeholder="amount" />
        <input
          value={fundRequestData.funderAddress}
          onChange={e => {
            setFundRequestDataHandler(e)
            if (!isAddress(e.target.value)) {
              alert('Invalid address')
            }
          }}
          type="text"
          name="funderAddress"
          placeholder="funder address"
        />
        <button type="submit">Submit request</button>
      </form>
      <div>
        {/* <p>{data?.hash}</p>
        <p>{receipt?.hash}</p>
        <p>{status}</p>
        <p>{receiptisSuccess}</p>
        <p>{receiptisError}</p>
        <p>{receiptError}</p> */}
      </div>
    </div>
  )
}

export default MakeFundRequest
