const Discord = require("discord.js");
const dotenv = require("dotenv");
const fileSystem = require("fs");

const client = new Discord.Client();
const { prefix } = require("./config.json");

dotenv.config();

client.on("ready", () => {
    console.log("I'm Package Johnson and I'm ready!");
    client.user.setActivity("Say hi to @Package Johnson!");

    client.commands = new Discord.Collection();

    const commandFiles = fileSystem.readdirSync("./commands").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
});

client.on("message", message => {
    if(message.author.id != client.user.id && message.content.startsWith(prefix)) {
        console.log(`${message.author.username}: ${message.content}`);

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);

        try {
            command.execute(message, args);
        } catch (error) {
            console.log(error);
            message.reply("An error occurred while trying to execute your command");
        }
    }
});

client.login(process.env.TOKEN);