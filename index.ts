import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { Redis } from '@upstash/redis';


const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user!.tag}`);

  client.guilds.cache.forEach(async (guild) => {
    try {
      await guild.members.fetch();
    } catch (error) {
      console.error(`Error fetching members:`, error);
    }
  });
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    const userId = newPresence.userId;
    const username = newPresence.user?.username || 'Unknown';
    const status = newPresence.status || 'offline';

  
  console.log(status)
    const spotifyActivity = newPresence.activities.find(
      (activity) => activity.name === 'Spotify' && activity.type === 2 
    );
  
    const spotifyData = spotifyActivity
      ? {
          song: spotifyActivity.details,        // Song title
          artist: spotifyActivity.state,        // Artist
          album: spotifyActivity.assets?.largeText || '', // Album name
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
      console.log(`Listening to ${spotifyData.song} by ${spotifyData.artist}`);
    }
  });
  

client.login(process.env.BOT_TOKEN);
