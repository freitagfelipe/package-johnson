module.exports = {
    name: "remove",
    description: "Removes the selected song from the queue.",
    aliases: ["delete", "del", "rm"],
    usage: ".pj remove <music number>",

    execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not on any voice channel on this server!");
        } else if (!(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (!queue) {
            return message.reply("I'm not playing any thing on this server!");
        } else if (queue.musics.length - 1 < args[0] || args[0] <= 0) {
            return message.reply("there is no music in that position!");
        }

        message.channel.send(`Successfully removed music \`${queue.musics[args[0]].songInfo.videoDetails.title}\`!🗑️`);

        queue.removeMusic(args[0]);
    }
}