import { useEffect } from 'react'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Layout from './Layout'
import { Route, Router, Routes } from 'react-router-dom'
import Home from 'src/Pages/Home'
import SignIn from 'src/Pages/SignIn'
import CampaignExplorer from 'src/Pages/CampaignExplorer'
import Campaign from 'src/Pages/Campaign'
import Navbar from 'src/Componentes/Navbar'

function App() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { data } = useBalance({
    address,
  })

  useEffect(() => {
    console.log(data)
  }, [data, address])

  const { disconnect } = useDisconnect()

  return (
    <div>
      <Navbar />
      {isConnected ? (
        <div>
          Connected to {address}
          <button onClick={() => disconnect()}>Disconnect</button>
          <p>Balance: {data?.formatted}</p>
        </div>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
      {/* <Layout></Layout> */}
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="*" element={<Navbar />} />
        </Route>
        <Route path="/signin" element={<SignIn />}>
          <Route path="*" element={<Navbar />} />
        </Route>
        <Route path="/campaign/:address" element={<CampaignExplorer />}>
          <Route path="*" element={<Navbar />} />
        </Route>
        <Route path="/campaign" element={<Campaign />}>
          <Route path="*" element={<Navbar />} />
        </Route>
      </Routes>
      {/* </Router> */}
    </div>
  )
}

export default App
