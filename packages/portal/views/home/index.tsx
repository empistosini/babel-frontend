import { VFC } from 'react'

import { Header } from './header'
import { Hero } from './hero'

export const Home: VFC = () => {
  return (
    <>
      <Header />
      <Hero />
    </>
  )
}
