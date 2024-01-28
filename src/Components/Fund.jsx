import { useState, useEffect } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import usePrepareConfig from '../hooks/usePrepareConfig'
import { parseUnits } from 'viem'
import { CircularProgress } from '@mui/material'

const Fund = ({ helper, beneficiary }) => {
  const [fundingAmount, setFundingAmount] = useState(0)
  console.log(helper, beneficiary)

  const { address: userAddress } = useAccount()
  const partialConfig = usePrepareConfig()
  const { config } = usePrepareContractWrite({
    ...partialConfig,
    address: helper,
    functionName: 'fund',
    // enabled: !!partialConfig.address,
    args: [beneficiary, userAddress],
    value: parseUnits(fundingAmount.toString(), 18),
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

  const makeFunding = async e => {
    e.preventDefault()
    try {
      write()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isError) {
      void refetch()
    }
  }, [isError])

  useEffect(() => {
    console.log('==============')
    console.log(data, receipt, receiptError, error, status)
    console.log('==============')
  }, [isSuccess, isError, receiptisSuccess, receiptisError, status, receiptError, error, data, receipt])

  return (
    <div>
      Fund
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={makeFunding}>
          <input type="number" placeholder="Amount" value={fundingAmount} name="amount" onChange={e => setFundingAmount(e.target.value)} />
          <button type="submit">Make Fund</button>
        </form>
      )}
      {isError ? error.message : ''}
      {receiptisError ? receiptError.message : ''}
      {isSuccess ? <p>Transaction Successful</p> : ''}
    </div>
  )
}

export default Fund
