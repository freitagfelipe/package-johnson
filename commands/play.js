const ytdl = require("ytdl-core");
const yts = require("yt-search");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    description: "Play a song in your voice channel",

    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        const PJPermissions = voiceChannel.permissionsFor(message.client.user);
        let song;

        if (!(args.length > 0)) {
            return message.reply("you need to insert a music name or a music link!")
        } else if (!voiceChannel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (!PJPermissions.has("CONNECT")) {
            return message.reply("I don't have permissions to connect to the voice channel!");
        } else if (!PJPermissions.has("SPEAK")) {
            return message.reply("I don't have permissions to speak in the channel!")
        } else if (ytdl.validateURL(args[0])) {
            song = args[0];
        } else {
            const { videos } = await yts(args.join(" "));

            if (!videos.length) {
                return message.reply("no songs ware found! Please try again.");
            }

            song = videos[0].url;
        }

        sendMusicEmbed(message, song);

        let connection

        try {
            connection = await voiceChannel.join();
        } catch (error) {
            console.log(`There was an error connecting to the voice channel: ${error}`);
            return message.reply("there was an error connecting to the voice channel!");
        }

        connection.play(ytdl(song, { quality: "highestaudio"}))
            .on("finish", () => {
                voiceChannel.leave();
            })
            .on("error", error => {
                console.log(error);
            })
    }
}

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
    let musicTimeHours = Math.trunc(musicTime / 3600) || "00";
    let musicTimeMinuts = Math.trunc((musicTime - Number(musicTimeHours) * 3600) / 60) || "00";
    let musicTimeSeconds =  Math.trunc(musicTime - (Number(musicTimeHours) * 3600 + Number(musicTimeMinuts) * 60));

    if (musicTimeMinuts < 10 && musicTimeMinuts != "00") {
        musicTimeMinuts = "0" + musicTimeMinuts;
    }

    if (musicTimeSeconds < 10 && musicTimeSeconds != "00") {
        musicTimeSeconds = "0" + musicTimeSeconds;
    }

    return (Number(musicTimeHours) > 0 || Number(musicTimeMinuts) > 0 || Number(musicTimeSeconds) > 0) ? `${String(musicTimeHours)}:${musicTimeMinuts}:${musicTimeSeconds}` : `Live music`;
}