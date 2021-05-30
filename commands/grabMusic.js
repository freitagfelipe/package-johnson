const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");
const { formatMusicTime } = require("../utils/formatTime");

module.exports = {
    name: "grab",
    description: "Send the current music in your private chat.",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not on any voice channel on this server!");
        } else if (!(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (!queue) {
            return message.reply("I'm not playing anything on this server!");
        }

        const musicTime = formatMusicTime(queue.musics[0].songInfo.videoDetails.lengthSeconds);

        return message.author.send(new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setTitle(`Music name: ${queue.musics[0].songInfo.videoDetails.title}`)
            .setURL(`${queue.musics[0].songInfo.videoDetails.video_url}`)
            .setColor(embedColor)
            .setThumbnail(`${queue.musics[0].songInfo.videoDetails.thumbnails[0].url}`)
            .addFields(
                { name: "Channel Name:", value: `[${queue.musics[0].songInfo.videoDetails.author.name}](${queue.musics[0].songInfo.videoDetails.author.user_url})`, inline: true },
                { name: "Duration time:", value: `\`${musicTime}\``, inline: true }
            )
            .setFooter("• Enjoy! || ")
            .setTimestamp()
        )
    }
}