import { VFC } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import { Header } from '../home/header'
import { Container } from '@/components'
import { Section } from '@/components/section'
import { TotalRaised } from './TotalRaised'
import { ConnectWallet } from './ConnectWallet'
import { social } from '@/constants'

export const IDO: VFC = () => (
  <>
    <Header />
    <main className="pt-40">
      <section className="text-center">
        <Container className="container mx-auto">
          <h1 className="text-5xl font-bold max-w-2xl mx-auto mb-8">
            Claim your BABEL
          </h1>
          <p className="text-2xl font-medium max-w-2xl mx-auto">
            The IDO will be held from Nov 1, 2021 0:00 UTC to Nov 2, 2021 23:59
            UTC. Join the Babel DAO now! 🛕
          </p>
        </Container>
      </section>
      <TotalRaised />
      <ConnectWallet />
      <Section className="text-center" title="Join Our Community">
        <ul className="flex justify-center gap-6 mt-16">
          {social.links.map(({ key, url, icon: Icon, label }) => (
            <li key={key} className="flex-1 max-w-[256px]">
              <a
                href={url}
                className="flex flex-col gap-4 justify-center items-center h-40 hover:rounded-xl hover:shadow-md"
              >
                <Icon className="w-10 h-10 text-indigo-700" />
                <span className="font-bold">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <Section className="text-center">
        <Heading fontSize="2xl">Let&apos;s make it (🛕, 🛕)</Heading>
      </Section>
    </main>
  </>
)
