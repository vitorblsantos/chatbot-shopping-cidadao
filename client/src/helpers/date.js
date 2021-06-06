'use strict'

import { ptBR } from 'date-fns/locale'
import { format, utcToZonedTime } from 'date-fns-tz'

import compareAsc from 'date-fns/compareAsc'
import getMinutes from 'date-fns/getMinutes'
import setMinutes from 'date-fns/setMinutes'

const actualDate = new Date()

const compare = (date) => compareAsc(date, current)

const current = utcToZonedTime(actualDate, 'America/Sao_Paulo')

const formated = format(current, 'dd-MM-yyyy HH:mm:ss', {
  timeZone: 'America/Sao_Paulo',
  locale: ptBR
})

const expiration = setMinutes(current, getMinutes(current) + 5)

export default {
  compare,
  current,
  expiration,
  formated
}
