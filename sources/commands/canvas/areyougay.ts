import discord from "discord.js";
import canvas from "canvas";
import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "areyougay",
        description: "🏳‍🌈?",
        options: [
            {
                name: "image",
                description: "Image to 🏳‍🌈?",
                type: discord.ApplicationCommandOptionType.Attachment,
                required: true,
            },
        ],
    },

    run: async (client, interaction) => {
        let image = interaction.options.getAttachment("image");
        let cvs = canvas.createCanvas(image.width, image.height);
        let ctx = cvs.getContext("2d");

        ctx.drawImage(await canvas.loadImage(image.url), 0, 0, cvs.width, cvs.height);
        ctx.drawImage(await canvas.loadImage("./sources/canvas/images/areyougay.png"), image.width / 2, image.height - 71, 106, 51);

        let attach = new discord.AttachmentBuilder(cvs.toBuffer(), { name: "areyougay.png" });

        interaction.reply({ files: [attach] });
    },
});