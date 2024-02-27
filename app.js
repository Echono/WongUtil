import 'dotenv/config';
import express from 'express';
import {
    InteractionType,
    InteractionResponseType
} from 'discord-interactions';
import { VerifyDiscordRequest } from './util.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}));

app.get('/interactions', async (req, res) => {
    const { type, id, data } = req.body;
    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})