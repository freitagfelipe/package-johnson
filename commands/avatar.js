const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Shows your avatar or the avatar of who you have tagged",

    execute(message, args) {
        let user;

        if (args.length > 0) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        const userAvatar = user.avatarURL() != null ? user.avatarURL() : "https://i.imgur.com/7RIdpER.png";
        const userAvatarLink = user.avatarURL() != null ? user.avatarURL() : "";

        const avatarEmbed = new MessageEmbed()
            .setAuthor(
                `${user.username}`,
                `${userAvatar}`
            )
            .setColor("#FFFF00")
            .setTitle("Click to open the avatar in your browser!")
            .setURL(`${userAvatarLink}`)
            .setImage(userAvatar)

        message.reply(avatarEmbed)
    }
}