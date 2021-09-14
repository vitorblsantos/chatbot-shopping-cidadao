import { Op } from 'sequelize'
import { DateFNS } from '../helpers'
import { Schedule, Station, User } from '../models/'

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
  let user = {
    id: '',
    email: ''
  }
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(id)) {
    const queryUser = await User.findOne({
      where: {
        email: {
          [Op.eq]: id
        }
      }
    })
    user = queryUser?.dataValues
  }

  const schedules = await Schedule.findAll({
    order: [
      ['date', 'ASC']
    ],
    where: {
      date: {
        [Op.gt]: new Date()
      },
      status: {
        [Op.in]: ['active', 'waiting']
      },
      user: {
        [Op.eq]: user.id
      }
    }
  })

  await Promise.all(schedules.map(async el => {
    const querySession = await Station.findOne({
      where: {
        id: {
          [Op.eq]: el.station
        }
      }
    })
    el.station = querySession?.dataValues.description
    el.user = user.email
    return el
  }))

  res.status(200).send(schedules)
}

export default {
  create,
  get,
  getAvailableDates,
  getByIdentifier
}
