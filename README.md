# 🎧 Discord Presence + Spotify Bot

A lightweight TypeScript Discord bot that listens for **real-time user presence** and **Spotify activity** — and stores everything in **Upstash Redis**.

Use it to build dashboards, display who's listening to what, or just track your own online status and music taste in your apps.

---

## 🚀 Features

✅ Tracks user presence (online, idle, dnd, offline)  
🎵 Detects and logs Spotify songs being played  
📦 Saves data to Upstash Redis in real-time  
⚡ Runs on ts-node — no build step required  
🧠 Perfect for dashboards, activity feeds, and status syncing

---

## 🧰 Tech Stack

- **discord.js** — connects to the Discord Gateway
- **@upstash/redis** — fast, serverless Redis storage
- **dotenv** — manages secrets and tokens
- **ts-node** — runs TypeScript directly without compiling

---

## 📁 Project Structure

```
discord-presence-bot/
├── discordBot.ts          # Main bot code
├── .env                   # Your secrets (not committed)
├── tsconfig.bot.json      # TS config for bot
├── package.json           # Dependencies + start script
├── .gitignore             # Ignores node_modules, env, dist
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/discord-presence-bot.git
cd discord-presence-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

```env
BOT_TOKEN=your_discord_bot_token
UPSTASH_REDIS_REST_URL=https://your-upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 4. Enable Gateway Intents (IMPORTANT)

In [Discord Developer Portal](https://discord.com/developers/applications):

- Go to your bot → **Bot** tab
- Enable:
  - ✅ Presence Intent
  - ✅ Server Members Intent

---

## 🤖 Invite Your Bot to a Server

Go to **OAuth2 > URL Generator** in the Developer Portal:

- **Scopes**: `bot`
- **Bot Permissions**:
  - View Channels
  - Read Message History
  - Presence

Copy the generated URL and invite your bot.

---

## ▶️ Run the Bot

```bash
npm run dev
```

You'll see:

```
✅ Logged in as YourBot#1234
[BOT ALIVE] 7:12:10 PM
```

Now your Redis DB will start storing updates in real-time.

---

## 📊 Redis Data Format

All user presence is stored under the Redis key: `discord:presence`

```json
{
  "123456789012345678": {
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

## 💡 What You Can Build With This

- Personal dashboard showing your live status + music
- Real-time "Now Playing" widget
- Multi-user activity board
- Presence analytics over time

---

## 🚀 Deploy Options

| Platform   | Status |
|------------|--------|
| Railway    | ✅ Easy, 1-click deploy |
| Render.com | ✅ Works with `npm run dev` |
| VPS (pm2)  | ✅ Run with `pm2 start npm --name bot -- run dev` |
| Replit     | ✅ Paste + run with .env secrets |

---

## 📜 License

MIT — use, modify, and build on it freely.

---

## ✨ Credits

Made with ❤️ by Rohit(https://github.com/rohicod3)
