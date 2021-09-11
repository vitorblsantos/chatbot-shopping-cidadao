import { Op } from 'sequelize'
import { DateFNS } from '../helpers'
import { Schedule } from '../models/'

const create = async (req, res) => {
  const { date, session, station, user } = req.body
  try {
    res.status(201).send(await Schedule.create({
      date,
      session: session,
      station: station,
      user: user
    }))
  } catch (err) {
    res.status(500).send(err)
  }
}

const get = async (_, res) => {
  const data = await Schedule.findAll({})
  return res.status(200).send(data)
}

const getAvailableDates = async (_, res) => {
  const availableDates = []
  let counter = 1
  let today = new Date((DateFNS.current).setHours(11, 0, 0))

  while (availableDates.length <= 5) {
    const nextDay = new Date(today.getTime() + (86400000 * counter))
    const data = await Schedule.findAll({
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

const getByIdentifier = async (req, res) => {
  const { id } = req.params

  res.status(200).send(req.params)

  // const availableDates = []
  // let counter = 1
  // let today = new Date((DateFNS.current).setHours(11, 0, 0))

  // while (availableDates.length <= 5) {
  //   const nextDay = new Date(today.getTime() + (86400000 * counter))
  //   const data = await Schedule.findAll({
  //     where: {
  //       date: {
  //         [Op.eq]: nextDay
  //       }
  //     }
  //   })
  //   if (!data.length && nextDay) availableDates.push(new Date(nextDay))
  //   counter += 1
  // }
  // today = new Date(today.setDate(today.getDate() + 1))
  // return res.status(200).send(availableDates)
}

export default {
  create,
  get,
  getAvailableDates,
  getByIdentifier
}
