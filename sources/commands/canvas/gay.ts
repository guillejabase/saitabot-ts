import discord from "discord.js";
import canvas from "canvas";
import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "gay",
        description: "Create a gay overlay with either an user avatar or image.",
        options: [
            {
                name: "image",
                description: "Image to gay.",
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
        ctx.drawImage(await canvas.loadImage("./sources/canvas/images/gay.png"), 0, 0, cvs.width, cvs.height);

        let attach = new discord.AttachmentBuilder(cvs.toBuffer(), { name: "gay.png" });

        interaction.reply({ files: [attach] });
    },
});