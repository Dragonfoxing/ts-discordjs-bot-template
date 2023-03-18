import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../modules/Commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()){
            await handleSlashCommand(client, interaction);
        };
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction) => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand){
        interaction.followUp({ content: "An error has occured" });
        return;
    };

    await slashCommand.defer(interaction);

    slashCommand.run(client, interaction);
};