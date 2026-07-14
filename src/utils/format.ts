export function formatCurrency(value: number, decimals = 4) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatPercent(value: number, decimals = 2) {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${formatCurrency(value, decimals)}%`
}
