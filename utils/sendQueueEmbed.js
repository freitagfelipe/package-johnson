const { MessageEmbed } = require("discord.js");
const pagination = require("discord.js-pagination");
const { embedColor } = require("../config.json");

module.exports = {
    async sendQueueEmbed(message, musics, loopingMusic, loopingQueue) {
        const pages = [];
        const nowPlaying = musics[0]

        for (let i = 0; i < Math.ceil(musics.length / 10); i++) {
            let musicText = "";

            const page = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(`${embedColor}`)
                    .setTitle(`Queue for ${message.guild.name}`)
                    .setThumbnail(`${message.client.user.avatarURL()}`)
                    .addField("**Now Playing:**", `[${nowPlaying.songInfo.videoDetails.title}](${nowPlaying.songInfo.videoDetails.video_url}) | \`${nowPlaying.user.username}#${nowPlaying.user.discriminator}\``)

            for (let j = 10 * i; j < 10 * (i + 1); j++) {
                if (musics[j] == undefined) {
                    break;
                } else if (j != 0) {
                    musicText += `${j}) [${musics[j].songInfo.videoDetails.title}](${musics[j].songInfo.videoDetails.video_url}) | \`${musics[j].user.username}#${musics[j].user.discriminator}\`\n`;
                }
            }

            if (musicText) {
                page.addField("**Up Next:**", `${musicText}`);
            }
            
            page.addField("\u200B", `Queue loop: ${loopingQueue ? "✅" : "❎"} || Music loop: ${loopingMusic ? "✅" : "❎"}`);

            pages.push(page);
        }

        if (pages.length == 1) {
            pages[0].setFooter("Page 1/1");
            return message.channel.send(pages[0]);
        } else {
            return pagination(message, pages, ['⏪', '⏩'], "60000");
        }
    }
}