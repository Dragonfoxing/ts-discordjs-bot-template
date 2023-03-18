import { CommandInteraction, ApplicationCommandType, Client, MessageFlags } from "discord.js";
import { Command } from "../interfaces/Command";

// This is an example of a command that only has a slash command variant.

export const Hello: Command = {
    name: "hello",
    description: "Returns a greeting",
    type: ApplicationCommandType.ChatInput,
    // We use ephemeral in our deferReply as an example of an ephemeral response.
    // Note that interaction.followUp cannot change the type of response, so it will also be ephemeral.
    defer: async (interaction: CommandInteraction) => { await interaction.deferReply({ephemeral: true}); },
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "Hello there!";

        await interaction.followUp({
            content: content
        });
    }
};