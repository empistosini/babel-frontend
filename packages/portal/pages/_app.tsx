import NextApp from 'next/app'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { DAppProvider } from '@usedapp/core'

import '../styles/global.css'
import { theme } from '../styles/theme'
import { dappConfig } from '../constants'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <DAppProvider config={dappConfig}>
            <Component {...pageProps} />
          </DAppProvider>
        </ChakraProvider>
      </RecoilRoot>
    )
  }
}
