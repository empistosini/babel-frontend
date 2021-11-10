import { VFC, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Container } from './container'
import Logo from '../assets/logo-single.png'
import clsx from 'clsx'

export const Header: VFC = () => {
  const [scrolled, setScrolled] = useState(false)
  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  const classes = clsx('fixed w-screen z-50', scrolled && 'bg-white')

  return (
    <header className={classes}>
      <Container className="flex justify-between items-center h-16">
        <Link href="/">
          <a className=" w-20">
            <Image src={Logo} alt="BabelDAO Logo" />
          </a>
        </Link>
        <ul className="hidden gap-4 md:flex">
          <li>
            <a
              target="_blank"
              href="https://github.com/BabelDAO"
              className="hover:underline hover:text-primary"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://babeldao.medium.com"
              className="hover:underline hover:text-primary"
              rel="noreferrer"
            >
              Medium
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://twitter.com/Babel_DAO"
              className="hover:underline hover:text-primary"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://discord.gg/8FHqKeqD"
              className="hover:underline hover:text-primary"
              rel="noreferrer"
            >
              Discord
            </a>
          </li>
        </ul>
      </Container>
    </header>
  )
}
