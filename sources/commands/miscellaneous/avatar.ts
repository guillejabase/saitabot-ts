import discord from "discord.js";
import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "avatar",
        description: "Show your avatar or someone else's.",
        options: [
            {
                name: "user",
                description: "Choose a user.",
                type: discord.ApplicationCommandOptionType.User,
            },
            {
                name: "size",
                description: "Choose the size. Default: 512 px.",
                type: discord.ApplicationCommandOptionType.Integer,
                choices: [
                    {
                        name: "16",
                        value: 16,
                    },
                    {
                        name: "32",
                        value: 32,
                    },
                    {
                        name: "64",
                        value: 64,
                    },
                    {
                        name: "128",
                        value: 128,
                    },
                    {
                        name: "256",
                        value: 256,
                    },
                    {
                        name: "512",
                        value: 512,
                    },
                    {
                        name: "1024",
                        value: 1024,
                    },
                    {
                        name: "2048",
                        value: 2048,
                    },
                    {
                        name: "4096",
                        value: 4096,
                    },
                ],
            },
        ],
    },

    run: (client, interaction) => {
        let user = interaction.options.getUser(`user`) || interaction.user;
        let size = interaction.options.getInteger(`size`) || 512;

        if (size == 16 ||
            size == 32 ||
            size == 64 ||
            size == 128 ||
            size == 256 ||
            size == 512 ||
            size == 1024 ||
            size == 2048 ||
            size == 4096) {
            client.embed.setImage(user.avatarURL({ forceStatic: true, size: size }));
        }

        interaction.reply({ embeds: [client.embed] });
    },
});