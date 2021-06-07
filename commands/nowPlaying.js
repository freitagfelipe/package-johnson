module.exports = {
    name: "now-playing",
    description: "Show information about the song that is currently playing.",
    aliases: ["np", "nowPlaying"],
    usage: ".pj now-playing",

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
            return message.reply("I'm not playing any thing on this server!");
        }

        queue.showNowPlaying(message);
    }
}