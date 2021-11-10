import NextApp from 'next/app'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'

import '../styles/global.css'
import { theme } from '../styles/theme'

const config: Config = {
  readOnlyUrls: {
    // [43114]: "https://api.avax.network/ext/bc/C/rpc",
    [ChainId.Hardhat]: '',
  },
  supportedChains: [ChainId.Hardhat],
  multicallAddresses: {
    // [43114]: "0x17a0410D5998c3064648be0b49a63DD8034666EE",
    [ChainId.Hardhat]: '',
  },
}

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <DAppProvider config={config}>
            <Component {...pageProps} />
          </DAppProvider>
        </ChakraProvider>
      </RecoilRoot>
    )
  }
}
