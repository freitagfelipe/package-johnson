const client = require("../package-johnson");
const ytsr = require("ytsr");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "search",
    description: "Search for a music name and send a list to your choose wich one will play.",
    usage: ".pj search",

    async execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be on a voice channel to execute this command!");
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
            .setTitle("React with the emoji of the music you want to listen to!")
            .setTimestamp()

        let descriptionText = "";

        for (let i = 0; i < 5; i++) {
            descriptionText += `${i + 1}) [${musics[i].title}](${musics[i].url}) | \`Channel name:\` [${musics[i].author.name}](${musics[i].author.url})\n`;
        }

        page.setDescription(`These are the results of your search:\n${descriptionText}`);
        page.addField("\u200B", `**${message.author.username}, react with the emoji of the music you want to listen to!**`);

        message.channel.send(page).then(msg => {
            const filter = (reaction, user) => {
                return ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"].includes(reaction.emoji.name) && user.id === message.author.id;
            }

            const collector = msg.createReactionCollector(filter, { time: 60000});

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
                }
    
                if (music) {
                    msg.delete();
                    message.delete();

                    client.commands.get("play").execute(message, [music]);
                } else {
                    message.reply("there is no song with the numer you reacted, please react with another number!");
                }
            });
        });
    }
}