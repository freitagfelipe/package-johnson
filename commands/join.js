module.exports = {
    name: "join",
    description: "Package Johnson will join in your voice channel.",

    execute(message) {
        const userVoiceChannel = message.member.voice.channel;

        if (!userVoiceChannel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (message.guild.me.voice.channel && message.guild.me.voice.channel.name == userVoiceChannel.name) {
            return message.reply("I'm already on the same channel as you!");
        } else if (message.guild.me.voice.channel && !(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("I'm already on another voice channel on this server!");
        }

        userVoiceChannel.join();

        return message.reply("successfully connected");
    }
}