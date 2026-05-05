export const hashUserDataForQueryKey = (data: unknown) => {
  const raw = JSON.stringify(data)
  let hash = 0
  for (let index = 0; index < raw.length; index += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(index)
    hash |= 0
  }
  return String(hash)
}
