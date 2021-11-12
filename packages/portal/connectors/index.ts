import { Connector } from '@web3-react/types'
import type { Web3ReactHooks } from '@web3-react/core'
import { network, hooks as networkHooks } from './network'

export { network, networkHooks }

export const connectors: [Connector, Web3ReactHooks][] = [
  [network, networkHooks],
]
