import discord from "discord.js";
import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "rps",
        description: "Play rock, paper and scissors with me.",
        options: [
            {
                name: "options",
                description: "Choose any option.",
                type: discord.ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "rock",
                        value: "rock",
                    },
                    {
                        name: "paper",
                        value: "paper",
                    },
                    {
                        name: "scissors",
                        value: "scissors",
                    },
                ],
                required: true,
            },
        ],
    },

    run: (client, interaction) => {
        let option = interaction.options.getString(`options`);
        let random = [`rock`, `paper`, `scissors`];
        let choice = random[~~(Math.random() * random.length)];
        let answer: string;

        switch (option) {
            case `rock`: {
                switch (choice) {
                    case `rock`: answer = `Tie!`; break;
                    case `paper`: answer = `I won!`; break;
                    case `scissors`: answer = `You won!`; break;
                }
            } break;
            case `paper`: {
                switch (choice) {
                    case `rock`: answer = `You won!`; break;
                    case `paper`: answer = `Tie!`; break;
                    case `scissors`: answer = `I won!`; break;
                }
            } break;
            case `scissors`: {
                switch (choice) {
                    case `rock`: answer = `I won!`; break;
                    case `paper`: answer = `You won!`; break;
                    case `scissors`: answer = `Tie!`; break;
                }
            } break;
        }

        client.embed.setDescription(`**You:** ${option}\n**Me:** ${choice}\n\n**${answer}**`);

        interaction.reply({ embeds: [client.embed] });
    },
});