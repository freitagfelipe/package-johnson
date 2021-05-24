const { MessageEmbed } = require("discord.js");
const pagination = require("discord.js-pagination");

module.exports = {
    async sendQueueEmbed(message, musics, loopingMusic, loopingQueue) {
        const pages = [];

        for (let i = 0; i < Math.ceil(musics.length / 10); i++) {
            const page = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor("#FFFF00")
                    .setTitle("Music queue:")
                    .setThumbnail(`${message.client.user.avatarURL()}`);

            for (let j = 10 * i, number = 1; j < 10 * (i + 1); j++, number++) {
                if (musics[j] == undefined) {
                    break;
                }

                page.addField("\u200B",`${number}) [${musics[j].songInfo.videoDetails.title}](${musics[j].songInfo.videoDetails.video_url})`);
            }
            
            page.addField("\u200B", `Queue loop: ${loopingQueue ? "✅" : "❎"} || Music loop: ${loopingMusic ? "✅" : "❎"}`);

            pages.push(page);
        }

        if (pages.length == 1) {
            return message.channel.send(pages[0]);
        } else {
            return pagination(message, pages, ['⏪', '⏩'], "60000");
        }
    }
}