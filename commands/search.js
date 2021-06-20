const ytsr = require("ytsr");
const { execute } = require("./play");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "search",
    description: "Searches for a music name and send a list to you choose wich one will play.",
    usage: ".pj search",

    async execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be in a voice channel to execute this command!");
        } else if (!(args.length > 0) || args[0].startsWith("https://")) {
            return message.reply("you need to insert a music name!");
        }

        let searchingMessage;

        message.channel.send("**Searching!🔎**").then(msg => {
            searchingMessage = msg;
        });

        const result = await ytsr(args.join(" "), {pages: 1});

        searchingMessage.delete();

        if(!result.items.length) {
            return message.reply("no song ware found! Please try again.");
        }

        const musics = result.items.filter(item => item.type == "video");

        const page = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setThumbnail(`${message.client.user.avatarURL()}`)
            .setTitle(`${message.author.username}, react with an emoji of a number from 1️⃣ to 🔟 corresponding to the music you want to listen to!`)
            .setTimestamp()

        for (let i = 0; i < 10; i++) {
            page.addField("\u200B", `${i + 1}) [${musics[i].title}](${musics[i].url}) | \`Channel name:\` [${musics[i].author.name}](${musics[i].author.url})`);
        }

        message.channel.send(page).then(msg => {
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
                    msg.delete();
                    message.delete();

                    execute(message, [music]);
                } else {
                    message.reply("there is no song with the number you reacted, please react with another number!");
                }
            });
        });
    }
}