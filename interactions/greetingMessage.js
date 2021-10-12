const { prefix } = require("../config.json");

module.exports = {
    name: "hi",
    
    execute(message) {
        message.reply(`Hiii!!!! If you wanna see my command list just type: "${prefix}commands"!`);
    }
}