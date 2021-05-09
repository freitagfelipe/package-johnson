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

        const avatarEmbed = new MessageEmbed()
            .setAuthor(
                `${user.username}`,
                `${user.avatarURL()}`
            )
            .setColor("#FFFF00")
            .setTitle("Click to open the avatar in your browser!")
            .setURL(`${user.avatarURL()}`)
            .setImage(user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))

        message.reply(avatarEmbed)
    }
}