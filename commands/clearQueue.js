module.exports = {
    name: "clear-queue",
    description: "Clear the server music queue.",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not on any voice channel on this server!");
        } else if (!(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (queue.musics.length < 2) {
            return message.reply("your queue doesn't have enough music to clean!");
        }

        queue.clearQueue();

        return message.reply("**cleaned your queue!**");
    }
}