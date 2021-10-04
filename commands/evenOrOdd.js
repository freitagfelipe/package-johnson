const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "even-or-odd",
    description: "Package Johnson will play even or odd with you.",
    aliases: ["eo", "evenorodd"],
    usage: ".pj even-or-odd <even or odd> <number>",

    execute(message, args) {
        if (args.length < 2 || (args[0] !== "even" && args[0] !== "odd") || isNaN(args[1])) {
            return message.reply("The correct usage of this command is .pj even-or-odd <even or odd> <number>!");
        }

        const packageNumber = Math.floor(Math.random() * 11);
        let winnerName, winnerAvatar;

        if (args[0] === "even") {
            winnerName = (packageNumber + parseInt(args[1])) % 2 === 0 ? `${message.author.username}` : `${message.client.user.username}`;
            winnerAvatar = (packageNumber + parseInt(args[1])) % 2 === 0 ? `${message.author.displayAvatarURL()}` : `${message.client.user.displayAvatarURL()}`;
        } else {
            winnerName = (packageNumber + parseInt(args[1])) % 2 !== 0 ? `${message.author.username}` : `${message.client.user.username}`;
            winnerAvatar = (packageNumber + parseInt(args[1])) % 2 !== 0 ? `${message.author.displayAvatarURL()}` : `${message.client.user.displayAvatarURL()}`;
        }

        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(embedColor)
                .setTitle(`${winnerName} won this match!`)
                .addFields(
                    { name: `${message.author.username} played:`, value: `${args[0]} and choose the number ${args[1]}!`},
                    { name: "Package Johnson played:", value: `${args[0] === "even" ? "odd" : "even"} and choose the number ${packageNumber}!`}
                )
                .setThumbnail(`${winnerAvatar}`)
                .setTimestamp()
        ] });
    }
}