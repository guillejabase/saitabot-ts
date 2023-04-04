import discord from "discord.js";
import canvas from "canvas";
import Command from "../../classes/Command";

canvas.registerFont("./sources/canvas/fonts/whitneySemibold.otf", { family: "WhitneySemibold" });
canvas.registerFont("./sources/canvas/fonts/whitneyMedium.otf", { family: "WhitneyMedium" });

export default new Command({
    data: {
        name: "fakemessage",
        description: "Screenshot someone saying whatever you want.",
        options: [
            {
                name: "user",
                description: "User to take a screenshot of.",
                type: discord.ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "text",
                description: "Text to the user message.",
                type: discord.ApplicationCommandOptionType.String,
                max_length: 75,
                required: true,
            },
        ],
    },

    run: async (client, interaction) => {
        let user = interaction.options.getUser("user");
        let member = interaction.guild.members.cache.get(user.id);
        let text = interaction.options.getString("text");
        let cvs = canvas.createCanvas(750, 110);
        let ctx = cvs.getContext("2d");

        ctx.fillStyle = "#36393f";
        ctx.fillRect(0, 0, cvs.width, cvs.height);

        let size = 50;
        let cvs2 = canvas.createCanvas(size, size);
        let ctx2 = cvs2.getContext("2d");

        ctx2.beginPath();
        ctx2.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
        ctx2.clip();
        ctx2.closePath();
        ctx2.drawImage(await canvas.loadImage(user.displayAvatarURL({ size: 64, forceStatic: true, extension: "png" })), 0, 0, size, size);

        ctx.drawImage(cvs2, 24, 30, 50, 50);
        ctx.font = "22px WhitneySemibold";
        ctx.fillStyle = member?.displayColor ? member.displayHexColor : "#ffffff";
        ctx.fillText(member?.nickname || user.username, 92, 48);

        let measure = ctx.measureText(member?.nickname || user.username);
        let minutes = new Date().getUTCMinutes();
        let hours = new Date().getUTCHours();

        ctx.font = "16px WhitneyMedium";
        ctx.fillStyle = "#a3a6aa";
        ctx.fillText(`Today at ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${hours > 11 ? `P` : `A`}M`, 102 + measure.width, 48);
        ctx.font = "22px WhitneyMedium";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(text, 92, 75);

        let attach = new discord.AttachmentBuilder(cvs.toBuffer(), { name: "screenshot.png" });

        interaction.reply({ files: [attach] });
    },
});