const { prefix } = require("../config.json");

module.exports = {
    name: "greeting message",
    
    execute(message) {
        message.reply(`hiii!!!! If you wanna see my command list just type: "${prefix}commands"!`);
    }
}