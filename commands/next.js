module.exports = {
    name: "next",
    description: "Skin to the next song.",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not on any voice channel on this server!");
        } else if (!(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (!queue.playing) {
            return message.reply("I'm not playing any thing on this server!");
        }

        if (queue.musics.length == 1) {
            message.reply("there was no music to skip!");
        } else {
            queue.next(true);

            return message.reply("**Skipped!⏭️**");
        }
    }
}