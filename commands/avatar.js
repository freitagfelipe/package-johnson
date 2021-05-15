const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Shows your avatar or the avatar of who you have tagged",

    execute(message, args) {
        let user;

        if (args.length) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        const userAvatar = user.avatarURL() != null ? user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }) : "https://i.imgur.com/KkXOUN1.png";
        const userAvatarLink = user.avatarURL() != null ? user.avatarURL() : "";
        const avatarTitle = user.avatarURL() != null ? "Click to open the avatar in your browser!" : "User doesn't have a profile photo!";

        return message.channel.send(new MessageEmbed()
            .setAuthor(
                `${user.username}`,
                `${userAvatar}`
            )
            .setColor("#FFFF00")
            .setTitle(`${avatarTitle}`)
            .setURL(`${userAvatarLink}`)
            .setImage(userAvatar)
        );
    }
}