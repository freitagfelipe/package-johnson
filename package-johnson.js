const Discord = require("discord.js");
const dotenv = require("dotenv");
const fileSystem = require("fs");
const { measureMemory } = require("vm");

const client = new Discord.Client();
const { prefix } = require("./config.json");

dotenv.config();

client.on("ready", () => {
    console.log("I'm Package Johnson and I'm ready!");
    client.user.setActivity("Say hi to @Package Johnson!");

    client.commands = new Discord.Collection();
    client.interations = new Discord.Collection();

    const commandFiles = fileSystem.readdirSync("./commands").filter(file => file.endsWith(".js"));
    const interationFiles = fileSystem.readdirSync("./interations").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    for (const file of interationFiles) {
        const interation = require(`./interations/${file}`);
        client.interations.set(interation.name, interation);
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

    } else if(message.author.id != client.user.id && message.mentions.users.array().length > 0 && message.mentions.users.first().id == client.user.id) {
        console.log(`${message.author.username}: ${message.content}`);

        let interationName;

        if(message.content.toLowerCase().startsWith("hi")) {
            interationName = "greeting message";
        }

        const interation = client.interations.get(interationName);

        try {
            interation.execute(message);
        } catch (error) {
            console.log(error);
        }
    }
});

client.login(process.env.TOKEN);