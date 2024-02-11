import { useEffect, useState } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import { getAllUserHelpersEndpoint } from '../utils/endpoints'
import usePrepareConfig from '../hooks/usePrepareConfig'
import { parseUnits, isAddress } from 'viem'

export const CompleteFundRequest = ({ helper, index, value }) => {
  const helperAdress = String(helper).toLowerCase()
  const [helperIndex, setHelperIndex] = useState(0)
  const { address, isConnected } = useAccount()
  const [fundRequestData, setFundRequestData] = useState({
    amount: 0,
    funderAddress: '',
  })

  const partialConfig = usePrepareConfig(true)
  const { config } = usePrepareContractWrite({
    ...partialConfig,
    // address: helperAdress,
    functionName: 'completeFundDetails',
    // enabled: !!partialConfig.address,
    args: [index],
    value,
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
        console.log(helperAdress)

        //get index of helper
        setHelperIndex(helperCreateds.findIndex(hel => hel.helper === helperAdress))
        console.log(
          'index: ',
          helperCreateds.findIndex(hel => hel.helper === helperAdress),
        )
      } catch (error) {
        console.log(error)
      }
    }
    address && isConnected && getAllHelpers()
  }, [helperAdress, address, isConnected])

  useEffect(() => {
    console.log(fundRequestData)
  }, [fundRequestData.amount])
  return (
    <CardActions sx={{ padding: 2 }}>
      <Button size="small" onClick={onRequestFundSubmit} variant="contained" color="primary">
        Fund Request
      </Button>
    </CardActions>
  )
}
