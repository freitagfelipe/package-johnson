module.exports = {
    name: "clear",
    description: "Clear messages in the channel.",
    aliases: ["c"],
    usage: ".pj clear <number of messages>",

    async execute(message, args) {
        if (!args.length || isNaN(args[0]) || args[0] < 1 || args[0] > 99) {
            return message.reply("You must enter a intenger number greater than 0 and less than 100!");
        } else if(message.author.bot) {
            return message.reply("You have to be a human to be able to execute this command!");
        } else if(!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("You don't have permission to manage messages!");
        }

        const messageWord = args[0] === 1 ? "message" : "messages";

        args[0]++;

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages, true).then(messageCollection => {
                return message.channel.send(`The chat had ${messageCollection.size - 1} ${messageWord} deleted by <@!${message.author.id}>!🚮${messageCollection.size === parseInt(args[0]) ? "\u200B" : `\n${parseInt(args[0]) - messageCollection.size} messages can't be deleted because they are too old or they don't exist!`}`);
            }).catch(error => {
                console.log(error);

                return message.reply("An error occurred while trying to delete messages!");
            });
        });
    }
}