const { MessageEmbed } = require("discord.js");
const { embedColor, prefix } = require("../config.json");

module.exports = {
    name: "kick",
    description: "Kick a member from your discord server.",
    usage: `${prefix}kick <user mention> or ${prefix}kick <user mention> <reason>`,

    execute(message, args) {
        if (args.length === 0) {
            return message.reply("You need to mention the member that you want to kick and if you want you can insert the reason!");
        } else if (!message.member.permissions.has("KICK_MEMBERS")) {
            return message.reply("You don't have permissions to kick anyone from this server!");
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(`The correct usage of this command is ${prefix}kick <user mention> or ${prefix}kick <user mention> <reason>!`);
        } else if (member.id === message.author.id) {
            return message.reply("You can't kick yourself!");
        } else if (member.id === message.client.user.id) {
            return message.reply("I can't kick myself!");
        }

        const reason = args.slice(1).join(" ") || "no reason";

        member.kick(reason).then(() => {
            return message.channel.send({ embeds: [
                new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTitle(`${member.user.username} was kicked from the server by ${message.author.username}!`)
                    .setDescription(`**Reason: ${reason}**`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .setTimestamp()
            ] });
        }).catch(error => {
            console.log(error);

            return message.reply("I don't have permission to kick this user because his role is higher or equal my role!");
        });
    }
}