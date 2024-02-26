import { getCommands } from "./models/commands";
import fetch from 'node-fetch';

const url = `https://discord.com/api/v10/applications/${process.env.APP_ID}/commands`;
const commands = getCommands();
const response = await fetch(url, {
    headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    }
})