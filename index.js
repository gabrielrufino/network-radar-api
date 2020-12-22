const express = require('express')

const app = express()

app.get('/', (_request, response) => {
  return response.json({
    alive: true
  })
})

app.listen(3000, () => console.log('Listening on 3000'))
