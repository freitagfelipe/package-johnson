const client = require("../package-johnson");

module.exports = {
    formatMusicTime(musicTime) {
        if (musicTime == "0") {
            return "Live music";
        } else {
            let musicTimeHours = Math.trunc(musicTime / 3600) || "00";
            let musicTimeMinuts = Math.trunc((musicTime - Number(musicTimeHours) * 3600) / 60) || "00";
            let musicTimeSeconds =  Math.trunc(musicTime - (Number(musicTimeHours) * 3600 + Number(musicTimeMinuts) * 60));

            if (musicTimeMinuts < 10 && musicTimeMinuts != "00") {
                musicTimeMinuts = "0" + musicTimeMinuts;
            }
        
            if (musicTimeSeconds < 10 && musicTimeSeconds != "00") {
                musicTimeSeconds = "0" + musicTimeSeconds;
            }

            return `${String(musicTimeHours)}:${musicTimeMinuts}:${musicTimeSeconds}`;
        }
    },

    getAwakeTime() {
        let upTimeSeconds, days, hours, minutes, seconds

        upTimeSeconds = (client.uptime / 1000);
        days = Math.floor(upTimeSeconds / 86400);
        upTimeSeconds %= 86400;
        hours = Math.floor(upTimeSeconds / 3600);
        upTimeSeconds %= 3600;
        minutes = Math.floor(upTimeSeconds / 60);
        seconds = Math.floor(upTimeSeconds % 60);

        return `${days} days and ${hours}:${minutes}:${seconds}`
    },

    getCurrentInteraction() {
        let hour = new Date().getHours();

        return hour >= 6 && hour <= 12 ? "Say good morning to @Package Johnson!" : hour > 12 && hour <= 18 ? "Say good afternoon to @Package Johnson!" : "Say good night to @Package Johnson!";
    }
}