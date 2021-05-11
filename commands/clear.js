module.exports = {
    name: "clear",
    description: "Clear messagens in the channel",

    execute(message, args) {
        if (!args.length || isNaN(args[0]) ||args[0] < 1 || args[0] > 100) {
            return message.reply("you must enter a intenger number greater than 0 and less or equal 100!");
        } else if(message.author.bot) {
            return message.reply("you have to be a human to be able to execute this command!");
        } else if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("you must have permission to execute this command!");
        }

        const messageWord = args[0] == 1 ? "message" : "messages";

        message.channel.bulkDelete(Number(args[0]) + 1)

        return message.channel.send(`The chat had ${args[0]} ${messageWord} deleted by <@!${message.author.id}>!`);
    }
}