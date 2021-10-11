const paginationEmbed = require("@freitagfelipe/discord.js-pagination");
const { MessageEmbed } = require("discord.js");
const { formatMusicTime } = require("./timeUtils");
const { embedColor } = require("../config.json");

module.exports = {
    sendNowPlayingMusicEmbed(message, music, player) {
        const musicTime = formatMusicTime(Number(music.songInfo.videoDetails.lengthSeconds));
        const currentTime = formatMusicTime(player.state.playbackDuration / 1000);
        const percentTime = Math.floor(30 * ((player.state.playbackDuration / 1000) / Number(music.songInfo.videoDetails.lengthSeconds)));
        let timeBar = "\u200B";

        if (musicTime !== "Live music") {
            for (let i = 0; i < 30; i++) {
                if (i === percentTime) {
                    timeBar += "🔘";
                } else {
                    timeBar += "▬";
                }
            }
        }

        const nowPlayingEmbed = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setTitle(`Music name: ${music.songInfo.videoDetails.title}`)
            .setURL(`${music.songInfo.videoDetails.video_url}`)
            .addFields(
                { name: "Channel Name:", value: `[${music.songInfo.videoDetails.author.name}](${music.songInfo.videoDetails.author.user_url})`, inline: true },
                { name: "Requested by:", value: `\`${message.author.username}#${message.author.discriminator}\``, inline: true },
                { name: "Current time:", value: `\`${currentTime} / ${musicTime}\`` },
            )
            .setThumbnail(music.songInfo.videoDetails.thumbnails[0].url)
            .setTimestamp();
        
        if (musicTime !== "Live music") {
            nowPlayingEmbed.addField("\u200B", `\`${timeBar}\``);
        }

        return message.channel.send({ embeds: [nowPlayingEmbed] });
    },

    async sendQueueEmbed(message, musics, loopingMusic, loopingQueue) {
        let currentPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setTitle(`Queue for ${message.guild.name}`)
            .setThumbnail(`${message.client.user.avatarURL()}`);
        const pages = [];
        const endPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setDescription("**Timeout!⌛**");

        for (let i = 0; i < musics.length; i++) {
            const durationTime = formatMusicTime(musics[i].songInfo.videoDetails.lengthSeconds);

            if (i === 0) {
                currentPage.addField("Now Playing:", `[${musics[i].songInfo.videoDetails.title}](${musics[i].songInfo.videoDetails.video_url}) | \`${durationTime} Requested by: ${musics[i].user.username}#${musics[i].user.discriminator}\`\n`);
            } else if(i === 1) {
                currentPage.addField("Up Next:", `\`${i})\` [${musics[i].songInfo.videoDetails.title}](${musics[i].songInfo.videoDetails.video_url}) | \`Requested by: ${musics[i].user.username}#${musics[i].user.discriminator}\`\n`);
            } else {
                currentPage.addField("\u200B", `\`${i})\` [${musics[i].songInfo.videoDetails.title}](${musics[i].songInfo.videoDetails.video_url}) | \`Requested by: ${musics[i].user.username}#${musics[i].user.discriminator}\`\n`);
            }

            if ((i % 10 === 0 && i !== 0) || i === musics.length - 1) {
                currentPage.addField("\u200B", `Queue loop: ${loopingQueue ? "✅" : "❎"} || Music loop: ${loopingMusic ? "✅" : "❎"}`);
                pages.push(currentPage);

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

        return paginationEmbed(message, pages, 60000, ['⏪', '⏩'], false, endPage);
    },

    sendMusicEmbed(message, musics, songInfo, wichPlay) {
        const musicTime = formatMusicTime(Number(songInfo.videoDetails.lengthSeconds));

        message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(`${embedColor}`)
                .setTitle(`Music name: ${songInfo.videoDetails.title}`)
                .setURL(`${songInfo.videoDetails.video_url}`)
                .addFields(
                    { name: "Channel Name:", value: `[${songInfo.videoDetails.author.name}](${songInfo.videoDetails.author.user_url})`, inline: true },
                    { name: "Duration time:", value: `\`${musicTime}\``, inline: true },
                    { name: "Requested by:", value: `\`${message.author.username}#${message.author.discriminator}\``, inline: true }
                )
                .setThumbnail(songInfo.videoDetails.thumbnails[0].url)
                .setFooter(`• Queue position: ${musics.length - 1 === 0 || wichPlay === 2 ? "now playing" : wichPlay === 1 ? "1" : musics.length - 1} || `)
                .setTimestamp()
        ] });
    }
}