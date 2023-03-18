import { CommandInteraction, ChatInputApplicationCommandData, Client, Message } from "discord.js";

// This is an interface that lets us ensure we have specific functions
// or pieces of data when we pass stuff in to SlashCommands.

// This is a modification of tutorial code.  Previously there was only `run`.
// For our needs/wants, we also have:
// defer: allows us to handle deferring on a command-by-command basis (ephemeral or not)
// alias: allows us to use chat command aliases once implemented.  ? means optional.
// runChat: alternate run command, used for chat messages.  Optional - some commands
// may need the fancy interface that Discord provides through slash commands or interactions.

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => void;
    defer: (interaction: CommandInteraction) => void;
    alias?: String[],
    runChat?: (client: Client, message: Message, args: String) => void;
};