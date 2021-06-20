module.exports = {
    name: "volume",
    description: "Shows the current volume level or changes volume to a provided value.",
    aliases: ["vol", "v"],
    usage: ".pj volume or .pj volume <volume number>",

    execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel in this server!");
        } else if (!(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (!queue) {
            return message.reply("I'm not playing anything on this server!");
        } else if (!args[0]) {
            return message.channel.send(`The current volume is ${queue.volume}!${queue.volume > 50 ? "🔊" : "🔉"}`);
        } else if (parseFloat(args[0]) > 100 || parseFloat(args[0]) < 1) {
            return message.reply("invalid volume level, pick a number between 1 and 100!");
        }

        const wichEmoji = queue.volume < args[0] ? "🔊" : "🔉";

        queue.setVolume(parseFloat(args[0]));
        
        return message.channel.send(`The volume is now ${args[0]}!${wichEmoji}`);
    }
}