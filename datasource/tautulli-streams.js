require('dotenv').config()
// http fetching
var tiny = require('tiny-json-http')
const host = process.env.TAUTULLI_HOST
const port = process.env.TAUTULLI_PORT
const apikey = process.env.TAUTULLI_APIKEY
const path = process.env.TAUTULLI_PATH
const url = `http://${host}:${port}${path}/api/v2?apikey=${apikey}&cmd=get_activity`

async function getStreams() {
  let result = await tiny.get({url})
    .catch((err) => console.log('error', err))
  return result.body.response.data.stream_count
}

module.exports = {
  getStreams
}