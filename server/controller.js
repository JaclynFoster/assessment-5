require('dotenv').config()
const Sequelize = require('sequelize')
const { CONNECTION_STRING } = process.env
const {
  QUERY_SEED,
  QUERY_GET_COUNTRIES,
  QUERY_CREATE_CITY,
  QUERY_GET_CITIES,
  QUERY_DELETE_CITY
} = require('./QUERIES')
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

const getCountries = (req, res) => {
  sequelize
    .query(QUERY_GET_COUNTRIES)
    .then(dbRes => {
      res.status(200).send(dbRes[0])
    })
    .catch(error => {
      console.log('Error', error)
    })
}

const getCities = (req, res) => {
  const { countryId } = req.params
  sequelize
    .query(QUERY_GET_CITIES, {
      replacements: [countryId]
    })
    .then(dbRes => {
      res.status(200).send(dbRes[0])
    })
    .catch(error => {
      console.log('Error', error)
    })
}

const createCity = (req, res) => {
  const { name, rating, countryId } = req.body
  sequelize
    .query(QUERY_CREATE_CITY, {
      replacements: [name, rating, countryId]
    })
    .then(dbRes => {
      res.status(200).send(dbRes[0])
    })
    .catch(error => {
      console.log('Error', error)
    })
}

const deleteCity = (req, res) => {
  const { id } = req.params
  sequelize
    .query(QUERY_DELETE_CITY, {
      replacements: [id]
    })
    .then(dbRes => {
      res.status(200).send(dbRes[0])
    })
    .catch(error => {
      console.log('Error', error)
    })
}

const seed = (req, res) => {
  sequelize
    .query(QUERY_SEED)
    .then(() => {
      console.log('DB seeded!')
      res.sendStatus(200)
    })
    .catch(err => console.log('error seeding DB', err))
}

module.exports = { seed, getCountries, createCity, getCities, deleteCity }
