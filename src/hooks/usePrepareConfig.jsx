import React from 'react'
import { useContractWrite } from 'wagmi'
// import { useWriteContract } from 'wagmi'
import { ADDRESSES } from '../utils/constants'
import helperAbi from '../utils/Helper.json'
import factoryAbi from '../utils/HelperFactory.json'

const usePrepareConfig = (isFactory = false) => {
  // const {data, hash, writeContract} = useContractWrite({
  //   address: ADDRESSES.HELPER,
  //   abi: helperAbi,
  //   functionName: 'createHelper',
  //   args,

  // })
  return {
    address: isFactory ? ADDRESSES.FACTORY : ADDRESSES.HELPER,
    abi: isFactory ? factoryAbi : helperAbi,
  }
}

export default usePrepareConfig
