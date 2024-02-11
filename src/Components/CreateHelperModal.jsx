import { useState, useEffect } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import BigNumber from 'bignumber.js'
import { getAllUserHelpersEndpoint, getFundingDetailsOfHelperEndpoint } from '../utils/endpoints'
import usePrepareConfig from '../hooks/usePrepareConfig'
import CampaignCard from '../Components/CampaignCard'
import { CircularProgress, Button } from '@mui/material'
import FundRequests from '../Components/FundRequests'

// Modal Implementation
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { formatEther, parseUnits } from 'viem'

const CreateHelperModal = () => {
  const { address: userAddress, isConnected } = useAccount()

  // State for modals
  const [open, setOpen] = useState(false)
  const [createHelperFormDetails, setCreateHelperFormDetails] = useState({
    days: 0,
    description: '',
    amount: 0,
  })

  const partialConfig = usePrepareConfig(true)
  const { config } = usePrepareContractWrite({
    ...partialConfig,
    functionName: 'createHelper',
    // enabled: !!partialConfig.address,
    args: [
      new BigNumber(parseUnits(createHelperFormDetails.amount.toString(), 18)),
      createHelperFormDetails.days * 86400,
      userAddress,
      createHelperFormDetails.description,
    ],
  })

  const { data, error, isError, isLoading, isSuccess, writeAsync, write } = useContractWrite(config)
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

  const writeToContract = async () => {
    console.log('cinfig', config)
    console.log('call started')
    write()
    console.log('call ended')
  }

  const handleCreateHelperFormDetails = e => {
    setCreateHelperFormDetails({
      ...createHelperFormDetails,
      [e.target.name]: e.target.value,
    })
  }

  // Handle Functions for modals
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (isError) {
      void refetch()
    }
  }, [isError])

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Open Modal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Helper</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the required information:</DialogContentText>
          <TextField
            autoFocus
            name="amount"
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={createHelperFormDetails.amount}
            onChange={handleCreateHelperFormDetails}
          />
          <TextField
            margin="dense"
            name="days"
            label="No. Of Days"
            type="number"
            fullWidth
            value={createHelperFormDetails.days}
            onChange={handleCreateHelperFormDetails}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={createHelperFormDetails.description}
            onChange={handleCreateHelperFormDetails}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={writeToContract} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateHelperModal
