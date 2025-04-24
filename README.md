# 🎵 Discord Presence + Spotify Bot

A lightweight TypeScript Discord bot that listens for **real-time user presence** and **Spotify activity**, and stores everything in **Upstash Redis**. It’s also built with an **Express server** to expose a health check route, and stays alive 24/7 on **Render** using a **cron ping system**.

This bot is a fully-deployed backend system that not only shows your current status and now-playing track on Discord, but also integrates with your portfolio or dashboard through Redis-backed APIs. It handles real-time events, edge cases like platform sleep, and demonstrates strong backend engineering practices.

---

## 🔧 What the Bot Does

- Connects to Discord using `discord.js` and listens to `presenceUpdate` events.
- Parses user presence and Spotify activity (track, artist, album, album art, etc).
- Stores user activity in Upstash Redis using hash-based structure for real-time fetch.
- Prevents Render's free-tier timeout by hosting an Express server with a `GET /` health route.
- Keeps itself alive using external ping services like `cron-job.org` or `UptimeRobot`.

---

## 💥 Problem We Faced

### ❌ Issue:
Render's free tier **sleeps inactive web services** after ~15 minutes of no incoming traffic.

### ✅ Our Solution:
- We created an Express server alongside the Discord bot.
- It exposes a `GET /` route with a simple `res.send()` message.
- We set up a ping job from `cron-job.org` to hit the route every 5 minutes.
- This activity keeps the bot online and continuously synced with Discord.

---

## 🚀 Features

- ✅ Tracks Discord user presence (online, idle, dnd, offline)
- 🎵 Detects and logs Spotify songs being played in real-time
- 📦 Stores activity in Upstash Redis (serverless & fast)
- 🌐 Hosts a lightweight health route using Express
- 🔁 Avoids Render auto-sleep via scheduled pings

---

## 🛠 Tech Stack

- `discord.js` — Discord API wrapper
- `@upstash/redis` — serverless Redis
- `express` — for health check endpoint
- `dotenv` — env variable management
- `ts-node` — run TypeScript directly in Node

---

## 🗂 Project Structure

```
discord-presence-bot/
├── discordBot.ts          # Main bot logic + Express health server
├── .env                   # Environment variables (not committed)
├── tsconfig.bot.json      # TypeScript config
├── package.json           # Dependencies + scripts
├── .gitignore             # Ignores node_modules, env, dist
```

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/YOUR_USERNAME/discord-presence-bot.git
cd discord-presence-bot
npm install
```

Create your `.env` file:

```env
BOT_TOKEN=your_discord_bot_token
UPSTASH_REDIS_REST_URL=https://your-upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Enable required Gateway Intents in Discord Developer Portal:
- Presence Intent ✅
- Server Members Intent ✅

Run the bot:

```bash
npm run dev
```

Console Output:
```
✅ Logged in as YourBot#1234
🌐 Health check server running on port 3000
[BOT ALIVE] 7:12:10 PM
```

---

## 🌐 Health Check Express Server

```ts
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('✅ Bot is alive');
});

app.listen(3000, () => console.log("Health check server running"));
```

Ping this route every few minutes to prevent Render from sleeping your bot.

---

## 📊 Redis Data Structure

Data is stored in Redis under the key `discord:presence`:

```json
{
  "418810606880161802": {
    "username": "rohit",
    "status": "online",
    "spotify": {
      "song": "Lose Yourself",
      "artist": "Eminem",
      "album": "8 Mile",
      "albumArtUrl": "https://...",
      "trackId": "5Z01UMMf7V1o0MzF86s6WJ"
    }
  }
}
```

---

## 📡 Keep It Alive (Recommended Setup)

### Cron Ping with `cron-job.org`:
- Create a new HTTP job
- URL: `https://your-bot.onrender.com/`
- Interval: Every 5 minutes
- Method: GET

This keeps your bot alive on free-tier hosts like Render.

---

## 💡 Real Use Case Ideas

- Show live Discord presence & music on your portfolio site
- Real-time dashboards for team activity
- Analytics tools for presence/time tracking

---

## 📜 License

MIT — use, modify, and build on it freely.

---

## ✨ Credits

Built with ❤️ by [Rohit](https://github.com/rohitcod3)

