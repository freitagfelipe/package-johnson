const pagination = require("@freitagfelipe/discord.js-pagination");
const Jikan = require("jikan-node");
const mal = new Jikan();
const { MessageEmbed } = require("discord.js");
const { embedColor, prefix } = require("../config.json");

module.exports = {
    name: "anime-openings",
    description: "Searches the anime that you requested and send his openings musics.",
    aliases: ["animeopenings", "ao"],
    usage: `${prefix}anime-openings <anime name>`,

    async execute(message, args) {
        if (args.length === 0) {
            return message.reply("You need to insert an anime name!");
        }

        const searchingMessage = await message.channel.send("**Searching your anime openings!🔎**");

        const { results } = await mal.search("anime", args.join(" "));

        searchingMessage.delete();

        if (results.length === 0) {
            searchingMessage.delete();

            return message.reply(`I couldn't find anything with the name ${args.join(" ")}!`);
        }

        const anime = await mal.findAnime(results[0].mal_id);
        const openings = anime.opening_themes;

        if (openings.length === 0 || !openings) {
            return message.reply(`I couldn't find an opening for the anime ${anime.title}!`);
        }

        const pages = [];
        const endPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setDescription("**Timeout!⌛**");
        let currentPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setTitle(`${anime.title} openings!`)
            .setThumbnail(anime.image_url)
            .setTimestamp();

        for (let i = 0, number = 1; i < openings.length; ++i, ++number) {
            currentPage.addField("\u200B", `\`${number})\` ${openings[i].slice(2)}`);

            if (((i + 1) % 10 === 0) || i === openings.length - 1) {
                pages.push(currentPage);
                number = 0;
                currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTitle(`${anime.title} openings`)
                    .setThumbnail(anime.image_url)
                    .setTimestamp();
            }
        }

        pagination(message, pages, 60000, ['⏪', '⏩'], false, endPage);
    }
}