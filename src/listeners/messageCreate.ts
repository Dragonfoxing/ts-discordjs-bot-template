import { Client, Message} from "discord.js";
import { Commands } from "../modules/Commands";

const prefix = String(process.env.PREFIX);

/**
 * I used to handle chat commands slightly differently,
 * but that was before slash commands were something I cared about.
 * 
 * This version of messageCreate tries to elegantly handle multiple use cases:
 * 1. User is using this a la classic chat commands.
 * 2. User is using this via mention.
 * 3. User is using this via Direct Messages.
 * 4. User is attempting to use a chat alias.
 * 
 * But also:
 * 5. User is trying to use a command that has no chat command variant.
 * 6. User is a Bot and trying to use this bot's commands.
 * 
 * I chose to avoid nested logic as much as possible here,
 * but you could restructure this however you want.
 * The general idea is that this **works** and _solves the use cases noted above_.
 */

export default (client: Client): void => {
    client.on("messageCreate", async (message: Message) => {

        // We use this to make sure a bot isn't using our commands.
        // Interactions between bots can either be buggy or take up a chatroom.
        // This is even more important now that chatGPT integrations are available.

        if(message.author.bot) return;

        // Checking to see if we want to require the prefix or not.
        // Also some setup for mentions.

        let prefixRequired = false;

        // Typescript was bonking me for using an optional field,
        // so I had to include an "or empty string" to satisfy it.

        let own_id = client.user?.id || "";
        let slug = `<@${own_id}>`;

        let is_mentioned = message.mentions.has(own_id);

        let content = message.content;

        // If we're mentioned and the message doesn't start with a ping, return.
        // We don't want to intercept people instructing how to use the bot.

        if(is_mentioned && !content.startsWith(slug)) return;
        
        // Strip the slug otherwise.

        else if(is_mentioned) content = content.replace(slug + " ", "");

        // If we're not in DMs and we're not mentioned, we require the prefix.

        if (!message.channel.isDMBased() && !is_mentioned) prefixRequired = true;

        // Return if prefix is required and we don't see our prefix.

        if(prefixRequired && !message.content.startsWith(prefix)) return;

        // Split our command from our args.

        let spl = content.split(" ", 1);

        // Check what our command is.
        // If there's a prefix, replace it.
        // If not just trim.

        let cmd = "";

        if(spl[0].startsWith(prefix)){
            cmd = spl[0].trim().replace(prefix, "");
        } else cmd = spl[0].trim();

        // If we have no command, return.

        if(cmd == "") return;

        // With message-based commands, we don't know the format we're getting ahead of time
        // or if a command needs to parse things a specific way.

        // We simply collect the string split and go.

        let args = spl[1];

        // I used this to debug and check command and arguments.
        //console.log(cmd, args);

        // Pass our information off to the handler below.
        await handleMessageCommand(client, message, cmd, args);
    });
};

const handleMessageCommand = async (client: Client, message: Message, command: String, args: String) => {
    // In order to avoid overpopulating the slash command list, we put chat command aliases into command.alias
    // and we can use that here to see if the aliases include our command name.
    // Alias is optional, so we check if it exists first.

    // src/commands/ping.ts includes an example of use where a chat alias is "pong" (because why not).

    // Otherwise, this part is the same as interactionCreate's handleSlashCommand.

    const slashCommand = Commands.find(c => c.name === command || c.alias && c.alias.includes(command));

    // If we find nothing, run away.

    if (!slashCommand){
        message.reply({ content: "An error has occured" });
        return;
    };

    // We use our own `runChat` function on the Command interface.
    // Pass in the client (generally useful), message (required? to reply to user), and the arguments as a string.
    // The commands will be expected to parse args out.

    if(slashCommand.runChat) await slashCommand.runChat(client, message, args);

    // runChat is optional, so if it doesn't exist we direct the user to use a slash command instead.
    else message.reply("This command only exists as a slash command.  Please use `/"+command+"`");
};
