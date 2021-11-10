import { Contract, utils } from 'ethers'

import { abi } from '@/abi'
import { addresses } from './addresses'

export const MIMInterface = new utils.Interface(abi.MIM)
export const IDOInterface = new utils.Interface(abi.IDO)

export const MIMContract = new Contract(addresses.MIM, abi.MIM)
export const IDOContract = new Contract(addresses.IDO, abi.IDO)
