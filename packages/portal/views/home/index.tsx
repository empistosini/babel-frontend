import { VFC } from 'react'

import { Header } from './header'
import { Hero } from './hero'
import { StatPanel } from './StatPanel'

export const Home: VFC = () => {
  return (
    <>
      <Header />
      <Hero />
      <StatPanel />
    </>
  )
}
