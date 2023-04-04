import discord from "discord.js";
import Command from "../../classes/Command";
import pkg from "../../../package.json";

export default new Command({
    data: {
        name: "about",
        description: "About me.",
    },

    run: (client, interaction) => {
        client.embed.setDescription(`**Developer:** ${(client.application.owner as discord.User).tag}
**Language:** TypeScript
**Library:** Discord.JS v${pkg.dependencies["discord.js"]}
**Commands:** ${client.commands.size}
**Categories:** ${client.categories.size}`);

        interaction.reply({ embeds: [client.embed] });
    },
});