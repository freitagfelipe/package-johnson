const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "kick",
    description: "Kick a member from your discord server.",
    usage: ".pj kick <user mention> or .pj kick <user mention> <reason>",

    execute(message, args) {
        if (args.length == 0) {
            return message.reply("you need to mention the member you want to kick and if you want you can insert the reason!");
        } else if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("you don't have permissions to kick anyone from this server!");
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("the correct usage of this command is .pj kick <user mention> or .pj kick <user mention> <reason>!");
        } else if (member.id == message.author.id) {
            return message.reply("you can't kick yourself!");
        }

        const reason = args.slice(1).join(" ") || "no reason";

        try {
            member.kick(reason).then(() => {
                message.channel.send(new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTitle(`${member.user.username} was kicked from the server by ${message.author.username}!`)
                    .setDescription(`**Reason: ${reason}**`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setTimestamp()
                )
            });
        } catch(error) {
            return message.reply(`I don't have permission to kick ${member.user.username} because her role is higher than mine!`);
        }
    }
}