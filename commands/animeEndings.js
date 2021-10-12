const pagination = require("@freitagfelipe/discord.js-pagination");
const Jikan = require("jikan-node");
const mal = new Jikan();
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "anime-endings",
    description: "Searches the anime that you requested and send his endings musics.",
    aliases: ["animeendings", "ae"],
    usage: ".pj anime-endings <anime name>",

    async execute(message, args) {
        if (args.length === 0) {
            return message.reply("You need to insert an anime name!");
        }

        const searchingMessage = await message.channel.send("**Searching your anime endings!🔎**");

        const { results } = await mal.search("anime", args.join(" "));

        searchingMessage.delete();

        if (results.length === 0) {
            return message.reply(`I couldn't find anything with the name ${args.join(" ")}!`);
        }

        const anime = await mal.findAnime(results[0].mal_id);
        const endings = anime.ending_themes;

        if (endings.length === 0 || !endings) {
            return message.reply(`I couldn't find an ending for the anime ${anime.title}!`);
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
            .setTitle(`${anime.title} endings!`)
            .setThumbnail(anime.image_url)
            .setTimestamp();

        for (let i = 0, number = 1; i < endings.length; i++, number++) {
            currentPage.addField("\u200B", `\`${number})\` ${endings[i].slice(2)}`);

            if (((i + 1) % 10 === 0) || i === endings.length - 1) {
                pages.push(currentPage);
                number = 0;
                currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTitle(`${anime.title} endings!`)
                    .setThumbnail(anime.image_url)
                    .setTimestamp();
            }
        }

        return pagination(message, pages, 60000, ['⏪', '⏩'], false, endPage);
    }
}