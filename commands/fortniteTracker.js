const dotenv = require("dotenv");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");
const { getFortniteTrackerTime } = require("../utils/timeUtils");

dotenv.config();

module.exports = {
    name: "fortnite-tracker",
    description: "Shows the status of a person on fortnite.",
    aliases: ["fntracker", "fn-tracker"],

    async execute(message, args) {
        if (!(args[0] == "kbm") && !(args[0] == "gamepad") && !(args[0] == "touch")) {
            return message.reply('you need to insert "kbm", "gamepad" or "touch" as a plataform!')
        }

        const getPlayer = async (platform, nickName) => {
            try {
                const response = await fetch(`https://api.fortnitetracker.com/v1/profile/${platform}/${nickName}`, {
                    headers: {
                        'TRN-Api-Key': `${process.env.TRN}`
                    }
                });

                if (response.ok) {
                    const jsonResponse = await response.json();

                    return jsonResponse;
                } else {
                    throw new Error("Request failed!");
                }
            } catch(error) {
                console.log(error);
                return message.reply("An error occurred while trying to execute your command, please try again!");
            }
        }

        const playerInfo = await getPlayer(args.shift(), escape(args.join(" ")));
        
        if (playerInfo.error) {
            return message.reply("this profile is private!");
        }

        let totalMinutesPlayed = 0;

        for (object in playerInfo.stats) {
            totalMinutesPlayed += playerInfo.stats[object].minutesPlayed.valueInt;
        }

        message.channel.send(new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setTitle(`Player name: ${playerInfo.epicUserHandle} (${playerInfo.country})`)
            .setURL(`https://fortnitetracker.com/profile/all/${playerInfo.epicUserHandle}`)
            .setThumbnail(`${playerInfo.avatar}`)
            .addFields(
                { name: "Wins:", value: `\`${playerInfo.lifeTimeStats[8].value}\``, inline: true},
                { name: "Win%:", value: `\`${playerInfo.lifeTimeStats[9].value}\``, inline: true},
                { name: "Kills:", value: `\`${playerInfo.lifeTimeStats[10].value}\``, inline: true},
                { name: "K/d:", value: `\`${playerInfo.lifeTimeStats[11].value}\``, inline: true},
                { name: "Time played:", value: `\`${getFortniteTrackerTime(totalMinutesPlayed)}\``, inline: true},
                { name: "Matches played:", value: `\`${playerInfo.lifeTimeStats[7].value}\``, inline: true},
                { name: "Score:", value: `\`${playerInfo.lifeTimeStats[6].value}\``, inline: true},
            )
            .setTimestamp()
        )
    }
}