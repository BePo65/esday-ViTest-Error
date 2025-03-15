/* eslint-disable ts/no-unsafe-declaration-merging */
import type { UnitWeek } from '~/common'
import type { DateType, UnitType } from '~/types'
import type { SimpleObject } from '~/types/util-types'
import { C } from '~/common'
import { getUnitInDate, prettyUnits } from '~/common/date-fields'
import { esday } from '.'
import { startOfImpl } from './Impl/startOf'

export class EsDay {
  protected $d!: Date
  /**
   * mainly for plugin compatibility
   * store data such as locale name, utc mode, etc.
   */
  private $conf: SimpleObject = {}
  constructor(d: Exclude<DateType, EsDay>, conf?: SimpleObject) {
    this.$conf = { ...conf }
    this.parse(d)
  }

  private parse(d: Exclude<DateType, EsDay>) {
    this.$d = this.$parseImpl(d)
  }

  private $parseImpl(date?: Exclude<DateType, EsDay>): Date {
    if (date instanceof Date)
      return new Date(date)
    return new Date()
  }

  isSame(that: DateType, units: UnitType = C.MS) {
    const other = esday(that)
    return this.startOf(units) <= other && other <= this.endOf(units)
  }

  // return this milliseconds
  valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime()
  }

  clone() {
    const newInst = new EsDay(this.$d)
    newInst.$conf = { ...this.$conf }
    return newInst
  }

  startOf(units: UnitType) {
    return startOfImpl(this, units)
  }

  endOf(units: UnitType) {
    return startOfImpl(this, units, true)
  }

  get(units: Exclude<UnitType, UnitWeek>) {
    return getUnitInDate(this.$d, units)
  }
}

prettyUnits.forEach((key) => {
  // @ts-expect-error it's compatible with the overload
  EsDay.prototype[key] = function (...args: number[]): EsDay | number {
    if (args?.length) {
      // @ts-expect-error it's compatible with the overload
      return this.set(key, ...args as [number])
    }
    else {
      return this.get(key)
    }
  }
})
