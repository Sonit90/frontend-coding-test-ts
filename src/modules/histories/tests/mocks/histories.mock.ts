import mockHistory from './history.mock'

export default (count = 5) => {
  const result: ReturnType<typeof mockHistory>[] = []
  for (let i = 0; i < count; i += 1) {
    result.push(mockHistory())
  }
  return result
}
