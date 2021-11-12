import { useContext, useEffect, useMemo, VFC } from 'react'
// import Image from 'next/image'
import {
  Center,
  Image,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { useContractCall, ChainStateContext } from '@usedapp/core'
import { providers, utils } from 'ethers'

import { BabelHappy } from '@/assets/img'
import { addresses, IDOInterface } from '@/constants'
import { currencyFormater } from '@/helpers'
import { Section } from '@/components/section'
import { useAsync } from '@/hooks/useAsync'
import { MIMContract } from '@/constants'

const { StaticJsonRpcProvider } = providers
const provider = new StaticJsonRpcProvider(process.env.NEXT_PUBLIC_CHAIN_URL)
const asyncFn = async () =>
  MIMContract.connect(provider).balanceOf(addresses.IDO)

export const TotalRaised: VFC = () => {
  const { value } = useContext(ChainStateContext)
  const { execute, status, value: balance } = useAsync(asyncFn)
  const [finalized] = useContractCall({
    abi: IDOInterface,
    address: addresses.IDO,
    method: 'finalized',
    args: [],
  }) ?? [false]
  const amount = currencyFormater.format(
    Number(
      utils.formatUnits(
        finalized ? utils.parseUnits('1000000') : balance ?? 0,
        18,
      ),
    ),
  )

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('orange.500', 'orange.200')

  useEffect(() => {
    execute()
  }, [execute, value])

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
            <Skeleton isLoaded={status === 'success'}>
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
