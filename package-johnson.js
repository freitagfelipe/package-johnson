const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");

dotenv.config();

client.on("ready", () => {
    console.log("I'm Package Johnson and I'm ready!");
    client.user.setActivity("Say hi to @Package Johnson!");
});

client.on("message", message => {
    if(message.author.id != "836491530394533908") {
        console.log(`${message.author.username}: ${message.content}`);

        if(message.content.toLowerCase() == "hi <@!836491530394533908>" && message.mentions.users.first().id == "836491530394533908")
            greetingMessage(message);
    }
});

function greetingMessage(message) {
    message.reply('hiii!!!! If you wanna see my command list just type: "!pj commands".');
}

client.login(process.env.TOKEN);