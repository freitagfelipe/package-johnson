const lyricsFinder = require("lyrics-finder");
const pagination = require("discord.js-pagination");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "lyrics",
    description: "Shows the lyrics of the currently playing song or the current song of the queue.",
    aliases: ["l"],
    usage: ".pj lyrics or .pj lyrics <music name> | <author name>",

    async execute(message, args) {
        let lyrics, authorName, musicName;

        if (args.includes("|")) {
            musicName = args.slice(0, args.indexOf("|")).join(" ");
            authorName = args.slice(args.indexOf("|") + 1).join(" ");
        } else if(args.length == 0) {
            const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);
            
            if(!queue) {
                return message.reply("you need a music queue so I can send the lyrics of the current song!");
            }

            authorName = queue.musics[0].songInfo.videoDetails.media.artist;
            musicName = queue.musics[0].songInfo.videoDetails.media.song;
        } else {
            return message.reply("you need a music queue so I can send the lyrics of the current song or you need to insert .pj lyrics <music name> | <author name>!");
        }

        lyrics = await lyricsFinder(authorName, musicName) || "Not Found!";

        if (lyrics == "Not Found!") {
            return message.reply(`I can't find ${musicName} by ${authorName}!`);
        }

        if (lyrics.length < 2048) {
            return message.channel.send(new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(embedColor)
                .setDescription(lyrics)
                .setTimestamp()
            )
        } else {
            const pages = [];
            let currentPage = new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(embedColor)
                .setTimestamp()

            lyrics = lyrics.split("\n\n");
            
            for (let i = 0; i < lyrics.length; i++) {
                currentPage.addField("\u200B", `${lyrics[i]}`);

                if (((i + 1) % 10 == 0 && i != 0) || i == lyrics.length - 1) {
                    pages.push(currentPage);
                    currentPage = new MessageEmbed()
                        .setAuthor(
                            `${message.client.user.username}`,
                            `${message.client.user.displayAvatarURL()}`
                        )
                        .setColor(embedColor)
                        .setTimestamp()
                }
            }

            return pagination(message, pages, ['⏪', '⏩'], 60000);
        }
    }
}