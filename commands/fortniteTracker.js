const dotenv = require("dotenv");
const axios = require("axios").default;
const { MessageEmbed } = require("discord.js");
const { embedColor, prefix } = require("../config.json");
const { getFortniteTrackerTime } = require("../utils/timeUtils");

dotenv.config();

module.exports = {
    name: "fortnite-tracker",
    description: "Shows the status of a fortnite player.",
    aliases: ["fntracker", "fn-tracker"],
    usage: `${prefix}fortnite-tracker <platform> <fortnite nickname>`,

    async execute(message, args) {
        if (!(args[0] === "kbm") && !(args[0] === "gamepad") && !(args[0] === "touch")) {
            return message.reply('You need to insert "kbm", "gamepad" or "touch" as a plataform!');
        }

        const getPlayer = async (platform, nickName) => {
            const response = await axios.get(`https://api.fortnitetracker.com/v1/profile/${platform}/${nickName}`, {
                headers: {
                    'TRN-Api-Key': `${process.env.TRN}`
                }
            });

            try {
                if (response.status === 200) {
                    const data = await response.data;

                    return data;
                } else {
                    throw new Error("Request failed!");
                }
            } catch(error) {
                console.log(error);
                
                return message.reply("An error occurred while trying to execute your command, please try again!");
            }
        };

        const playerInfo = await getPlayer(args.shift(), escape(args.join(" ")));
        
        if (playerInfo.error) {
            return message.reply("This profile is private!");
        }

        let totalMinutesPlayed = 0;

        for (object in playerInfo.stats) {
            totalMinutesPlayed += playerInfo.stats[object].minutesPlayed.valueInt;
        }

        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(embedColor)
                .setTitle(`Player name: ${playerInfo.epicUserHandle} (${playerInfo.country})`)
                .setURL(`https://fortnitetracker.com/profile/all/${playerInfo.epicUserHandle}`)
                .setThumbnail(`${playerInfo.avatar}`)
                .addFields(
                    { name: "Wins:", value: `\`${playerInfo.lifeTimeStats[8].value}\``, inline: true },
                    { name: "Win%:", value: `\`${playerInfo.lifeTimeStats[9].value}\``, inline: true },
                    { name: "Kills:", value: `\`${playerInfo.lifeTimeStats[10].value}\``, inline: true },
                    { name: "K/d:", value: `\`${playerInfo.lifeTimeStats[11].value}\``, inline: true },
                    { name: "Time played:", value: `\`${getFortniteTrackerTime(totalMinutesPlayed)}\``, inline: true },
                    { name: "Matches played:", value: `\`${playerInfo.lifeTimeStats[7].value}\``, inline: true },
                    { name: "Score:", value: `\`${playerInfo.lifeTimeStats[6].value}\``, inline: true },
                )
                .setTimestamp()
        ] });
    }
}