import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "ping",
        description: "Show ping.",
    },

    run: (client, interaction) => {
        client.embed.setDescription(`**Websocket:** ${client.ws.ping} ms.
**Response:** ${Date.now() - interaction.createdTimestamp} ms.`);

        interaction.reply({ embeds: [client.embed] });
    },
});