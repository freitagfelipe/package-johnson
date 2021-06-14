const client = require("../package-johnson");
const pagination = require("discord.js-pagination");
const { embedColor } = require("../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "playlist",
    description: "Shows my favorite lofi playlist.",
    aliases: ["pl"],
    usage: ".pj playlist",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (message.guild.me.voice.channel && !(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("I'm already on another voice channel on this server, please join it to execute this command!");
        }

        const pageOne = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setTitle("Lofi playlist(1/3)")
            .setDescription(`
                **React with the emoji of the music you want to listen to!**\n
                1)[Lofi hip hop radio - beats to relax/study to](https://youtu.be/5qap5aO4i9A)\n
                2)[Lofi hip hop radio - beats to sleep/chill to](https://youtu.be/DWcJFNfaw9c)\n
                3)[The answer is in the stars ~ lofi hip hop mix](https://youtu.be/_DwmKtbVFJ4)\n
                4)[Code-fi / lofi beats to code/relax to](https://youtu.be/f02mOEt11OQ)\n
                5)[Chill lofi beats to code/relax to](https://youtu.be/bmVKaAV_7-A)\n
                6)[RAINING IN ＴＯＫＹＯ (Lofi HipHop)](https://youtu.be/XKDGZ-VWLMg)\n
                7)[RAINING IN ＰＡＲＩＳ (Lofi HipHop)](https://youtu.be/Xyj0Mq-YdUY)\n
                8)[Lofi hip hop radio - sad & sleepy beats](https://youtu.be/l7TxwBhtTUY)\n
                9)[I can't sleep. It's 4am ~ lofi hip hop mix](https://youtu.be/NDfF_XwNtIw)\n
                10)[The loneliest feeling in the world - sad lofi hip hop mix](https://youtu.be/7AHGD1IvssY)
            `)
            .addField("\u200B", `**${message.author.username}, react with the emoji of the music you want to listen to!**`)

        const pageTwo =  new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setTitle("Lofi playlist(2/3)")
            .setDescription(`
                **React with the emoji of the music you want to listen to!**\n
                1)[It's 3am. Why so sad ? ~ lofi hip hop mix](https://youtu.be/hzpt3fQjY9U)\n
                2)[Alone with myself / lofi hip hop mix](https://youtu.be/ldUT4FLxql4)\n
                3)[[ｌｏｆｉ]　ＭＩＮＥＣＲＡＦＴ](https://youtu.be/snphzO9UFJM)\n
                4)[Khutko - Violet [lofi hip hop/relaxing beats]](https://youtu.be/fkThAW1het8)\n
                5)[Lofi hip hop - brazil songs playlist](https://youtu.be/ZhstyJSNKME)\n
                6)[Lofi songs for slow days](https://youtu.be/AzV77KFsLn4)\n
                7)[ＣＨＩＬＬ　ＲＡＤＩＯ ２４／７](https://youtu.be/21qNxnCS8WU)\n
                8)[Night at the bookstore. [lofi / chillhop / anime mix]](https://youtu.be/oFm6rbA5BD8)\n
                9)[1 A.M Study Session 📚 - [lofi hip hop/chill beats]](https://youtu.be/lTRiuFIWV54)\n
                10)[Anime lofi hip hop radio - 24/7 chill lofi remixes of anime](https://youtu.be/UoMbwCoJTYM)
            `)
            .addField("\u200B", `**${message.author.username}, react with the emoji of the music you want to listen to!**`)
        
        const pageThree = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setTitle("Lofi playlist(3/3)")
            .setDescription(`
                **React with the emoji of the music you want to listen to!**\n
                1)[[24/7 CHILL LOFI HIP HOP RADIO] beats to sleep/relax/study to](https://youtu.be/VfW86fnQL5w)\n
                2)[Naruto Chill Trap, Lofi Hip Hop Mix](https://youtu.be/1j5BvojJrNc)\n
                3)[Sad lofi to help you sleep](https://youtu.be/f3kEzMCXRfI)\n
                4)[Shiloh Dynasty Relax Music With Rain](https://youtu.be/-jM-ICsBX3I)\n
                5)[Japanese night cafe vibes / a lofi hip hop mix ~ chill with taiki](https://youtu.be/9FvvbVI5rYA)\n
                6)[Studying in the library [lofi hip hop chill beats] ~ chill with taiki](https://youtu.be/T0c-H86VUno)\n
                7)[Space Lofi Café - relaxing beats to chill/study to](https://youtu.be/yXa2_m0fhzQ)\n
                8)[Asian night markets / lofi hip hop mix](https://youtu.be/M43cDHb-6R0)\n
                9)[Old songs but it's lofi remix](https://youtu.be/BrnDlRmW5hs)\n
                10)[4 A.M Study Session - [lofi hip hop/chill beats]](https://youtu.be/TURbeWK2wwg)
            `)
            .addField("\u200B", `**${message.author.username}, react with the emoji of the music you want to listen to!**`)

        pagination(message, [pageOne, pageTwo, pageThree], ['⏪', '⏩'], 60000).then(msg => {
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
                switch (collected.emoji.name) {
                    case "⏩":
                        if (page == 2) {
                            page = 0;
                        } else {
                            page++;
                        }
                        break;
                    case "⏪":
                        if (page == 0) {
                            page = 2;
                        } else {
                            page--;
                        }
                        break;
                    case "1️⃣":
                        music = ["https://youtu.be/5qap5aO4i9A", "https://youtu.be/hzpt3fQjY9U", "https://youtu.be/oFm6rbA5BD8"];
                        break;
                    case "2️⃣":
                        music = ["https://youtu.be/DWcJFNfaw9c", "https://youtu.be/ldUT4FLxql4", "https://youtu.be/1j5BvojJrNc"];
                        break;
                    case "3️⃣":
                        music = ["https://youtu.be/_DwmKtbVFJ4", "https://youtu.be/snphzO9UFJM", "https://youtu.be/f3kEzMCXRfI"];
                        break;
                    case "4️⃣":
                        music = ["https://youtu.be/f02mOEt11OQ", "https://youtu.be/fkThAW1het8", "https://youtu.be/-jM-ICsBX3I"];
                        break;
                    case "5️⃣":
                        music = ["https://youtu.be/bmVKaAV_7-A", "https://youtu.be/ZhstyJSNKME", "https://youtu.be/9FvvbVI5rYA"];
                        break;
                    case "6️⃣":
                        music = ["https://youtu.be/XKDGZ-VWLMg", "https://youtu.be/AzV77KFsLn4", "https://youtu.be/T0c-H86VUno"];
                        break;
                    case "7️⃣":
                        music = ["https://youtu.be/Xyj0Mq-YdUY", "https://youtu.be/21qNxnCS8WU", "https://youtu.be/yXa2_m0fhzQ"];
                        break;
                    case "8️⃣":
                        music = ["https://youtu.be/l7TxwBhtTUY", "https://youtu.be/oFm6rbA5BD8", "https://youtu.be/M43cDHb-6R0"];
                        break;
                    case "9️⃣":
                        music = ["https://youtu.be/NDfF_XwNtIw", "https://youtu.be/lTRiuFIWV54", "https://youtu.be/BrnDlRmW5hs"];
                        break;
                    case "🔟":
                        music = ["https://youtu.be/7AHGD1IvssY", "https://youtu.be/UoMbwCoJTYM", "https://youtu.be/TURbeWK2wwg"];
                        break;
                }
                
                if (music) {
                    if (music[page]) {
                        msg.delete();
                        message.delete();

                        client.commands.get("play").execute(message, [music[page]]);
                    } else {
                        message.reply("there is no song with the number you reacted to on this page, please react with another number!");
                    }
                }
            });
        })
    }
};