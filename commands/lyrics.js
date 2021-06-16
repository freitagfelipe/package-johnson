const lyricsFinder = require("lyrics-finder");
const pagination = require("discord.js-pagination");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "lyrics",
    description: "Shows the lyrics of a music.",
    aliases: ["l"],
    usage: ".pj lyrics <music name> <author name>",

    async execute(message, args) {
        if (args.includes("|")) {
            const musicName = args.slice(0, args.indexOf("|")).join(" ");
            const authorName = args.slice(args.indexOf("|") + 1).join(" ");

            let lyrics = await lyricsFinder(authorName, musicName) || "Not Found!";

            if (lyrics.length < 2048) {
                return message.channel.send(new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTitle(`Artist: \`${authorName}\` | Music Name: \`${musicName}\``)
                    .setDescription(lyrics)
                    .setTimestamp()
                )
            } else {
                const pages = [];
                let currentDescription = "";
                let currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTitle(`Artist: \`${authorName}\` | Music Name: \`${musicName}\``)
                    .setTimestamp()

                lyrics = lyrics.split("\n\n");
                
                for (let i = 0; i < lyrics.length; i++) {
                    currentDescription += `${lyrics[i]}\n\n`;

                    if ((i % 9 == 0 && i != 0) || i == lyrics.length - 1) {
                        currentPage.setDescription(currentDescription);
                        pages.push(currentPage);
                        currentDescription = "";
                        currentPage = new MessageEmbed()
                            .setAuthor(
                                `${message.client.user.username}`,
                                `${message.client.user.displayAvatarURL()}`
                            )
                            .setColor(embedColor)
                            .setTitle(`Artist: \`${authorName}\` | Music Name: \`${musicName}\``)
                            .setTimestamp()
                    }
                }

                return pagination(message, pages, ['⏪', '⏩'], 60000);
            }
        } else {
            return message.reply("the correct usage of this command is <artist name> | <music name>!");
        }
    }
}