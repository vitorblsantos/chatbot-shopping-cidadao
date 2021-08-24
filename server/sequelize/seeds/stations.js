const { v4 } = require('uuid')

const { Stations } = require('../../data/')
const { DateFNS } = require('../../server/helpers/')

const draftStations = Stations.map((station, index) => {
  station._id = v4()
  station.createdAt = DateFNS.current
  station.updatedAt = DateFNS.current
  return station
})

module.exports = {
  down: queryInterface => queryInterface.bulkDelete('stations', null, {}),
  up: async queryInterface => await queryInterface.bulkInsert('stations', [...draftStations], {})
}
