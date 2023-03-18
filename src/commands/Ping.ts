import { CommandInteraction, ApplicationCommandType, Client, Message } from "discord.js";
import { Command } from "../interfaces/Command";

// This is an example of a Command that also has a chat variant _and_ an alias.  Fun!

export const Ping: Command = {
    name: "ping",
    description: "Returns the websocket latency (ping)",
    type: ApplicationCommandType.ChatInput,
    defer: async (interaction: CommandInteraction) => { await interaction.deferReply(); },
    run: async (client: Client, interaction: CommandInteraction) => {

        // We use the method linked below to calculate a simple ping value:
        // https://discordjs.guide/popular-topics/faq.html#how-do-i-check-the-bot-s-ping
        // If we ever shard this, there's a sharding method noted there too.

        const content = `My ping is ${client.ws.ping}ms :3`;

        await interaction.followUp({
            ephemeral: true,
            content
        });
    },
    runChat: async (client: Client, message: Message, args: String) => {
        const content = `My ping is ${client.ws.ping}ms :3`;

        await message.reply(content);
    },
    alias: ["pong"]
};