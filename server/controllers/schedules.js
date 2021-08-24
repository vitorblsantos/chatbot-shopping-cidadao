import { Op } from 'sequelize'
import { DateFNS } from '../helpers'
import { Schedules } from '../models/'

const get = async (_, res) => {
  const data = await Schedules.findAll({})
  return res.status(200).send(data)
}

const getAvailableDates = async (_, res) => {
  const availableDates = []
  let counter = 1
  let today = new Date((DateFNS.current).setHours(11, 0, 0))

  while (availableDates.length <= 5) {
    const nextDay = new Date(today.getTime() + (86400000 * counter))
    const data = await Schedules.findAll({
      where: {
        date: {
          [Op.eq]: nextDay
        }
      }
    })
    if (!data.length && nextDay) availableDates.push(new Date(nextDay))
    counter += 1
  }
  today = new Date(today.setDate(today.getDate() + 1))
  return res.status(200).send(availableDates)
}

export default {
  get,
  getAvailableDates
}
