// src/kuzzle/kuzzle.js
import { Kuzzle, WebSocket } from 'kuzzle-sdk'

const kuzzle = new Kuzzle(new WebSocket('localhost:7512'))

kuzzle
  .connect()
  .then(() => {
    console.log('Successfully connected to Kuzzle Server')
  })
  .catch((error) => {
    console.error('Error connecting to Kuzzle Server:', error)
  })

export default kuzzle
