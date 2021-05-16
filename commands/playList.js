const { MessageEmbed } = require("discord.js");
const pagination = require("discord.js-pagination");
const client = require("../package-johnson");

module.exports = {
    name: "playlist",
    description: "Shows my favorite lofi playlist.",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        }

        const pageOne = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor("#FFFF00")
            .setTitle("Lofi playlist(1/2)")
            .setDescription(`
                **React with the emoji of the music you want to listen to!**\n
                1)[Lofi hip hop radio - beats to relax/study to](https://www.youtube.com/watch?v=5qap5aO4i9A)\n
                2)[Lofi hip hop radio - beats to sleep/chill to](https://www.youtube.com/watch?v=DWcJFNfaw9c)\n
                3)[The answer is in the stars ~ lofi hip hop mix](https://youtu.be/_DwmKtbVFJ4)\n
                4)[Code-fi / lofi beats to code/relax to](https://www.youtube.com/watch?v=f02mOEt11OQ)\n
                5)[Chill lofi beats to code/relax to](https://www.youtube.com/watch?v=bmVKaAV_7-A)\n
                6)[RAINING IN ＴＯＫＹＯ (Lofi HipHop)](https://www.youtube.com/watch?v=XKDGZ-VWLMg)\n
                7)[RAINING IN ＰＡＲＩＳ (Lofi HipHop)](https://www.youtube.com/watch?v=Xyj0Mq-YdUY)\n
                8)[Lofi hip hop radio - sad & sleepy beats](https://www.youtube.com/watch?v=l7TxwBhtTUY)\n
                9)[I can't sleep. It's 4am ~ lofi hip hop mix](https://www.youtube.com/watch?v=NDfF_XwNtIw)\n
                10)[The loneliest feeling in the world - sad lofi hip hop mix](https://www.youtube.com/watch?v=7AHGD1IvssY)
            `)

        const pageTwo =  new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor("#FFFF00")
            .setTitle("Lofi playlist(2/2)")
            .setDescription(`
                **React with the emoji of the music you want to listen to!**\n
                1)[It's 3am. Why so sad ? ~ lofi hip hop mix](https://www.youtube.com/watch?v=hzpt3fQjY9U)\n
                2)[Alone with myself / lofi hip hop mix](https://www.youtube.com/watch?v=ldUT4FLxql4)\n
                3)[[ｌｏｆｉ]　ＭＩＮＥＣＲＡＦＴ](https://www.youtube.com/watch?v=snphzO9UFJM)\n
                4)[Khutko - Violet [lofi hip hop/relaxing beats]](https://www.youtube.com/watch?v=fkThAW1het8)\n
                5)[Lofi hip hop - brazil songs playlist](https://www.youtube.com/watch?v=ZhstyJSNKME)\n
                6)[Lofi songs for slow days](https://www.youtube.com/watch?v=AzV77KFsLn4)\n
                7)[ＣＨＩＬＬ　ＲＡＤＩＯ ２４／７](https://www.youtube.com/watch?v=21qNxnCS8WU)\n
                8)[Depressing songs / sad songs that make you cry mix (sad music playlist 24/7)](https://www.youtube.com/watch?v=GOjsIgeRhYU)\n
                9)[1 A.M Study Session 📚 - [lofi hip hop/chill beats]](https://www.youtube.com/watch?v=lTRiuFIWV54)\n
                10)[Anime lofi hip hop radio - 24/7 chill lofi remixes of anime](https://www.youtube.com/watch?v=UoMbwCoJTYM)\n
            `)

        pagination(message, [pageOne, pageTwo], ['⏪', '⏩'], "60000").then(msg => {
            let page = 1;
            let music = [];

            setTimeout(() => {
                message.delete();
                msg.delete();
            }, 60000);

            const filter = (reaction, user) => {
                return ["⏩", "⏪", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"].includes(reaction.emoji.name) && user.id === message.author.id;
            }

            const collector = msg.createReactionCollector(filter, { max: 5, time: 60000 });

            collector.on("collect", collected => {
                switch (collected.emoji.name) {
                    case "⏩":
                        if (page == 2) {
                            page = 1;
                        } else {
                            page++;
                        }
                        break;
                    case "⏪":
                        if (page == 1) {
                            page = 2;
                        } else {
                            page--;
                        }
                        break;
                    case "1️⃣":
                        music = ["https://www.youtube.com/watch?v=5qap5aO4i9A", "https://www.youtube.com/watch?v=hzpt3fQjY9U"];
                        break;
                    case "2️⃣":
                        music = ["https://www.youtube.com/watch?v=DWcJFNfaw9c", "https://www.youtube.com/watch?v=ldUT4FLxql4"];
                        break;
                    case "3️⃣":
                        music = ["https://youtu.be/_DwmKtbVFJ4", "https://www.youtube.com/watch?v=snphzO9UFJM"];
                        break;
                    case "4️⃣":
                        music = ["https://www.youtube.com/watch?v=f02mOEt11OQ", "https://www.youtube.com/watch?v=fkThAW1het8"];
                        break;
                    case "5️⃣":
                        music = ["https://www.youtube.com/watch?v=bmVKaAV_7-A", "https://www.youtube.com/watch?v=ZhstyJSNKME"];
                        break;
                    case "6️⃣":
                        music = ["https://www.youtube.com/watch?v=XKDGZ-VWLMg", "https://www.youtube.com/watch?v=AzV77KFsLn4"];
                        break;
                    case "7️⃣":
                        music = ["https://www.youtube.com/watch?v=Xyj0Mq-YdUY", "https://www.youtube.com/watch?v=21qNxnCS8WU"];
                        break;
                    case "8️⃣":
                        music = ["https://www.youtube.com/watch?v=l7TxwBhtTUY", "https://www.youtube.com/watch?v=GOjsIgeRhYU"];
                        break;
                    case "9️⃣":
                        music = ["https://www.youtube.com/watch?v=NDfF_XwNtIw", "https://www.youtube.com/watch?v=lTRiuFIWV54"];
                        break;
                    case "🔟":
                        music = ["https://www.youtube.com/watch?v=7AHGD1IvssY", "https://www.youtube.com/watch?v=UoMbwCoJTYM"];
                        break;
                }
                
                if (music[0]) {
                    msg.delete();

                    if (page == 1) {
                        client.commands.get("play").execute(message, [music[0]]);
                    } else {
                        client.commands.get("play").execute(message, [music[1]]);
                    }

                    return message.reply("Thank you for choosing! Your music is about to start ...");
                }
            });
        })
    }
};