import type { DateType, EsDayFactory } from '~/types'
import type { SimpleObject, SimpleType } from '~/types/util-types'
import { isObject } from '~/common'
import { EsDay } from './EsDay'

// @ts-ignore plugin declare may cause ts-type-checke error, but it's ok
const esday: EsDayFactory = (d?: DateType, ...others: (SimpleType | { [key: string]: SimpleType })[]) => {
  if (d instanceof EsDay) {
    return d.clone()
  }
  else {
    const conf: SimpleObject = {}
    others.forEach((o, i) => {
      if (isObject(o)) {
        Object.assign(conf, o)
      }
      else {
        conf[`args_${i + 1}`] = o
      }
    })
    return new EsDay(d, conf)
  }
}

export { esday }
