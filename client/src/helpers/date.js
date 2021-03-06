import { parseISO } from 'date-fns'
import { format, utcToZonedTime } from 'date-fns-tz'

import compareAsc from 'date-fns/compareAsc'
import getMinutes from 'date-fns/getMinutes'
import setMinutes from 'date-fns/setMinutes'

const current = new Date()

const compare = (date) => compareAsc(parseISO(date), current)

const utc = utcToZonedTime(current, 'America/Sao_Paulo')

const formated = format(utc, 'dd-MM-yyyy HH:mm:ss')

const expiration = setMinutes(utc, (getMinutes(utc) + 5))

export default {
  compare,
  current,
  expiration,
  formated
}
