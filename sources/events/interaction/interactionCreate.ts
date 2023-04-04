import discord from "discord.js";
import Event from "../../classes/Event";

export default new Event({
    name: "interactionCreate",

    run: (client, interaction) => {
        if (interaction.isChatInputCommand()) {
            client.embed = new discord.EmbedBuilder({ color: 2829617 });

            let command = client.commands.get(interaction.commandName);

            if (command) {
                command.run(client, interaction);
            }
        }
    }
});