// import React from 'react'
// import * as React from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import { truncate } from 'truncate-ethereum-address'
import { Link } from 'react-router-dom'
import { formatEther } from 'viem'
import { isExpired } from '../utils/utils'
import usePrepareConfig from '../hooks/usePrepareConfig'
import { usePrepareContractWrite } from 'wagmi'
import { CompleteFundRequest } from './CompleteFundRequest'

/**
 * 
 * @returns 
 * beneficiary
: 
"0xB7bedc98860c55fD31d0bA9F89a77483Bc59a225"
fulfilledAmount
: 
0n
helper
: 
"0x8f4C78dc723A2FB7DC9cd5cD81075fe3bbAa7C42"
isFunded
: 
false
requestedAmount

 */
const FundRequestsCard = ({ beneficiary, helper, isFunded, requestedAmount, deadline, index }) => {
  // const {abi} = usePrepareConfig();

  //   const {config} = usePrepareContractWrite({
  //       abi,
  //       address: String(helper).toLowerCase(),
  //     'functionName': 'completeFundDetails',
  //     args: []
  //   })

  return (
    // <Card sx={{ minWidth: 275 }}>
    //   <CardContent>
    //     <Typography variant="h5" component="div">
    //       {/* be{bull}nev{bull}o{bull}lent */}
    //       Fund Request
    //     </Typography>
    //     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //       Beneficiary: {truncate(beneficiary, { separator: 'parenthesis' })}
    //     </Typography>
    //     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //       Contract: {truncate(String(helper).toLowerCase())}
    //     </Typography>

    //     <Typography variant="body2">
    //       Amounts requested:
    //       <br />
    //       {formatEther(requestedAmount)} ETH
    //     </Typography>

    //     <Typography variant="body2">{isExpired(deadline) ? '❌ Expired' : isFunded ? '✔️ Already Funded' : '⏳ Outstanding'}</Typography>
    //   </CardContent>

    //   <CardActions>
    //     <Button size="small" LinkComponent={Link} to={`/campaign/${String(helper).toLowerCase()}`} state={{ beneficiary }}>
    //       View Details
    //     </Button>
    //     <CompleteFundRequest index={index} value={ requestedAmount} helper={String(helper).toLowerCase()}/>
    //   </CardActions>
    // </Card>
    <Card sx={{ minWidth: 275, boxShadow: 3, margin: 2, backgroundColor: '#f0f0f0' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Fund Request
        </Typography>
        <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 1 }} gutterBottom>
          Beneficiary: {truncate(beneficiary, { separator: 'parenthesis' })}
        </Typography>
        <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 2 }} gutterBottom>
          Contract: {truncate(String(helper).toLowerCase())}
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Amounts requested:
          <br />
          <strong style={{ color: '#4caf50', fontWeight: 'bold' }}>{formatEther(requestedAmount)} ETH</strong>
        </Typography>

        <Typography
          variant="body2"
          color={isExpired(deadline) ? 'error' : isFunded ? 'success' : 'warning'}
          sx={{ fontFamily: 'Courier New, monospace' }}
        >
          {isExpired(deadline) ? '❌ Expired' : isFunded ? '✔️ Already Funded' : '⏳ Outstanding'}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', padding: 2 }}>
        <Button
          size="small"
          LinkComponent={Link}
          to={`/campaign/${String(helper).toLowerCase()}`}
          state={{ beneficiary }}
          variant="contained"
          color="primary"
          sx={{ fontFamily: 'Courier New, monospace' }}
        >
          View Details
        </Button>
        <CompleteFundRequest index={index} value={requestedAmount} helper={String(helper).toLowerCase()} />
      </CardActions>
    </Card>
  )
}

export default FundRequestsCard
