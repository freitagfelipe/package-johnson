const ytdl = require("ytdl-core");
const { MessageEmbed } = require("discord.js");
const formatMusicTime = require("./formatTime");

async function sendMusicEmbed(message, args) {
    const musicInfo = await ytdl.getInfo(args);
    const musicTime = formatMusicTime(Number(musicInfo.videoDetails.lengthSeconds));

    message.channel.send(new MessageEmbed()
        .setAuthor(
            `${message.client.user.username}`,
            `${message.client.user.displayAvatarURL()}`
        )
        .setColor("#FFFF00")
        .setTitle(`Music name: ${musicInfo.videoDetails.title}`)
        .setURL(`${musicInfo.videoDetails.video_url}`)
        .addFields(
            { name: "Channel Name:", value: `[${musicInfo.videoDetails.author.name}](${musicInfo.videoDetails.author.user_url})`, inline: true },
            { name: "Duration time:", value: `\`${musicTime}\``, inline: true },
            { name: "Requested by:", value: `\`${message.author.username}#${message.author.discriminator}\``, inline: true}
        )
        .setThumbnail(musicInfo.videoDetails.thumbnails[0].url)
        .setTimestamp()
    );
}

module.exports = sendMusicEmbed;