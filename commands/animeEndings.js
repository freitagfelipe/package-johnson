const pagination = require("discord.js-pagination");
const Jikan = require("jikan-node");
const mal = new Jikan();
const { execute } = require("./play");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "anime-endings",
    description: "Searches the anime that you requested and send his endings musics.",
    aliases: ["animeendings", "ae"],
    usage: ".pj anime-endings <anime name>",

    async execute(message, args) {
        if (args.length == 0) {
            return message.reply("you need to insert an anime name!");
        }

        let searchingMessage;

        message.channel.send("**Searching your anime openings!🔎**").then(msg => searchingMessage = msg);

        const { results } = await mal.search("anime", args.join(" "));

        if (results.length == 0) {
            searchingMessage.delete();

            return message.reply(`I couldn't find anything with the name ${args.join(" ")}!`);
        }

        const anime = await mal.findAnime(results[0].mal_id);
        const endings = anime.ending_themes;
        let currentPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setTitle(`${message.author.username}, react with an emoji of a number from 1️⃣ to 🔟 corresponding to the music you want to listen to!`)
            .setThumbnail(anime.image_url)
            .setTimestamp()

        if (endings.length == 0 || !endings) {
            return message.reply(`I couldn't find an ending for the anime ${anime.title}!`);
        }

        searchingMessage.delete();

        if(endings.length <= 10) {
            for(let i = 0; i < endings.length; i++) {
                currentPage.addField("\u200B", `${i + 1}) ${endings[i].slice(4)}`);
            }

            return message.channel.send(currentPage).then(msg => {
                const filter = (reaction, user) => {
                    return ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"].includes(reaction.emoji.name) && user.id === message.author.id;
                }

                const collector = msg.createReactionCollector(filter, { time: 60000 });

                setTimeout(() => {
                    if (!msg.deleted) {
                        message.channel.send("**Timeout!⌛**");
                        message.delete();
                        msg.delete();
                    }
                }, 60000);

                collector.on("collect", collected => {
                    let music = -1;
        
                    switch (collected.emoji.name) {
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
                        case "9️⃣":
                            music = 9;
                            break;
                        case "🔟":
                            music = 10;
                            break;
                    }
        
                    if (music != -1) {
                        if (endings[music]) {
                            msg.delete();
                            message.delete();

                            let animeMusicName = endings[music].slice(4).split("by")[0].split(" ");
                            animeMusicName.pop();
                            animeMusicName.unshift(anime.title);

                            execute(message, animeMusicName);
                        } else {
                            message.reply("there is no song with the number you reacted, please react with another number!");
                        }
                    }
                });
            });
        } else {
            const pages = [];

            for (let i = 0, number = 1; i < endings.length; i++, number++) {
                currentPage.addField("\u200B", `\`${number})\` ${endings[i].slice(4)}`);

                if (((i + 1) % 10 == 0) || i == endings.length - 1) {
                    pages.push(currentPage);
                    number = 0;
                    currentPage = new MessageEmbed()
                        .setAuthor(
                            `${message.client.user.username}`,
                            `${message.client.user.displayAvatarURL()}`
                        )
                        .setColor(embedColor)
                        .setTitle(`${message.author.username}, react with an emoji of a number from 1️⃣ to 🔟 corresponding to the music you want to listen to!`)
                        .setThumbnail(anime.image_url)
                        .setTimestamp()
                }
            }

            return pagination(message, pages, ['⏪', '⏩'], 60000).then(msg => {
                const totalPages = Math.ceil(endings / 10);
                let page = 0;

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
                    let music = -1;

                    switch(collected.emoji.name) {
                        case "⏩":
                            if(page == totalPages - 1) {
                                page = 0;
                            } else {
                                page++;
                            }
                            break;
                        case "⏪":
                            if (page == 0) {
                                page = totalPages - 1;
                            } else {
                                page--;
                            }
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

                    if (music != -1) {
                        if (endings[music + 10 * page]) {
                            msg.delete();
                            message.delete();

                            let animeMusicName = endings[music + 10 * page].slice(4).split("by")[0].split(" ");
                            animeMusicName.pop();
                            animeMusicName.unshift(`${anime.title} ending`);

                            execute(message, animeMusicName);
                        } else {
                            message.reply("there is no song with the number you reacted to on this page, please react with another number!");
                        }
                    }
                });
            })
        }
    }
}