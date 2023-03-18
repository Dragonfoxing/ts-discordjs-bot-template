import { Client } from 'discord.js';
import { Commands } from "../modules/Commands";

/**
 * This is same as tutorial code I found.
 * TL;DR on "ready" we make sure there's a user and app allocated to us;
 * we set our array of commands from src/Commands;
 * and we poke our console to make sure we know the bot is live.
 */
export default (client: Client): void => {
    client.on("ready", async () => {
        if(!client.user || !client.application){
            return;
        };

        await client.application.commands.set(Commands);

        console.log(`${client.user.username} is online`);
    });
}; 