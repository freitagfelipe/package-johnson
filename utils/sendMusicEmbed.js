const ytdl = require("ytdl-core");
const { MessageEmbed } = require("discord.js");
const formatMusicTime = require("./formatTime");

async function sendMusicEmbed(message, musics) {
    const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);
    const newMusicIndex = musics.length - 1;

    const musicInfo = await ytdl.getInfo(musics[newMusicIndex].songURL);
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
        .setFooter(`• Posição na fila: ${queue.musics.length} || `)
        .setTimestamp()
    );
}

module.exports = sendMusicEmbed;