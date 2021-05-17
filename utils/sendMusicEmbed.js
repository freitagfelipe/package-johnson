const { MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
module.exports = sendMusicEmbed;

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

function formatMusicTime(musicTime) {
    if (musicTime == "0") {
        return "Live music";
    } else {
        let musicTimeHours = Math.trunc(musicTime / 3600) || "00";
        let musicTimeMinuts = Math.trunc((musicTime - Number(musicTimeHours) * 3600) / 60) || "00";
        let musicTimeSeconds =  Math.trunc(musicTime - (Number(musicTimeHours) * 3600 + Number(musicTimeMinuts) * 60));

        if (musicTimeMinuts < 10 && musicTimeMinuts != "00") {
            musicTimeMinuts = "0" + musicTimeMinuts;
        }
    
        if (musicTimeSeconds < 10 && musicTimeSeconds != "00") {
            musicTimeSeconds = "0" + musicTimeSeconds;
        }

        return `${String(musicTimeHours)}:${musicTimeMinuts}:${musicTimeSeconds}`;
    }
}