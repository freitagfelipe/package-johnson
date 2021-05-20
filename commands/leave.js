module.exports = {
    name: "leave",
    description: "Forces Package Johnson to leave the voice channel.",

    execute(message) {
        const userVoiceChannel = message.member.voice.channel;

        if (!userVoiceChannel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not on your voice channel!");
        } else if (!(message.guild.me.voice.channel.name == userVoiceChannel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        userVoiceChannel.leave();

        return message.reply("successfully disconnected!");
    }
}