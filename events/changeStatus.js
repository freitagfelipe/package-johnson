const client = require("../index");
const { prefix } = require("../config.json");
const { getCurrentInteraction, getAwakeTime } = require("../utils/timeUtils");

module.exports = {
    changeStatus() {
        let i = 0;

        setInterval(() => {
            if (i === 8) {
                i = 0;
            }

            const activities = [
                "Say hi to @Package Johnson!",
                `I'm in ${client.guilds.cache.size} servers!`,
                `${getCurrentInteraction()}`,
                `${prefix} commands to see my command list!`,
                `${prefix} playlist to see my favorites lofi!`,
                "Do you know that I'm open source? https://github.com/freitagfelipe/package-johnson-discord",
                `${prefix} help <command name> if you have any questions about a command!`,
                `I've been awake for ${getAwakeTime()}!`,
            ]

            return client.user.setActivity(`${activities[i++]}`);
        }, 10000);
    }
}