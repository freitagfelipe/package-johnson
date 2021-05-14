const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "status",
    description: "Show user stats",

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

        const userAvatar = user.avatarURL() != null ? user.avatarURL() : "https://i.imgur.com/KkXOUN1.png";

        return message.channel.send(new MessageEmbed()
            .setAuthor(
                `${user.username}(${isHuman}), stats:`
            )
            .setColor("#FFFF00")
            .setThumbnail(`${userAvatar}`)
            .addFields(
                { name: "Discord tag:", value: `\`${user.username}#${user.discriminator}\``, inline: true },
                { name: "Discord ID:", value: `\`${user.id}\``, inline: true },
                { name: "Account created on:", value: `${user.createdAt.toUTCString().split(" ").slice(0, 5).join(" ")}`, inline: true },
                { name: "Joined on:", value: `${message.guild.members.cache.find(member => member.id == user.id).joinedAt.toUTCString().split(" ").slice(0, 5).join(" ")}`, inline: true}
            )
        );
    }
}