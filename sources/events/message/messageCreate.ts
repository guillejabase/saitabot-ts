import discord from "discord.js";
import Event from "../../classes/Event";

export default new Event({
    name: "messageCreate",

    run: (client, message) => {
        if (!message.author.bot) {
            client.embed = new discord.EmbedBuilder({ color: 2829617 });

            if (message.content.match(new RegExp(`^<@!?${client.user.id}>$`))) {
                client.embed.setDescription(`**Ayo, I'm Saita. Type** /commands **to show all my commands.**`);

                message.reply({ embeds: [client.embed] });
            }
        }
    }
});