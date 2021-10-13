const ytsr = require("ytsr");
const pagination = require("@freitagfelipe/discord.js-pagination");
const { execute } = require("./play");
const { MessageEmbed } = require("discord.js");
const { embedColor, prefix } = require("../config.json");

module.exports = {
    name: "search",
    description: "Searches for a music name and send a list to you choose wich one will play.",
    usage: `${prefix}search`,

    async execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (!(args.length > 0) || args[0].startsWith("https://")) {
            return message.reply(`You need to insert a music name! If you already have a link you can use ${prefix}play!`);
        }

        const searchingMessage = await message.channel.send("**Searching!🔎**");
        const result = await ytsr(args.join(" "), {pages: 1});

        searchingMessage.delete();

        if(!result.items.length) {
            return message.reply("No song ware found! Please try again.");
        }

        const musics = result.items.filter(item => item.type === "video");

        const page = [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(embedColor)
                .setThumbnail(`${message.client.user.avatarURL()}`)
                .setTitle(`React with an emoji of a number from 1️⃣ to 🔟 corresponding to the music you want to listen to!`)
                .setTimestamp()
        ];
        const endPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setDescription("**Timeout!⌛**");

        for (let i = 0; i < 10; i++) {
            page[0].addField("\u200B", `${i + 1}) [${musics[i].title}](${musics[i].url}) | \`Channel name:\` [${musics[i].author.name}](${musics[i].author.url})`);
        }

        const msg = await pagination(message, page, 60000, ['⏪', '⏩'],endPage);
        const collector = msg.createReactionCollector({ time: 60000 });

        collector.on("collect", collected => {
            let music;

            switch (collected.emoji.name) {
                case "1️⃣":
                    music = musics[0].url;
                    break;
                case "2️⃣":
                    music = musics[1].url;
                    break;
                case "3️⃣":
                    music = musics[2].url;
                    break;
                case "4️⃣":
                    music = musics[3].url;
                    break;
                case "5️⃣":
                    music = musics[4].url;
                    break;
                case "6️⃣":
                    music = musics[5].url;
                    break;
                case "7️⃣":
                    music = musics[6].url;
                    break;
                case "8️⃣":
                    music = musics[7].url;
                    break;
                case "9️⃣":
                    music = musics[8].url;
                    break;
                case "🔟":
                    music = musics[9].url;
                    break;
            }

            if (music) {
                return execute(message, [music]);
            } else {
                return message.reply("There is no song with the number you reacted, please react with another number!");
            }
        });
    }
}