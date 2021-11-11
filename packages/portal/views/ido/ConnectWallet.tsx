import { useEffect, useState, VFC } from 'react'
import {
  Box,
  Button,
  Center,
  Grid,
  InputGroup,
  NumberInput,
  NumberInputField,
  InputRightElement,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import {
  useContractCalls,
  useContractFunction,
  useEthers,
  useTokenAllowance,
  useTokenBalance,
} from '@usedapp/core'
import { BigNumber, ethers, utils } from 'ethers'

import { addresses } from '@/constants'
import { Section } from '@/components'
import { MIMContract, IDOContract, IDOInterface } from '@/constants'

const baseParams = {
  abi: IDOInterface,
  address: addresses.IDO,
  args: [],
}

const Connect: VFC = () => {
  const toast = useToast()
  const { activateBrowserWallet } = useEthers()

  const connect = () => {
    // TODO:
    activateBrowserWallet(err => {
      toast({
        status: 'error',
        title: err.message,
        position: 'bottom-right',
      })
    })
  }

  return (
    <Box>
      <Button
        size="lg"
        colorScheme="orange"
        borderRadius="full"
        onClick={connect}
      >
        Connect Your Wallet
      </Button>
    </Box>
  )
}

const Approve: VFC = () => {
  const { active, library } = useEthers()
  const { send, state } = useContractFunction(MIMContract, 'approve')

  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(state.status === 'Mining')
  }, [state])

  const toast = useToast()
  useEffect(() => {
    if (state.status === 'Fail' || state.status === 'Exception') {
      toast({
        status: 'error',
        title: state.status,
        description: state.errorMessage,
        position: 'bottom-right',
      })
    }
  }, [state, toast])

  const approve = async () => {
    if (!library?.getSigner() || isLoading) return
    await send(addresses.IDO, ethers.constants.MaxUint256)
  }

  if (!active) return null

  return (
    <Center>
      <Button
        size="lg"
        colorScheme="orange"
        borderRadius="full"
        isLoading={isLoading}
        loadingText="Pending"
        onClick={approve}
      >
        Approve
      </Button>
    </Center>
  )
}

const Purchase: VFC<{ account: string }> = ({ account }) => {
  const balance = useTokenBalance(addresses.MIM, account)

  const [
    [price] = [BigNumber.from(0)],
    [allotment] = [BigNumber.from(0)],
    [maxPurchaseAmount] = [BigNumber.from(0)],
  ] = useContractCalls([
    { ...baseParams, method: 'salePrice' },
    { ...baseParams, method: 'getAllotmentPerBuyer' },
    { ...baseParams, method: 'calculateSaleQuote', args: [balance] },
  ])

  const maxCanPurchaseAmount = allotment.gt(maxPurchaseAmount)
    ? maxPurchaseAmount
    : allotment

  const maxAmount = utils.formatUnits(price.mul(maxCanPurchaseAmount), 18 + 9)
  const maxBabelAmount = utils.formatUnits(maxCanPurchaseAmount, 9)

  const { library } = useEthers()
  const { send, state } = useContractFunction(IDOContract, 'purchaseBABEL')
  const isLoading = state.status === 'Mining'
  const isDisabled = allotment.lte(0)

  const [amount, setAmount] = useState('0')
  const [babelAmount, setBabelAmount] = useState('0')

  const handleSetMaxAmount = () => {
    const max = allotment.gt(maxCanPurchaseAmount)
      ? maxCanPurchaseAmount
      : allotment
    const maxAmount = utils.formatUnits(price.mul(max), 18 + 9)
    const maxBabelAmount = utils.formatUnits(max, 9)
    setBabelAmount(maxBabelAmount)
    setAmount(maxAmount)
  }

  const handleAmountChange = (v: string) => {
    setAmount(v)
    if (!v) v = '0'
    if (price.isZero()) return // TODO
    const babelAmount = utils.parseUnits(v, 18 + 9).div(price)
    setBabelAmount(utils.formatUnits(babelAmount, 9))
  }

  const handleBabelAmountChange = (v: string) => {
    setBabelAmount(v)
    if (!v) {
      v = '0'
    }
    const amount = price.mul(utils.parseUnits(v, 9))
    setAmount(utils.formatUnits(amount, 18 + 9))
  }

  const toast = useToast()
  useEffect(() => {
    if (state.status === 'Fail' || state.status === 'Exception') {
      toast({
        status: 'error',
        title: state.status,
        description: state.errorMessage,
        position: 'bottom-right',
      })
    }
  }, [state, toast])

  const purchase = async () => {
    if (!library?.getSigner()) return
    const value = utils.parseUnits(amount, 18)
    if (value.lte(0)) {
      toast({
        status: 'warning',
        description: 'Amount must be greater than zero',
        position: 'bottom-right',
      })
      return
    }
    await send(value)
  }

  return (
    <Grid
      gridGap="4"
      alignItems="end"
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
    >
      <VStack alignItems="flex-start">
        <Text>MIM</Text>
        <InputGroup>
          <NumberInput
            onChange={handleAmountChange}
            isDisabled={isDisabled}
            min={0}
            max={Number(maxAmount)}
            value={amount}
            width="full"
          >
            <NumberInputField />
          </NumberInput>
          <InputRightElement width="4.5rem">
            <Button
              size="sm"
              h="1.75rem"
              isDisabled={isDisabled}
              onClick={handleSetMaxAmount}
            >
              MAX
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
      <VStack alignItems="flex-start">
        <Text>BABEL</Text>
        <InputGroup>
          <NumberInput
            onChange={handleBabelAmountChange}
            isDisabled={isDisabled}
            min={0}
            max={Number(maxBabelAmount)}
            value={babelAmount}
            width="full"
          >
            <NumberInputField />
          </NumberInput>
          <InputRightElement width="4.5rem">
            <Button
              size="sm"
              h="1.75rem"
              isDisabled={isDisabled}
              onClick={handleSetMaxAmount}
            >
              MAX
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
      <Box w={{ base: 'full', md: 'auto' }}>
        <Button
          onClick={purchase}
          colorScheme="orange"
          isDisabled={isDisabled}
          isLoading={isLoading}
          loadingText="Pending"
          isFullWidth
        >
          Purchase
        </Button>
      </Box>
    </Grid>
  )
}

const Claim: VFC<{ isDisabled: boolean }> = ({ isDisabled }) => {
  const { account, library } = useEthers()
  const { send, state } = useContractFunction(IDOContract, 'claim')

  const toast = useToast()
  useEffect(() => {
    if (state.status === 'Fail' || state.status === 'Exception') {
      toast({
        status: 'error',
        title: state.status,
        description: state.errorMessage,
        position: 'bottom-right',
      })
    }
  }, [state, toast])

  const claim = async () => library?.getSigner() && (await send(account))

  return (
    <Center>
      <Button
        onClick={claim}
        size="lg"
        borderRadius="full"
        colorScheme="orange"
        isDisabled={isDisabled}
      >
        Claim & Staking
      </Button>
    </Center>
  )
}

const ConnectWalletContent: VFC = () => {
  const { account } = useEthers()
  const allowance = useTokenAllowance(addresses.MIM, account, addresses.IDO)
  const [
    [initialized] = [false],
    [whitelistEnabled] = [false],
    [saleStarted] = [false],
    [finalized] = [false],
  ] = useContractCalls([
    { ...baseParams, method: 'initialized' },
    { ...baseParams, method: 'whiteListEnabled' },
    { ...baseParams, method: 'saleStarted' },
    { ...baseParams, method: 'finalized' },
  ])
  const [
    [whitelisted] = [false],
    [bought] = [false],
    [purchasedAmount] = [BigNumber.from(0)],
  ] = useContractCalls([
    { ...baseParams, method: 'whiteListed', args: [account] },
    { ...baseParams, method: 'boughtBABEL', args: [account] },
    { ...baseParams, method: 'purchasedAmounts', args: [account] },
  ])

  let isShowApprove = !bought && !allowance?.eq(ethers.constants.MaxUint256)
  let isShowPurchase = !isShowApprove && saleStarted && !bought && !finalized
  const isShowClaim = bought && purchasedAmount.gt(0)
  const isDisabledClaim = bought && !finalized
  let note: string

  if (whitelistEnabled && !whitelisted) {
    note = 'You are not in Whitelist!'
    isShowPurchase = false
    isShowApprove = false
  }

  if (bought && purchasedAmount.gt(0)) {
    note = `You have purchased ${utils.formatUnits(purchasedAmount, 9)} BABEL!`
  }

  return (
    <Box w="full">
      {isShowApprove && <Approve />}
      {isShowPurchase && <Purchase account={account} />}
      {isShowClaim && <Claim isDisabled={isDisabledClaim} />}
      {finalized && (
        <Center>
          <Button size="lg" borderRadius="full" colorScheme="orange">
            Goto APP
          </Button>
        </Center>
      )}
      {note && (
        <Text
          className="mt-6"
          fontSize="sm"
          color="orange.400"
          textAlign="center"
        >{`Note: ${note}`}</Text>
      )}
    </Box>
  )
}

export const ConnectWallet: VFC = () => {
  const { active } = useEthers()
  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Section>
      <Box
        className="flex flex-col justify-center items-center max-w-4xl mx-auto rounded-lg px-8 py-6"
        bgColor={bgColor}
      >
        <h4 className="font-bold mb-4">
          Claim your BABEL to join the Babel DAO now!
        </h4>
        {active ? <ConnectWalletContent /> : <Connect />}
      </Box>
    </Section>
  )
}
