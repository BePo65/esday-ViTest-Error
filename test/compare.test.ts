import { describe, expect, it } from 'vitest'
import { esday } from '~/core'

describe('isSame', () => {
  it('without units', () => {
    const date = esday(new Date(2011, 3, 2, 3, 4, 5, 10))
    const dateCopy = esday(date)

    expect(date.isSame(esday(new Date(2012, 3, 2, 3, 4, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2010, 3, 2, 3, 4, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 2, 3, 4, 5, 10)))).toBe(true)
    expect(date.isSame(esday(new Date(2011, 4, 2, 3, 4, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 2, 2, 3, 4, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 3, 3, 4, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 1, 3, 4, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 2, 4, 4, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 2, 2, 4, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 2, 3, 5, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 2, 3, 3, 5, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 2, 3, 4, 6, 10)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 2, 3, 4, 4, 11)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 2, 3, 4, 5, 11)))).toBe(false)
    expect(date.isSame(esday(new Date(2011, 3, 2, 3, 4, 5, 9)))).toBe(false)
    expect(date.isSame(date)).toBe(true)
    expect(+date).toEqual(+dateCopy)
  })
})
