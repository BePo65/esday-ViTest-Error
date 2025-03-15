import type { EsDay } from 'esday'
import type { UnitType } from '~/types'

export function startOfImpl(that: EsDay, unit: UnitType, reverse = false) {
  const result = that.clone()
  return result
}
