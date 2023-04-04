import discord from "discord.js";
import fs from "fs";
import Command from "./Command";
import Event from "./Event";

export default class Client extends discord.Client {
    public commands: discord.Collection<string, Command> = new discord.Collection;
    public categories: discord.Collection<string, { name: string, commands: string[]; }> = new discord.Collection;
    public embed: discord.EmbedBuilder;

    public randomInt(min: number, max: number) {
        return Math.random() * (max - min + 1) + min;
    }
    public toCase(text: string) {
        let letter = text[0].toUpperCase();
        let letters = text.slice(1).toLowerCase();

        return letter + letters;
    }
    public checkPermission(interaction: discord.ChatInputCommandInteraction, permission: discord.PermissionsString) {
        let bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
            return `I don't have the \"${permission}\" permission.`;
        } else {
            return false;
        }
    }

    constructor() {
        super({
            intents: [
                discord.IntentsBitField.Flags.GuildMembers,
                discord.IntentsBitField.Flags.GuildMessages,
                discord.IntentsBitField.Flags.GuildPresences,
                discord.IntentsBitField.Flags.Guilds,
            ],
            allowedMentions: {
                repliedUser: false,
            },
            partials: [discord.Partials.Channel],
            makeCache: discord.Options.cacheWithLimits({
                BaseGuildEmojiManager: 0,
                GuildBanManager: 0,
                GuildEmojiManager: 0,
                GuildInviteManager: 0,
                GuildScheduledEventManager: 0,
                GuildStickerManager: 0,
                ReactionManager: 0,
                ReactionUserManager: 0,
                StageInstanceManager: 0,
                ThreadManager: 0,
                ThreadMemberManager: 0,
                VoiceStateManager: 0,
            }),
            presence: {
                activities: [
                    {
                        name: `supermarket sales`,
                        type: discord.ActivityType.Watching,
                    },
                ],
            },
        });

        for (let folder of fs.readdirSync(`./sources/commands`)) {
            let commands = fs.readdirSync(`./sources/commands/${folder}`);

            this.categories.set(folder, {
                name: folder,
                commands: commands.map((command) => command.slice(0, -3)),
            });

            for (let file of commands) {
                let command: Command = require(`../commands/${folder}/${file}`).default;

                this.commands.set(command.data.name, command);
            }
        }

        for (let folder of fs.readdirSync(`./sources/events`)) {
            for (let file of fs.readdirSync(`./sources/events/${folder}`)) {
                let event: Event<keyof discord.ClientEvents> = require(`../events/${folder}/${file}`).default;

                this.on(event.name, event.run.bind(null, this));
            }
        }
    }
}
