export const isExpired = deadline => {
  return deadline * 1000 < Date.now()
}
