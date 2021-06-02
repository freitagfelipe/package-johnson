const { MessageEmbed } = require("discord.js");
const { formatMusicTime } = require("./timeUtils");
const { embedColor } = require("../config.json");

module.exports = {
    sendMusicEmbed(message, musics, songInfo, wichPlay) {
        const musicTime = formatMusicTime(Number(songInfo.videoDetails.lengthSeconds));

        message.channel.send(new MessageEmbed()
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
                { name: "Requested by:", value: `\`${message.author.username}#${message.author.discriminator}\``, inline: true}
            )
            .setThumbnail(songInfo.videoDetails.thumbnails[0].url)
            .setFooter(`• Queue position: ${musics.length - 1 == 0 || wichPlay == 2 ? "now playing" : wichPlay == 1 ? "1" : musics.length - 1} || `)
            .setTimestamp()
        );
    }
}