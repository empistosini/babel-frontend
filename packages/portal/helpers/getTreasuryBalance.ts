import { BigNumber, Contract, providers, utils } from 'ethers'
import { addresses, BONDING_CALC } from '@/constants'

export const getTreasuryBalance = async (
  contract: Contract,
  provider: providers.StaticJsonRpcProvider,
) => {
  const balance = await contract.connect(provider).balanceOf(addresses.TREASURY)
  return balance / Math.pow(10, 18)
}

export const getLPTreasuryBalance = async (
  contract: Contract,
  provider: providers.StaticJsonRpcProvider,
) => {
  const balance = await contract.connect(provider).balanceOf(addresses.TREASURY)
  const valuation = await BONDING_CALC.connect(provider).valuation(
    contract.address,
    balance,
  )
  const markdown = await BONDING_CALC.connect(provider).markdown(
    contract.address,
  )
  return (valuation / Math.pow(10, 9)) * (markdown / Math.pow(10, 18))
}
