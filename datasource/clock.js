require('dotenv').config()
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

const getTimeEmoji = (now) => {
  if (now.hour() === 0 || now.hour() === 12) return '🕛';
  else if (now.hour() === 1 || now.hour() === 13) return '🕐';
  else if (now.hour() === 2 || now.hour() === 14) return '🕑';
  else if (now.hour() === 3 || now.hour() === 15) return '🕒';
  else if (now.hour() === 4 || now.hour() === 16) return '🕓';
  else if (now.hour() === 5 || now.hour() === 17) return '🕔';
  else if (now.hour() === 6 || now.hour() === 18) return '🕕';
  else if (now.hour() === 7 || now.hour() === 19) return '🕖';
  else if (now.hour() === 8 || now.hour() === 20) return '🕗';
  else if (now.hour() === 9 || now.hour() === 21) return '🕘';
  else if (now.hour() === 10 || now.hour() === 22) return '🕙';
  else if (now.hour() === 11 || now.hour() === 23) return '🕚';
  else return ''
}

const getTime = (time, zone) => `${getTimeEmoji(time)} ${time.format('HH:mm')} ${zone}`

function getBothTimes() {
  const now = dayjs()
  const time1 = dayjs(now).tz(process.env.TZ_ONE)
  const time2 = dayjs(now).tz(process.env.TZ_TWO)
  return `${getTime(time1, process.env.TZ_ONE_NAME)}•${time2.format('HH:mm')} ${process.env.TZ_TWO_NAME}`
}

module.exports = {
  getBothTimes
}