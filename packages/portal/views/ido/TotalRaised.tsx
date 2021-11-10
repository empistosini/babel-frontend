import { VFC } from 'react'
import Image from 'next/image'
import {
  Center,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTokenBalance } from '@usedapp/core'
import { utils } from 'ethers'

import { BabelHappy } from '@/assets/img'
import { addresses } from '@/constants'
import { currencyFormater } from '@/helpers'
import { Section } from '@/components/section'

export const TotalRaised: VFC = () => {
  const balance = useTokenBalance(addresses.MIM, addresses.IDO)
  const amount = currencyFormater.format(
    Number(utils.formatUnits(balance ?? 0, 18)),
  )

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('orange.500', 'orange.200')

  return (
    <Section>
      <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto md:grid-cols-3">
        <Center className="col-span-1" p="4">
          <div className="max-w-[200px]">
            <Image src={BabelHappy} alt="" />
          </div>
        </Center>
        <Center className="col-span-2 rounded-lg px-10 py-6" bgColor={bgColor}>
          <Stat textAlign="center">
            <StatLabel fontSize="2xl">Total Raised (MIM)</StatLabel>
            <Skeleton isLoaded={balance !== undefined}>
              <StatNumber fontSize="6xl" textColor={textColor}>
                {amount}
              </StatNumber>
            </Skeleton>
          </Stat>
        </Center>
      </div>
    </Section>
  )
}
