import { menu } from "./menu.mjs";
import { BackgroundScene } from "./backgSc.mjs";
import { LevelIntro } from "./windows/levelIntro.mjs";
import { isEvent } from "./event/events.mjs";

let bg = "#fff";
if (isEvent.event == "halloween") {
    bg = "#000";
}

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1980,
    height: 1080,
    backgroundColor: bg,
    disableContextMenu: true,
    pixelArt: true,
    scene: [ menu, BackgroundScene, LevelIntro ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};

window.game = new Phaser.Game(config);