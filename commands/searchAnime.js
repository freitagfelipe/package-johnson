const Jikan = require("jikan-node");
const mal = new Jikan();
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "search-anime",
    description: "Searches the anime that you requested and send it's information.",
    aliases: ["searchanime", "sa"],
    usage: ".pj search-anime <anime name>",

    async execute(message, args) {
        if (args.length == 0) {
            return message.reply("You need to insert an anime name!");
        }

        const searchingMessage = await message.channel.send("**Searching your anime!🔎**");
        const { results } = await mal.search("anime", args.join(" "));

        if(results.length == 0) {
            searchingMessage.delete();
        
            return message.reply(`I couldn't find anything with the name ${args.join(" ")}!`);
        }

        const anime = await mal.findAnime(results[0].mal_id);

        searchingMessage.delete();

        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setTitle(`Anime: ${anime.title}`)
                .setURL(`${anime.url}`)
                .setThumbnail(`${anime.image_url}`)
                .setColor(embedColor)
                .setDescription(`**Description:**\n${anime.synopsis}`)
                .addFields(
                    { name: "Type:", value: `\`${anime.type}\``, inline: true},
                    { name: "Status:", value: `\`${anime.status}\``, inline: true},
                    { name: "Total episodes:", value: `\`${anime.episodes}\``, inline: true},
                    { name: "Aired:", value: `\`${anime.aired.string}\``, inline: true},
                    { name: "Score:", value: `\`${anime.score}\``, inline: true},
                    { name: "Rank:", value: `\`#${anime.rank}\``, inline: true},
                    { name: "Popularity:", value: `\`#${anime.popularity}\``, inline: true},
                    { name: "Genren", value: `\`${anime.genres.map(genre => genre.name).join(", ")}\``, inline: true},
                    { name: "Source:", value: `\`${anime.source}\``, inline: true}
                )
                .setTimestamp()
        ] });
    }
}