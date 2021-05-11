const { MessageReaction } = require("discord.js")

module.exports = {
    name: "clear",
    description: "Clear messagens in the channel",

    execute(message, args) {
        if (!args.length || isNaN(args[0]) ||args[0] < 1 || args[0] > 100) {
                return message.reply("you must enter a intenger number greater than 0 and less or equal 100")
        }

        message.channel.bulkDelete(Number(args[0]) + 1)

        return message.channel.send(`The chat had ${args[0]} messages deleted by, <@!${message.author.id}>!`);
    }
}