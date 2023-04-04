import discord from "discord.js";
import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "percentage",
        description: "Calculate how much something is someone.",
        options: [
            {
                name: "target",
                description: "Type a target.",
                type: discord.ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "input",
                description: "Input to calculate.",
                type: discord.ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },

    run: (client, interaction) => {
        let target = interaction.options.getString(`target`);
        let input = interaction.options.getString(`input`);
        let possibility = ~~(client.randomInt(0, 100));

        client.embed.setDescription(`**${target} is ${possibility == 50 ? `200.0` : possibility == 100 ? `500.0` : client.randomInt(0, 100).toFixed(1)}% ${input}.**`);

        interaction.reply({ embeds: [client.embed] });
    },
});