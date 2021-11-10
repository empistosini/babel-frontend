import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { StyleFunctionProps, mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  shadows: { outline: '0 !important' },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor: mode(
          'var(--chakra-colors-gray-50)',
          'var(--chakra-colors-gray-900)',
        )(props),
      },
    }),
  },
})
