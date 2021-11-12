import { Contract, utils } from 'ethers'

import { abi } from '@/abi'
import { addresses } from './addresses'

export const MIMInterface = new utils.Interface(abi.MIM)
export const IDOInterface = new utils.Interface(abi.IDO)

export const MIMContract = new Contract(addresses.MIM, abi.MIM)
export const IDOContract = new Contract(addresses.IDO, abi.IDO)
export const BABELMIMContract = new Contract(
  addresses.BABEL_MIM_LP,
  abi.UniswapV2Pair,
)
export const BONDING_CALC = new Contract(
  addresses.BONDING_CALC,
  abi.BabelBondingCalc,
)
export const STAKINGContract = new Contract(addresses.STAKING, abi.BabelStaking)
export const sBABELContract = new Contract(addresses.sBABEL, abi.sBABEL)
