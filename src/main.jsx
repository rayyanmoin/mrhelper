import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WagmiConfig, createConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: polygonMumbai,
    transport: http(),
  }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig config={config}>
    <App />
  </WagmiConfig>,
)
