import { VFC } from 'react'
import { Skeleton, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { providers } from 'ethers'

import { Section } from '@/components'
import {
  BABELMIMContract,
  MIMContract,
  sBABELContract,
} from '@/constants'
import { useAsync } from '@/hooks/useAsync'
import {
  getLPTreasuryBalance,
  getTreasuryBalance,
  currencyFormater,
  numberFormater,
} from '@/helpers'
import { getStakingAPY } from '@/helpers/getStakingAPY'

const { StaticJsonRpcProvider } = providers
const provider = new StaticJsonRpcProvider(process.env.NEXT_PUBLIC_CHAIN_URL)
const getAllTreasuryBalance = async () =>
  Promise.all([
    getTreasuryBalance(MIMContract, provider),
    getLPTreasuryBalance(BABELMIMContract, provider),
  ])
const getStakingAPYFn = async () => getStakingAPY(provider as any)
const getCircSupply = async () =>
  (await sBABELContract.connect(provider).circulatingSupply()) / Math.pow(10, 9)

export const StatPanel: VFC = () => {
  const { value: treasuryBalances, status: treasuryBalancesStatus } = useAsync(
    getAllTreasuryBalance,
  )
  const treasuryBalance = treasuryBalances?.reduce((a, b) => a + b)

  const { value: stakingAPY, status: stakingAPYStatus } =
    useAsync(getStakingAPYFn)

  const {
    value: circSupply,
    status: circSupplyStatus,
    error,
  } = useAsync(getCircSupply)

  console.log(error)

  return (
    <Section>
      <div className="grid grid-cols-1 text-center gap-4 md:grid-cols-3">
        <Stat
          flexBasis={{ base: '100%', md: '25%' }}
          mb={{ base: 2, md: 0 }}
          size="xl"
        >
          <StatLabel fontSize={{ base: 'xl', md: 'lg' }}>
            Total BABEL Staked
          </StatLabel>
          <Skeleton isLoaded={circSupplyStatus === 'success'}>
            <StatNumber fontSize={{ base: '4xl', md: '3xl' }}>
              {numberFormater.format(circSupply)}
            </StatNumber>
          </Skeleton>
        </Stat>
        <Stat flexBasis={{ base: '100%', md: '25%' }} mb={{ base: 2, md: 0 }}>
          <StatLabel fontSize={{ base: 'xl', md: 'lg' }}>
            Treasury Balance
          </StatLabel>
          <Skeleton isLoaded={treasuryBalancesStatus === 'success'}>
            <StatNumber fontSize={{ base: '4xl', md: '3xl' }}>
              {currencyFormater.format(treasuryBalance)}
            </StatNumber>
          </Skeleton>
        </Stat>
        <Stat flexBasis={{ base: '100%', md: '25%' }} mb={{ base: 2, md: 0 }}>
          <StatLabel fontSize={{ base: 'xl', md: 'lg' }}>Current APY</StatLabel>
          <Skeleton isLoaded={stakingAPYStatus === 'success'}>
            <StatNumber
              fontSize={{ base: '4xl', md: '3xl' }}
            >{`${numberFormater.format(stakingAPY * 100)}%`}</StatNumber>
          </Skeleton>
        </Stat>
      </div>
    </Section>
  )
}
