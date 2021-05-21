module.exports = {
    name: "resume",
    description: "continues playing the song that is paused.",

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
        } else if (queue.playing) {
            return message.reply("I'm already playing a song!");
        }

        message.reply("**your music has been resumed!⏯️**");

        queue.resume();
    }
}