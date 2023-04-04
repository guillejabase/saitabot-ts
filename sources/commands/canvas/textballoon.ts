import discord from "discord.js";
import canvas from "canvas";
import Command from "../../classes/Command";

export default new Command({
    data: {
        name: "textballoon",
        description: "Create a text balloon with an image.",
        options: [
            {
                name: "image",
                description: "Image below the text balloon.",
                type: discord.ApplicationCommandOptionType.Attachment,
                required: true,
            },
        ],
    },

    run: async (client, interaction) => {
        let image = interaction.options.getAttachment("image");
        let height = (image.height > 256 ? image.height : 256) / 3;
        let cvs = canvas.createCanvas(image.width, image.height + height);
        let ctx = cvs.getContext("2d");

        ctx.drawImage(await canvas.loadImage("./sources/canvas/images/textballoon.png"), 0, 0, cvs.width, height);
        ctx.drawImage(await canvas.loadImage(image.url), 0, height, cvs.width, cvs.height - height);

        let attach = new discord.AttachmentBuilder(cvs.toBuffer(), { name: "textballoon.png" });

        interaction.reply({ files: [attach] });
    },
});