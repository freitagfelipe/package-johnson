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
    client.interactions = new Discord.Collection();

    const commandFiles = fileSystem.readdirSync("./commands").filter(file => file.endsWith(".js"));
    const interactionFiles = fileSystem.readdirSync("./interactions").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    for (const file of interactionFiles) {
        const interaction = require(`./interactions/${file}`);
        client.interactions.set(interaction.name, interaction);
    }
});

client.on('guildCreate', guild => {
    guild.roles.create({
        data: {
            name: "Package Johnson",
            color: "#FFFF00"
        }
    }).then(role => {
        guild.member(client.user).roles.add(role)
        role.setHoist(true);
    });
});

client.on("message", message => {
    if (message.author.id != client.user.id && message.content.startsWith(prefix)) {
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

    } else if(message.author.id != client.user.id && message.mentions.users.first() && message.mentions.users.first().id == client.user.id) {
        console.log(`${message.author.username}: ${message.content}`);

        let interactionName;

        if (message.content.toLowerCase().startsWith("hi")) {
            interactionName = "greeting message";
        } else if (message.content.toLowerCase("good morning")) {
            interactionName = "good morning";
        }

        const interaction = client.interactions.get(interactionName);

        try {
            interaction.execute(message);
        } catch (error) {
            console.log(error);
        }
    }
});

client.login(process.env.TOKEN);