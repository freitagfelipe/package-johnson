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
    }
}