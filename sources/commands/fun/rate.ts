import discord from "discord.js";
import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "rate",
        description: "Let me rate something from 1 to 5.",
        options: [
            {
                name: "input",
                description: "Input to rate.",
                type: discord.ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },

    run: (client, interaction) => {
        let input = interaction.options.getString(`input`);
        let number = ~~(client.randomInt(1, 5));
        let possibility = ~~(client.randomInt(0, 2));

        client.embed.setDescription(`**I rate ${input} ${number}${number != 5 && possibility >= 1 ? `.5` : ``} star${number != 1 || possibility >= 1 ? `s` : ``}.**`);

        interaction.reply({ embeds: [client.embed] });
    },
});