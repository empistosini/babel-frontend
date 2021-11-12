import { STAKINGContract, sBABELContract } from '@/constants'
import { StaticJsonRpcProvider } from '@ethersproject/providers'

export const getStakingAPY = async (provider: StaticJsonRpcProvider) => {
  const stakingReward = (await STAKINGContract.connect(provider).epoch())
    .distribute
  const circ = await sBABELContract.connect(provider).circulatingSupply()
  return Math.pow(1 + stakingReward / circ, 365 * 3) - 1
}
