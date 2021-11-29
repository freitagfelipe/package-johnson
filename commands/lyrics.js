const lyricsFinder = require("lyrics-finder");
const pagination = require("@freitagfelipe/discord.js-pagination");
const { MessageEmbed } = require("discord.js");
const { embedColor, prefix } = require("../config.json");

module.exports = {
    name: "lyrics",
    description: "Shows the lyrics of the currently playing song or the song that you requested.",
    aliases: ["l"],
    usage: `${prefix}lyrics or ${prefix}lyrics <music name> | <author name>`,

    async execute(message, args) {
        let lyrics, authorName, musicName;

        if (args.includes("|")) {
            musicName = args.slice(0, args.indexOf("|")).join(" ");
            authorName = args.slice(args.indexOf("|") + 1).join(" ");
        } else if(args.length === 0) {
            const queue = global.queues.find(obj => obj.id === message.guild.id);
            
            if(!queue) {
                return message.reply(`You need a music queue so I can send the lyrics of the current song! But if you want the lyrics of a specific music you can use ${prefix}lyrics <music name> | <author name>`);
            }

            authorName = queue.musics[0].songInfo.videoDetails.media.artist;
            musicName = queue.musics[0].songInfo.videoDetails.media.song;
        } else {
            return message.reply(`You need a music queue so I can send the lyrics of the current song or you need to insert ${prefix}lyrics <music name> | <author name>!`);
        }

        lyrics = await lyricsFinder(authorName, musicName) || "Not Found!";

        if (lyrics === "Not Found!" && authorName != undefined && musicName != undefined) {
            return message.reply(`I can't find ${musicName} by ${authorName}!`);
        } else if(lyrics === "Not Found!") {
            return message.reply(`I can't find the lyrics of your music, please try insert ${prefix}lyrics <music name> | <author name>`);
        }

        const pages = [];
        let currentPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setTimestamp();
        const endPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setDescription("**Timeout!⌛**");

        lyrics = lyrics.split("\n\n");

        for (let i = 0; i < lyrics.length; ++i) {
            currentPage.addField("\u200B", `${lyrics[i]}`);

            if (((i + 1) % 10 === 0 && i !== 0) || i === lyrics.length - 1) {
                pages.push(currentPage);
                currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTimestamp();
            }
        }

        pagination(message, pages, 60000, ['⏪', '⏩'], false, endPage);
    }
}