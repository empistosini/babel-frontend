export const currencyFormater = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

export const numberFormater = new Intl.NumberFormat('en-US')
