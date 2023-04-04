import discord from "discord.js";
import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "8ball",
        description: "Ask something to the 8ball.",
        options: [
            {
                name: "question",
                description: "Ask a question.",
                type: discord.ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },

    run: (client, interaction) => {
        let question = interaction.options.getString(`question`);
        let random = [
            `Yes.`, `No.`,
            `✨ Y E S ✨`, `✨ N O ✨`,
            `Always.`, `Never.`,
            `✨ A L W A Y S ✨`, `✨ N E V E R ✨`,
            `I don't know.`, `Possibly.`,
            `Maybe.`, `Better change the question.`,
            `WTF.`, `???`,
            `This is an 8ball, not a reality changer.`, `Nice question ngl.`,
            `I don't understand.`, `Well as you can see, the grass is green too. Wait- you've never seen it!`,
            `Another question like this and I'll blacklist you.`, `SHUT UP!`,
        ];
        let answer = random[~~(Math.random() * random.length)];

        client.embed.setDescription(`**Question:** ${question}\n**Answer:** ${answer}`);

        interaction.reply({ embeds: [client.embed] });
    },
});