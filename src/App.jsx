import { useEffect } from 'react'
import './App.css'
import Navbar from './Componentes/Navbar'

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Layout from './Layout'

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

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
        <p>Balance: {data?.formatted}</p>
      </div>
    )
  return (
    <div>
      <Navbar />
      <button onClick={() => connect()}>Connect Wallet</button>
      <Layout></Layout>
    </div>
  )
}

export default App
