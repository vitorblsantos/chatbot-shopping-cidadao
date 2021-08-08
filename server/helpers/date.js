const { parseISO } = require('date-fns')
const { ptBR } = require('date-fns/locale')
const { format, utcToZonedTime } = require('date-fns-tz')

const compareAsc = require('date-fns/compareAsc')
const getMinutes = require('date-fns/getMinutes')
const setMinutes = require('date-fns/setMinutes')

const now = new Date()

const compare = (date) => compareAsc(parseISO(date), now)

const current = utcToZonedTime(now, 'America/Sao_Paulo')

const formated = format(current, 'dd-MM-yyyy HH:mm:ss', {
  timeZone: 'America/Sao_Paulo',
  locale: ptBR
})

const expiration = setMinutes(current, (getMinutes(current) + 5))

module.exports = {
  compare,
  current,
  expiration,
  formated
}
