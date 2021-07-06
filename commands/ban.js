const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "ban",
    description: "Ban a user from your discord server.",
    usage: ".pj ban <user mention> or .pj ban <user mention> <reason>",

    execute(message, args) {
        if (args.length == 0) {
            return message.reply("you need to mention the member you want to ban and if you want you can insert the reason!");
        } else if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("you don't have permissions to ban anyone from this server!");
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("the correct usage of this command is .pj ban <user mention> or .pj ban <user mention> <reason>!");
        } else if (member.id == message.author.id) {
            return message.reply("you can't ban yourself!");
        } else if (member.id == message.client.user.id) {
            return message.reply("I can't ban myself!");
        }

        const reason = args.slice(1).join(" ") || "No reason";

        member.ban({ reason: reason }).then(() => {
            message.channel.send(new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(embedColor)
                .setTitle(`${member.user.username} was banned from the server by ${message.author.username}!🔨`)
                .setDescription(`Reason: ${reason}`)
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp()
            );
        }).catch(error => {
            console.log(error);

            return message.reply("I don't have permission to ban this user because his role is higher or equal my role!");
        });
    }
}