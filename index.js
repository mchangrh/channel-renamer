// dotenv
require('dotenv').config()
const { getStreams } = require('./datasource/tautulli-streams.js');
const { getBothTimes } = require('./datasource/clock.js');

// discord.js
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

// cron
const cron = require('node-cron');

// logging
var lastUpdate = "unknown"

function renameTautulli(client, channel, data) {
  client.channels.cache.get(channel).setName()
    .then(channel => channel.setName(`Currently Watching: ${data}`))
}

function renameClock(client, channel, data) {
  client.channels.cache.get(channel).setName()
    .then(channel => channel.setName(data))
}

cron.schedule('*/10 * * * *', () => {
  client.emit('customUpdateTrigger')
}).start()

client.on('ready', () => {
  console.log("Ready")
  setInterval(function(){client.emit('customUpdateTrigger')},600000)
});
client.on('customUpdateTrigger', () => {
  getStreams().then(data => renameTautulli(client, process.env.TAUTULLI_CHANNELID, data))
  getBothTimes().then(data => renameClock(client, process.env.CLOCK_CHANNELID, data))
  lastUpdate = new Date().toISOString();
  console.log(`Update at ${lastUpdate}`)
})
client.on('message', message => {
  const prefix = process.env.PREFIX 
  if (!message.author.bot && message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase()
    if (command === 'update') client.emit('customUpdateTrigger')
    else if (command === 'lastupdate') message.channel.send(`Last Update; ${lastUpdate}`)
    else message.channel.send('update | lastupdate')
}})
