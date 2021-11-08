import NextApp from 'next/app'
import '../styles/global.css'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}
