import discord from "discord.js";
import canvas from "canvas";
import Command from "../../classes/Command";

canvas.registerFont("./sources/canvas/fonts/impact.ttf", { family: "Normal" });

export default new Command({
    data: {
        name: "meme",
        description: "Generate a meme with an image and text.",
        options: [
            {
                name: "image",
                description: "Image to meme.",
                type: discord.ApplicationCommandOptionType.Attachment,
                required: true,
            },
            {
                name: "text",
                description: "Text to meme. Type \"|\" to pass the line.",
                type: discord.ApplicationCommandOptionType.String,
                max_length: 50,
                required: true,
            },
        ],
    },

    run: async (client, interaction) => {
        let image = interaction.options.getAttachment("image");
        let texts = interaction.options.getString("text").toUpperCase().split("|");
        let cvs = canvas.createCanvas(image.width, image.height);
        let ctx = cvs.getContext("2d");

        ctx.drawImage(await canvas.loadImage(image.url), 0, 0, cvs.width, cvs.height);
        ctx.font = "40px Impact";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(texts[0], cvs.width / 2, cvs.height - (cvs.height - 37.5));
        ctx.strokeText(texts[0], cvs.width / 2, cvs.height - (cvs.height - 37.5));

        if (texts[1]) {
            ctx.fillText(texts[1], cvs.width / 2, cvs.height - 5);
            ctx.strokeText(texts[1], cvs.width / 2, cvs.height - 5);
        }

        let attach = new discord.AttachmentBuilder(cvs.toBuffer(), { name: "meme.png" });

        interaction.reply({ files: [attach] });
    },
});