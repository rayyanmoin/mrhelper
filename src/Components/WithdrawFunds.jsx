import React from 'react'
import usePrepareConfig from '../hooks/usePrepareConfig'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

export const WithdrawFunds = ({ helper }) => {
  const partialConfig = usePrepareConfig()

  const { config } = usePrepareContractWrite({
    ...partialConfig,
    address: helper,
    functionName: 'withdrawFunds',
  })

  const { data, write, error, isError, isLoading, isSuccess, isIdle, reset, status, variables, writeAsync } = useContractWrite(config)

  return <button onClick={write}>Withdraw Funds</button>
}
