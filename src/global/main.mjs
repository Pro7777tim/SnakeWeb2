import { menu } from "./menu.mjs";
import { BackgroundScene } from "./backgSc.mjs";
import { LevelIntro } from "./windows/levelIntro.mjs";

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1980,
    height: 1080,
    backgroundColor: "#fff",
    disableContextMenu: true,
    pixelArt: true,
    scene: [ menu, BackgroundScene, LevelIntro ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    }
};

window.game = new Phaser.Game(config);