import { useEffect } from 'react'
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

  return (
    <div>
      {isConnected ? (
        <div>
          Connected to {address}
          <button onClick={() => disconnect()}>Disconnect</button>
          <p>Balance: {data?.formatted}</p>
        </div>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
      <Layout></Layout>
    </div>
  )
}

export default App
