import 'dotenv/config';
import { getCommands } from './models/commands.js';
import fetch from 'node-fetch';

const url = `https://discord.com/api/v10/applications/${process.env.APP_ID}/commands`;
const commands = JSON.stringify(getCommands());
try {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.BOT_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (https://github.com/Echono/WongUtil, 0.0.1)',
        },
        method: 'PUT',
        body: commands
    });
    if(!response.ok) {
        const data = await response.json();
        console.log(response.status);
        throw new Error(JSON.stringify(data));
    }
    const result = await response.json();
    const status = response.status;
    debugger
} catch (error) {
    console.error(error);
}