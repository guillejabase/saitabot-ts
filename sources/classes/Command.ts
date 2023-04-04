import discord from "discord.js";
import Client from "./Client";

interface CommandOptions {
    data: discord.ChatInputApplicationCommandData;
    run: (client: Client, interaction: discord.ChatInputCommandInteraction) => void;
}

export default class Command {
    data: CommandOptions[`data`];
    run: CommandOptions[`run`];

    constructor(options: CommandOptions) {
        Object.assign(this, options);
    }
}
