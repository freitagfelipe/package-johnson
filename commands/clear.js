module.exports = {
    name: "clear",
    description: "Clear messagens in the channel",
    aliases: ["c"],
    usage: ".pj clear <number of messages>",

    async execute(message, args) {
        if (!args.length || isNaN(args[0]) ||args[0] < 1 || args[0] > 99) {
            return message.reply("you must enter a intenger number greater than 0 and less than 100!");
        } else if(message.author.bot) {
            return message.reply("you have to be a human to be able to execute this command!");
        } else if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("you must have permission to execute this command!");
        }

        const messageWord = args[0] == 1 ? "message" : "messages";

        args[0]++;

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages, true).then(messageCollection => {
                return message.channel.send(`The chat had ${messageCollection.size - 1} ${messageWord} deleted by <@!${message.author.id}>!🚮`);
            }).catch(error => {
                console.log(error);

                return message.reply("an error occurred while trying to delete messages");
            });
        });
    }
}