const { Stations } = require('../../data/')
const { DateFNS } = require('../../helpers/')

const draftStations = Stations.map((station, index) => {
  station.createdAt = new Date(DateFNS.formated)
  station.updatedAt = new Date(DateFNS.formated)
  return station
})

module.exports = {
  down: queryInterface => queryInterface.bulkDelete('stations', null, {}),
  up: queryInterface => queryInterface.bulkInsert('stations', [...draftStations], {})
}
