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

        if (days < 10) {
            days = "0" + days;
        }

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return `${days} days and ${hours}:${minutes}:${seconds}`
    },

    getCurrentInteraction() {
        let hour = new Date().getHours();

        return hour >= 6 && hour <= 12 ? "Say good morning to @Package Johnson!" : hour > 12 && hour <= 18 ? "Say good afternoon to @Package Johnson!" : "Say good night to @Package Johnson!";
    },

    getFortniteTrackerTime(totalMinutesPlayed) {
        let timeInSeconds = totalMinutesPlayed * 60, days, hours, minutes;

        days = Math.floor(timeInSeconds / 86400);
        timeInSeconds %= 86400;
        hours = Math.floor(timeInSeconds / 3600);
        timeInSeconds %= 3600;
        minutes = Math.floor(timeInSeconds / 60);

        if (days < 10) {
            days = "0" + days;
        }

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return `${days}D ${hours}:${minutes}`;
    }
}