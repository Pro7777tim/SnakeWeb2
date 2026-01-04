//----FUNCTIONS----
//CHRISTMAS
function isChristmasPeriod(date = new Date()) {
    const md = (date.getMonth() + 1) * 100 + date.getDate();
    return (md >= 1220 || md <= 110);
}
//EASTER
function easterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day, 12);
}
function isEaster(date = new Date()) {
    const easter = easterDate(date.getFullYear());
    return (
        date.getDate() === easter.getDate() &&
        date.getMonth() === easter.getMonth()
    );
}
//HALLOWEEN
function isHalloweenWeek(date = new Date()) {
    return date.getMonth() === 9 && date.getDate() >= 25 && date.getDate() <= 31;
}
//KPNCA BIRTHDAY
function isDecember8(date = new Date()) {
    return date.getMonth() === 11 && date.getDate() === 8;
}
//PRO777 BIRTHDAY
function isFebruary6(date = new Date()) {
    return date.getMonth() === 1 && date.getDate() === 6;
}
//SONG BIRTHDAY
function isJuly23(date = new Date()) {
    return date.getMonth() === 6 && date.getDate() === 23;
}
//----EVENT----
//VARIABLES
window.date = new Date();
const nowIsChristmasPeriod = isChristmasPeriod(window.date);
const nowIsEaster = isEaster(window.date);
const nowIsHalloweenWeek = isHalloweenWeek(window.date);
const nowIsKpncaBirthday = isDecember8(window.date);
const nowIsPro777Birthday = isFebruary6(window.date);
const nowIsSongBirthday = isJuly23(window.date);
//DATA
const isEvent = {
    icon: "snakeIcon",
    event: false,
    bgSong: false,
    snapshotText: false
};
if (nowIsChristmasPeriod) {
    isEvent.event = "newYear";
    isEvent.icon = "snakeIconChristmas";
    isEvent.snapshotText = "Merry Christmas!";
} else if (nowIsEaster) {
    isEvent.event = "easter";
    isEvent.icon = "snakeIconEaster";
    isEvent.snapshotText = "Christ is risen!";
} else if (nowIsHalloweenWeek) {
    isEvent.event = "halloween";
    isEvent.icon = "snakeIconHalloween";
    isEvent.bgSong = "bgHalloweenSong";
    isEvent.snapshotText = "Booooo!";
} else if (nowIsKpncaBirthday) {
    isEvent.event = "kpncaBirthday";
    isEvent.icon = "snakeIconBirthdayKpnca";
    isEvent.bgSong = "bgBirthdaySong";
    isEvent.snapshotText = "Happy birthday KPNCA!";
} else if (nowIsPro777Birthday) {
    isEvent.event = "pro777Birthday";
    isEvent.icon = "snakeIconBirthday";
    isEvent.bgSong = "bgBirthdaySong";
    isEvent.snapshotText = "Happy birthday Pro777!";
} else if (nowIsSongBirthday) {
    isEvent.event = "songBirthday";
    isEvent.icon = "snakeIconBirthday";
    isEvent.bgSong = "bgBirthdaySong";
    isEvent.snapshotText = "Happy birthday Song!";
}
export { isEvent };
