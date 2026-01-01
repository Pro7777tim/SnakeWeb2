//FUNCTIONS
function isChristmasPeriod(date = new Date()) {
    const md = (date.getMonth() + 1) * 100 + date.getDate();
    return (md >= 1220 || md <= 110);
}
//EVENT
const nowIsChristmasPeriod = isChristmasPeriod();
const isEvent = {
    icon: "snakeIcon",
    event: false
};
if (nowIsChristmasPeriod) {
    isEvent.icon = "snakeIconChristmas";
    isEvent.event = "newYear";
}
export { isEvent };
