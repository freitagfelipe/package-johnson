const { MessageEmbed } = require("discord.js");
const formatMusicTime = require("./formatTime");
const { embedColor } = require("../config.json");

module.exports = {
    sendMusicEmbed(message, musics, songInfo) {
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
            .setFooter(`• Posição na fila: ${musics.length} || `)
            .setTimestamp()
        );
    }
}