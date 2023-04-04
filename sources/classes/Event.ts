import discord from "discord.js";
import Client from "./Client";

interface EventOptions<key extends keyof discord.ClientEvents> {
    name: key;
    run: (client: Client, ...args: discord.ClientEvents[key]) => void;
}

export default class Event<key extends keyof discord.ClientEvents> {
    public name: EventOptions<key>[`name`];
    public run: EventOptions<key>[`run`];

    constructor(options: EventOptions<key>) {
        Object.assign(this, options);
    };
};
