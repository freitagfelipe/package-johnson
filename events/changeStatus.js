const client = require("../package-johnson");

module.exports = {
    changeStatus() {
        let hour = "";

        setInterval(() => {
            hour = new Date().getHours();
        }, 80000);

        const activities = [
            "Say hi to @Package Johnson!",
            `I'm in ${client.guilds.cache.size} servers!`,
            `${hour >= 6 && hour <= 12 ? "Say good morning to @Package Johnson!" : hour > 12 && hour <= 18 ? "Say good afternoon to @Package Johnson!" : "Say good night to @Package Johnson!"}`,
            ".pj commands to see my command list!",
            ".pj playlist to see my favorites lofi!",
            "Do you know that I am open source?https://github.com/freitagfelipe/package-johnson-discord",
            ".pj help if you have any questions about a command!"
        ]

        let i = 0;

        setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`), 30000);
    }
}