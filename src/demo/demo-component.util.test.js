import { formatNumberAsDollar } from './demo-component.util.js'

describe('formatNumberAsDollar', () => {
  it('should return a string with a dollar sign', () => {
    expect(formatNumberAsDollar(1)).toBe('$1')
  })
})
