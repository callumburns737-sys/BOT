const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.use(express.json());

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

// Login bot
client.login(process.env.BOT_TOKEN);

// Roblox → POST request endpoint
app.post("/panel", async (req, res) => {
  const { message } = req.body;

  try {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    await channel.send(message);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Failed to send" });
  }
});

app.listen(3000, () => console.log("Server running"));
