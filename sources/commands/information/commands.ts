import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "commands",
        description: "Show all commands.",
    },

    run: (client, interaction) => {
        client.embed.setDescription(`${client.categories.map((category) => `**${client.toCase(category.name)}** (${category.commands.length})
${category.commands.join(`, `)}`).join(`\n\n`)}`);

        interaction.reply({ embeds: [client.embed] });
    },
});