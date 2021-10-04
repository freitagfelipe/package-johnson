const client = require("../package-johnson");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "help",
    description: "Teaches you how to use a command.",
    aliases: ["h"],
    usage: ".pj help <command name>",

    execute(message, args) {
        if (args.length === 0) {
            return message.reply("You need to insert the command name to get help!");
        }

        const command = client.commands.get(args[0]) || client.commands.find(command => command.aliases && command.aliases.includes(args[0]));

        if (!command) {
            return message.reply(`I couldn't find the command ${args[0]}! If you want to see a complete list of my commands type \`.pj commands\`!`);
        }

        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${client.user.username}`,
                    `${client.user.displayAvatarURL()}`
                )
                .setColor(embedColor)
                .setTitle(`I'll help you with \`${command.name}\`!`)
                .addFields(
                    { name: `${command.aliases.length < 2 ? "Aliase" : "Aliases"}:`, value: `\`${command.aliases ? command.aliases.join(", ") : "This command doesn't have aliases!"}\``},
                    { name: "Description:", value: `\`${command.description}\``},
                    { name: "Usage:", value: `\`${command.usage}\``}
                )
                .setThumbnail(`${client.user.displayAvatarURL()}`)
                .setTimestamp()
        ] });
    }
}