const { MessageEmbed } = require("discord.js");
const { embedColor, prefix } = require("../config.json");

module.exports = {
    name: "status",
    description: "Shows your user stats or the user stats of who you have tagged.",
    aliases: ["userinfo", "user-info"],
    usage: `${prefix}status or ${prefix}status <user mention>`,

    execute(message, args) {
        let user;
        let isHuman = "Human";

        if (args.length) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        if (user.bot)
            isHuman = "Bot";

        const userAvatar = user.avatarURL() != null ? user.avatarURL() : "https://raw.githubusercontent.com/freitagfelipe/package-johnson-discord/main/medias/defaultUserAvatar.png";

        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${user.username}(${isHuman}), stats:`
                )
                .setColor(`${embedColor}`)
                .setThumbnail(`${userAvatar}`)
                .addFields(
                    { name: "Discord tag:", value: `\`${user.username}#${user.discriminator}\``, inline: true },
                    { name: "Discord ID:", value: `\`${user.id}\``, inline: true },
                    { name: "Account created on:", value: `${user.createdAt.toUTCString().split(" ").slice(0, 5).join(" ")}`, inline: true },
                    { name: "Joined on:", value: `${message.guild.members.cache.find(member => member.id === user.id).joinedAt.toUTCString().split(" ").slice(0, 5).join(" ")}`, inline: true }
            )
        ] });
    }
}