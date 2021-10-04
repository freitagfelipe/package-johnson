const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");
const { formatMusicTime } = require("../utils/timeUtils");

module.exports = {
    name: "grab-music",
    description: "Send the current music in your private chat.",
    aliases: ["grab"],
    usage: ".pj grab-music",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel in this server!");
        } else if (!(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("We aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.id == message.guild.id);

        if (!queue) {
            return message.reply("I'm not playing anything in this server!");
        }

        const musicTime = formatMusicTime(queue.musics[0].songInfo.videoDetails.lengthSeconds);

        return message.author.send({ embeds: [
            new MessageEmbed()
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
        ] });
    }
}