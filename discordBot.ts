require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { Redis } = require('@upstash/redis');
const express = require('express')
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  for (const [_, guild] of client.guilds.cache) {
    try {
      await guild.members.fetch();
    } catch (error) {
      console.error(`Error fetching members:`, error);
    }
  }
});

client.on('presenceUpdate', async (oldPresence:any, newPresence:any) => {
  const userId = newPresence.userId;
  const username = newPresence.user?.username || 'Unknown';
  const status = newPresence.status || 'offline';
  console.log("user:", newPresence?.user?.username);
  console.log("status:", newPresence?.status);

  console.log(status);
  const spotifyActivity = newPresence.activities.find(
    (activity:any) => activity.name === 'Spotify' && activity.type === 2
  );

  const spotifyData = spotifyActivity
    ? {
        song: spotifyActivity.details,
        artist: spotifyActivity.state,
        album: spotifyActivity.assets?.largeText || '',
        albumArtUrl: spotifyActivity.assets?.largeImage
          ? `https://i.scdn.co/image/${spotifyActivity.assets.largeImage.replace('spotify:', '')}`
          : null,
        trackId: spotifyActivity.syncId || '',
      }
    : null;

  await redis.hset('discord:presence', {
    [userId]: JSON.stringify({ username, status, spotify: spotifyData }),
  });

  console.log(`${username} is now ${status}`);
  if (spotifyData) {
    // console.log(`Listening to ${spotifyData.song} by ${spotifyData.artist}`);
    console.log(spotifyActivity)
  }
});

setInterval(() => {
  console.log(`[BOT ALIVE] ${new Date().toLocaleTimeString()}`);
}, 10000);

client.login(process.env.BOT_TOKEN).catch((err:any) => {
  console.error("Bot failed to login:", err.message);
});

const app = express();

const PORT = 3000;

app.get('/', (req:any,res:any) => res.send('Bot is alive'));


app.listen(PORT, ()=> console.log(`Health check server running on port: ${PORT}`))