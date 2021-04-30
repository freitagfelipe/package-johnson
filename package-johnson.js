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
    }
});

client.login(process.env.TOKEN);