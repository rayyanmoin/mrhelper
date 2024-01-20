import * as React from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material'
import { truncate } from 'truncate-ethereum-address'
import { BigNumber } from 'bignumber.js'
import { Link } from 'react-router-dom'

const bull = (
  <Box component="span" sx={{ mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
)

export default function CampaignCard({ user = '', helper = '', amount = 0 }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
          Campaign Details
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Beneficiary: {truncate(user, { separator: 'parenthesis' })}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Contract: {truncate(helper)}
        </Typography>

        <Typography variant="body2">
          Amounts collected:
          <br />
          {BigInt(amount).toString()}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" LinkComponent={Link} to={`/campaign/${helper}`}>
          View Details
        </Button>
      </CardActions>
    </Card>
  )
}
