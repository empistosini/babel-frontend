import { Config } from '@usedapp/core'

export * from './social'
export * from './addresses'
export * from './contracts'

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
const chainUrl = process.env.NEXT_PUBLIC_CHAIN_URL
const multicallAddress = process.env.NEXT_PUBLIC_MULTICALL_ADDRESS

export const dappConfig: Config = {
  supportedChains: [Number(chainId)],
  readOnlyUrls: { [chainId]: chainUrl },
  multicallAddresses: { [chainId]: multicallAddress },
}
