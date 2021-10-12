module.exports = {
    name: "jump",
    description: "Jump to a specific song in the queue and start playing it.",
    aliases: ["j"],
    usage: ".pj jump <music number>",

    execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel in this server!");
        } else if (!(message.guild.me.voice.channel.name === message.member.voice.channel.name)) {
            return message.reply("We aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.id === message.guild.id);

        if (!queue) {
            return message.reply("I'm not playing anything on this server!");
        } else if (queue.musics.length - 1 < args[0] || args[0] <= 0) {
            return message.reply("There is no music in that position!");
        }

        queue.jump(args[0]);

        return message.channel.send(`Jumped to music \`${args[0]}) ${queue.musics[args[0]].songInfo.videoDetails.title}\`!⤴️`);
    }
}