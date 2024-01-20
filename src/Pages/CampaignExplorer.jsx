import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CampaignExplorer = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    const helperAddress = pathname.split('/')[2]
  }, [pathname])
  return <div>CampaignExplorer</div>
}

export default CampaignExplorer
