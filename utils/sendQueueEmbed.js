const { MessageEmbed } = require("discord.js");
const pagination = require("discord.js-pagination");
const { embedColor } = require("../config.json");

module.exports = {
    async sendQueueEmbed(message, musics, loopingMusic, loopingQueue) {
        const pages = [];
        let descriptionText = "";
        let currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(`${embedColor}`)
                    .setTitle(`Queue for ${message.guild.name}`)
                    .setThumbnail(`${message.client.user.avatarURL()}`)

        for (let i = 0; i < musics.length; i++) {
            if (i == 0) {
                descriptionText += `**Now Playing:**\n- [${musics[i].songInfo.videoDetails.title}](${musics[i].songInfo.videoDetails.video_url}) | \`${musics[i].user.username}#${musics[i].user.discriminator}\`\n`;
            } else if(i == 1) {
                descriptionText += `**Up Next:**\n${i}) [${musics[i].songInfo.videoDetails.title}](${musics[i].songInfo.videoDetails.video_url}) | \`${musics[i].user.username}#${musics[i].user.discriminator}\`\n`;
            } else {
                descriptionText += `${i}) [${musics[i].songInfo.videoDetails.title}](${musics[i].songInfo.videoDetails.video_url}) | \`${musics[i].user.username}#${musics[i].user.discriminator}\`\n`;
            }

            if ((i % 10 == 0 && i != 0) || i == musics.length - 1) {
                currentPage.setDescription(descriptionText);
                currentPage.addField("\u200B", `Queue loop: ${loopingQueue ? "✅" : "❎"} || Music loop: ${loopingMusic ? "✅" : "❎"}`);

                pages.push(currentPage);

                descriptionText = "";
                currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(`${embedColor}`)
                    .setTitle(`Queue for ${message.guild.name}`)
                    .setThumbnail(`${message.client.user.avatarURL()}`)
            }
        }

        if (pages.length == 1) {
            pages[0].setFooter("Page 1/1");
            
            return message.channel.send(pages[0]).then(msg => {
                setTimeout(() => {
                    if (!msg.deleted) {
                        msg.delete();
                        message.delete();
                    }
                }, 60000);
            });
        } else {
            return pagination(message, pages, ['⏪', '⏩'], 60000).then(msg => {
                setTimeout(() => {
                    if (!msg.deleted) {
                        msg.delete();
                        message.delete();
                    }
                }, 60000);
            });
        }
    }
}