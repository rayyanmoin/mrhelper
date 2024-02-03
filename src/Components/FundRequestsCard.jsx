// import React from 'react'
// import * as React from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import { truncate } from 'truncate-ethereum-address'
import { Link } from 'react-router-dom'
import { formatEther } from 'viem'
import { isExpired } from '../utils/utils'

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
const FundRequestsCard = ({ beneficiary, helper, isFunded, requestedAmount, deadline }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
          Fund Request
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Beneficiary: {truncate(beneficiary, { separator: 'parenthesis' })}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Contract: {truncate(helper)}
        </Typography>

        <Typography variant="body2">
          Amounts requested:
          <br />
          {formatEther(requestedAmount)} ETH
        </Typography>

        <Typography variant="body2">{isExpired(deadline) ? '❌ Expired' : isFunded ? '✔️ Already Funded' : '⏳ Outstanding'}</Typography>
      </CardContent>

      <CardActions>
        <Button size="small" LinkComponent={Link} to={`/campaign/${helper}`} state={{ beneficiary }}>
          View Details
        </Button>
      </CardActions>
    </Card>
  )
}

export default FundRequestsCard
