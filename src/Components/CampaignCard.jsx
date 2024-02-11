import * as React from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import { truncate } from 'truncate-ethereum-address'
import { BigNumber } from 'bignumber.js'
import { Link } from 'react-router-dom'
import { formatEther } from 'viem'

const bull = (
  <Box component="span" sx={{ mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
)

export default function CampaignCard({ user = '', helper = '', amount = 0 }) {
  return (
    // <Card sx={{ minWidth: 275 }}>
    //   <CardContent>
    //     <Typography variant="h5" component="div">
    //       {/* be{bull}nev{bull}o{bull}lent */}
    //       Campaign Details
    //     </Typography>
    //     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //       Beneficiary: {truncate(user, { separator: 'parenthesis' })}
    //     </Typography>
    //     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //       Contract: {truncate(helper)}
    //     </Typography>

    //     <Typography variant="body2">
    //       Amounts collected:
    //       <br />
    //       {formatEther(amount)} ETH
    //     </Typography>
    //   </CardContent>

    //   <CardActions>
    //     <Button size="small" LinkComponent={Link} to={`/campaign/${helper}`} state={{ beneficiary: user }}>
    //       View Details
    //     </Button>
    //   </CardActions>
    // </Card>
    <Card sx={{ minWidth: 275, backgroundColor: '#f0f0f0', margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" mb={2} fontWeight={'bold'}>
          Campaign Details
        </Typography>

        <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 1 }}>
          Beneficiary: {truncate(user, { separator: 'parenthesis' })}
        </Typography>

        <Typography sx={{ fontSize: 14, color: 'text.secondary', marginBottom: 2 }}>Contract: {truncate(helper)}</Typography>

        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Amounts collected:
          <br />
          <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{formatEther(amount)} ETH</span>
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', padding: 2 }}>
        <Button
          size="small"
          LinkComponent={Link}
          to={`/campaign/${helper}`}
          state={{ beneficiary: user }}
          variant="contained"
          color="primary"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  )
}
