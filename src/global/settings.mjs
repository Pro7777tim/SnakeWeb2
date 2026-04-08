//GENERAL IMAGE
const gsettings = {
    music: true,
    sound: true,
    events: true,
    levelIntro: true,
    showTimeAndScore: true,
    volume: 100
}
//LOCAL IMAGE
window.settings = localStorage.getItem("settings");
if (settings) {
    settings = JSON.parse(settings);
} else {
    settings = gsettings;
}
//FUNCTIONS
export function setSettings(key, value) {
    settings[key] = value;
    localStorage.setItem("settings", JSON.stringify(settings));
}