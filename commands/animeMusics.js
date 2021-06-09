const pagination = require("discord.js-pagination");
const { execute } = require("./play");
const Jikan = require("jikan-node");
const mal = new Jikan();

const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "anime-music",
    description: "Searches the anime that you requested and send his musics.",
    aliases: ["animemusic", "am"],
    usage: ".pj anime-music <anime name>",

    async execute(message, args) {
        if (args.length == 0) {
            return message.reply("you need to insert an anime name!");
        }

        let searchingMessage;

        message.channel.send("**Searching your anime musics!🔎**").then(msg => searchingMessage = msg);

        const { results } = await mal.search("anime", args.join(" "));

        if(results.length == 0) {
            searchingMessage.delete();
            return message.reply(`I couldn't find anything with the name ${args.join(" ")}!`);
        }

        const anime = await mal.findAnime(results[0].mal_id);
        const openings = anime.opening_themes;
        const endings = anime.ending_themes;
        const pages = [];
        let currentPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .addField("\u200B", `**${message.author.username}, react with the emoji of the music you want to listen to!**`)
            .setThumbnail(anime.image_url)
            .setTimestamp()
        let descriptionText = "";

        for (let i = 0, number = 1; i < openings.length; i++, number++) {
            descriptionText += `${number}) ${openings[i].slice(4)}\n`;
            
            if ((i + 1) % 10 == 0 || i == openings.length - 1) {
                number = 0;
                currentPage.setTitle(`${anime.title} openings:`)
                currentPage.setDescription(descriptionText);
                pages.push(currentPage);
                descriptionText = "";
                currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .addField("\u200B", `**${message.author.username}, react with the emoji of the music you want to listen to!**`)
                    .setThumbnail(anime.image_url)
                    .setTimestamp()
            }
        }

        for (let i = 0, number = 1; i < endings.length; i++, number++) {
            descriptionText += `${number}) ${endings[i].slice(4)}\n`;
            
            if ((i + 1) % 10 == 0 || i == endings.length - 1) {
                number = 0;
                currentPage.setTitle(`${anime.title} endings:`)
                currentPage.setDescription(descriptionText);
                pages.push(currentPage);
                descriptionText = "";
                currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .addField("\u200B", `**${message.author.username}, react with the emoji of the music you want to listen to!**`)
                    .setThumbnail(anime.image_url)
                    .setTimestamp()
            }
        }

        searchingMessage.delete();

        return pagination(message, pages, ['⏪', '⏩'], 60000).then(msg => {
            const openingPages = Math.floor(openings.length / 10 + 1);
            let isOpeningPage = true;
            let page = 0;
            let music;
            
            setTimeout(() => {
                if (!msg.deleted) {
                    message.channel.send("**Timeout!⌛**");
                    message.delete();
                    msg.delete();
                }
            }, 60000);

            const filter = (reaction, user) => {
                return ["⏩", "⏪", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"].includes(reaction.emoji.name) && user.id === message.author.id;
            }

            const collector = msg.createReactionCollector(filter, { time: 60000 });

            collector.on("collect", collected => {
                switch(collected.emoji.name) {
                    case "⏩":
                        if (page == pages.length - 1) {
                            page = 0;
                        } else {
                            page++;
                        }

                        page < openingPages ? isOpeningPage = true : isOpeningPage = false;

                        break;
                    case "⏪":
                        if (page == 0) {
                            page = pages.length - 1;
                        } else {
                            page--;
                        }

                        page < openingPages ? isOpeningPage = true : isOpeningPage = false;

                        break;
                    case "1️⃣":
                        music = 0;
                        break;
                    case "2️⃣":
                        music = 1;
                        break;
                    case "3️⃣":
                        music = 2;
                        break;
                    case "4️⃣":
                        music = 3;
                        break;
                    case "5️⃣":
                        music = 4;
                        break;
                    case "6️⃣":
                        music = 5;
                        break;
                    case "7️⃣":
                        music = 6;
                        break;
                    case "8️⃣":
                        music = 7;
                        break;
                    case "9️⃣":
                        music = 8;
                        break;
                    case "🔟":
                        music = 9;
                        break;
                }

                if (music || music == 0) {
                    const animeMusicName = isOpeningPage ? openings[music + 10 * page] : endings[music + 10 * (page - openingPages)];

                    if (animeMusicName) {
                        execute(message, animeMusicName.slice(4).split(" "));
                        message.delete();
                        msg.delete();
                    } else {
                        message.reply("there is no song with the number you reacted to on this page, please react with another number!");
                    }
                }
            });
        });
    }
}