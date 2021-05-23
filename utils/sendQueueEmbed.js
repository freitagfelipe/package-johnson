const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const pagination = require("discord.js-pagination");

module.exports = {
    async sendQueueEmbed(message, queue) {
        const pages = [];

        for (let i = 0; i < Math.ceil(queue.musics.length / 10); i++) {
            const page = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor("#FFFF00")
                    .setTitle("Music queue:")
                    .setThumbnail(`${message.client.user.avatarURL()}`);
                    

            for (let j = 10 * i, number = 1; j < 10 * (i + 1); j++, number++) {
                if (queue.musics[j] == undefined) {
                    break;
                }

                const musicInfo = await ytdl.getInfo(queue.musics[j].songURL);

                page.addField("\u200B",`${number}) [${musicInfo.videoDetails.title}](${musicInfo.videoDetails.video_url})`);
            }
            
            page.addField("\u200B", `Queue loop: ${queue.loopingQueue ? "✔️" : "❌"} || Music loop: ${queue.loopingMusic ? "✔️" : "❌"}`);

            pages.push(page);
        }

        if (pages.length == 1) {
            return message.channel.send(pages[0]);
        } else {
            return pagination(message, pages, ['⏪', '⏩'], "60000");
        }
    }
}