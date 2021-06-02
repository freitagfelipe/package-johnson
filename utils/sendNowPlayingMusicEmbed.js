const { MessageEmbed } = require("discord.js");

const { formatMusicTime } = require("./timeUtils");
const { embedColor } = require("../config.json");

module.exports = {
    sendNowPlayingMusicEmbed(message, music, dispatcher) {
        const musicTime = formatMusicTime(Number(music.songInfo.videoDetails.lengthSeconds));
        const currentTime = formatMusicTime(dispatcher.streamTime / 1000);
        const percentTime = Math.floor(30 * ((dispatcher.streamTime / 1000) / Number(music.songInfo.videoDetails.lengthSeconds)));
        let timeBar = "";

        for (let i = 0; i < 30; i++) {
            if (i == percentTime) {
                timeBar += "🔘";
            } else {
                timeBar += "▬";
            }
        }

        return message.channel.send(new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setTitle(`Music name: ${music.songInfo.videoDetails.title}`)
            .setURL(`${music.songInfo.videoDetails.video_url}`)
            .addFields(
                { name: "Channel Name:", value: `[${music.songInfo.videoDetails.author.name}](${music.songInfo.videoDetails.author.user_url})`, inline: true},
                { name: "Requested by:", value: `\`${message.author.username}#${message.author.discriminator}\``, inline: true},
                { name: "\u200B", value: `\`${timeBar}\``},
                { name: "Current time:", value: `\`${currentTime} / ${musicTime}\``},
            )
            .setThumbnail(music.songInfo.videoDetails.thumbnails[0].url)
            .setTimestamp()
        );
    }
}