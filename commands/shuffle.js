module.exports = {
    name: "shuffle-queue",
    description: "Shuffle your current queue.",
    aliases: ["random", "shuffle", "random-queue"],
    usage: ".pj shuffle-queue",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be in a voice channel to execute this command!");
        } else if (message.guild.me.voice.channel && !(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (!queue) {
            return message.reply("I'm not playing anything in this server!");
        } else if (queue.musics.length < 2) {
            return message.reply("you need to have at least three songs in your queue to execute this command!");
        }

        queue.shuffleQueue();

        return message.channel.send("Shuffled your queue!🔀");
    }
}