import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { WagmiConfig, createConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { CssBaseline, ThemeProvider } from '@mui/material'
import lightTheme from './config/theme/theme'
import { publicRoutes } from './routes.js'


const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: polygonMumbai,
    transport: http(),
  }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig config={config}>
    <RouterProvider router={publicRoutes} />
    <ThemeProvider theme={lightTheme}>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </WagmiConfig>,
)
      