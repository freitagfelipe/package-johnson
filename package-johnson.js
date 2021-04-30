const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");

dotenv.config();

client.on("ready", () => {
    console.log("I'm Package Johnson and I'm ready!");
});

client.login(process.env.TOKEN);