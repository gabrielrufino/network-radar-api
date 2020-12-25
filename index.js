const cors = require('cors')
const express = require('express')

const database = require('./database')

const app = express()

app.use(express.json())
app.use(cors()) 

app.get('/', (_request, response) => {
  return response.json({
    alive: true
  })
})

app.post('/speeds', (request, response) => {
  const {
    download,
    upload,
    connected_devices,
    started_at,
    finished_at
  } = request.body

  const speed = {
    download,
    upload,
    connected_devices,
    started_at,
    finished_at
  }

  database
    .get('speeds')
    .push(speed)
    .write()

  return response.status(201).json(speed)
})

app.get('/speeds', (request, response) => {
  const { size = 20 } = request.query

  const speeds = database
    .get('speeds')
    .sort((a, b) => new Date(b.started_at) - new Date(a.started_at))
    .take(size)
    .reverse()
    .value()

  return response.json(speeds)
})

app.listen(3000, () => console.log('Listening on 3000'))
