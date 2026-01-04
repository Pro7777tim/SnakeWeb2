import { loadJson } from "../json/loadJson.mjs";
import { Button, Window } from './UI.mjs';
import { randLevel } from "./levels.mjs";
import { isEvent } from "./event/events.mjs";
import { SnowEmitter } from "./event/snowfall.mjs";
import { EasterEmitter } from "./event/easterEmitter.mjs";
import { Skullfall } from "./event/skullfall.mjs";
import { BirthdayEmitter } from './event/birthdayEmitter.mjs';

export class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }

    preload() {
        //IMAGE
        this.load.image('snakeIcon', 'src/img/icon.png');
        this.load.image('snakeIconChristmas', 'src/img/iconChristmas.png');
        this.load.image('snakeIconEaster', 'src/img/iconEaster.png');
        this.load.image('snakeIconHalloween', 'src/img/iconHalloween.png');
        this.load.image('snakeIconBirthdayKpnca', 'src/img/iconBirthdayKpnca.png');
        this.load.image('snowflakes', 'src/img/snowflakes.png');
        this.load.image('flowers', 'src/img/flowers.png');
        this.load.image('skull', 'src/img/skull.png');
        //SONG
        this.load.audio("bgHalloweenSong", "src/song/bg_halloween.mp3");
        this.load.audio("bgBirthdaySong", "src/song/bg_birthday.mp3");
        //FONTS
        this.load.font('Pixelify Sans', 'src/fonts/Pixelify_Sans/static/PixelifySans-Medium.ttf', 'truetype');
    }

    async create() {
        //GET DATA
        const gameJson = await loadJson("src/json/game.json");
        //ICON
        const icon = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 6,
            isEvent.icon
        ).setOrigin(0.5, 0.5)
        .setScale(4);
        icon.alpha = 0;
        this.tweens.add({
            targets: icon,
            alpha: 1,
            duration: 1000,
            ease: 'Linear'
        });
        //----EVENTS----
        //SNOWFALL
        if (isEvent.event == "newYear") {
            const snowfall = new SnowEmitter(this);
        }
        //EASTER
        if (isEvent.event == "easter") {
            const easterEmitter = new EasterEmitter(this);
        }
        //HALLOWEEN
        if (isEvent.event == "halloween") {
            this.lights.enable();
            this.lights.addLight(this.cameras.main.width / 2, this.cameras.main.height / 2, 800, 0xFFFACD, 3);
            this.lights.addLight(this.cameras.main.width / 2.25, this.cameras.main.height / 8, 100, 0xFFFACD, 2);
            const skullfall = new Skullfall(this);
        }
        //KPNCA BIRTHDAY
        if (isEvent.event == "kpncaBirthday") {
            const confetti = new BirthdayEmitter(this);
            this.input.on('pointerdown', pointer => {
                confetti.shoot(pointer.worldX, pointer.worldY, 50);
            });
            const autoShoot = this.time.addEvent({
                delay: 1000,
                callback: () => {
                    const p = this.input.activePointer;
                    confetti.shoot(p.worldX, p.worldY, 50);
                },
                callbackScope: this,
                loop: true
            });
        }
        //----BG SONG----
        if (!isEvent.bgSong) {
            //in future
        } else {
            const bgMusic = this.sound.add(isEvent.bgSong, {
                loop: true,
                volume: 0.05
            });
            bgMusic.play();
        }
        //----CREATING OBJECTS----
        //HEAD TEXT
        const headText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 3, 'Snake Web 2', {
            fontFamily: 'Pixelify Sans',
            fontSize: '76px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5, 0.5);
        headText.alpha = 0;
        this.time.delayedCall(500, () => {
            this.tweens.add({
                targets: headText,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
        }, [], this);
        //SPLASH TEXT
        const splashText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2.5, 'by Iceberg game studio', {
            fontFamily: 'Pixelify Sans',
            fontSize: '46px',
            color: '#b4e051',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5, 0.5);
        splashText.alpha = 0;
        this.time.delayedCall(1000, () => {
            this.tweens.add({
                targets: splashText,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
        }, [], this);
        //LEVEL TEXT
        const levelText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Levels completed: ' + window.completeLevels + " / " + window.allLevels, {
            fontFamily: 'Pixelify Sans',
            fontSize: '52px',
            color: '#ffe561',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5, 0.5);
        levelText.alpha = 0;
        this.time.delayedCall(1500, () => {
            this.tweens.add({
                targets: levelText,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
        }, [], this);
        //PLAY BUTTON
        const playButton = new Button(this, this.cameras.main.width / 2, this.cameras.main.height / 1.5, 'Start game', {
            width: 500,
            height: 80,
            backgroundColor: 0xffe561,
            hoverColor: 0xe1ca56,
            clickColor: 0xc8b34c,
            textStyle: {
                fontFamily: 'Pixelify Sans',
                fontSize: '56px',
                color: '#b4e051',
                stroke: '#000',
                strokeThickness: 6
            },
            lineStyle: {
                color: 0xb4e051,
                lineWidth: 8
            },
            onClick: () => {
                let rLvl = randLevel();
                if (!rLvl) {
                    playButton.txt.setText("Game completed");
                    return;
                }
                //WINDOW
                const gameWindow = new Window(this, this.cameras.main.width / 2, this.cameras.main.height / 2, {
                    width: 600,
                    height: 600,
                    backgroundColor: 0xffe561,
                    lineStyle: {
                        color: 0xb4e051,
                        lineWidth: 8
                    }
                });
                gameWindow.alpha = 0;
                this.tweens.add({
                    targets: gameWindow,
                    alpha: 1,
                    duration: 100,
                    ease: 'Linear'
                });
                //NAME TEXT
                const nameText = this.add.text(0, 0, "Name: " + rLvl.name, {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '52px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 6
                }).setOrigin(0.5, 0.5);
                gameWindow.add(nameText);
                nameText.alpha = 0;
                this.tweens.add({
                    targets: nameText,
                    alpha: 1,
                    duration: 100,
                    ease: 'Linear'
                });
                //COMPLEXITY TEXT
                const complexityText = this.add.text(0, -75, "", {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '46px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 5
                }).setOrigin(0.5, 0.5);
                gameWindow.add(complexityText);
                complexityText.alpha = 0;
                //MOD TEXT
                const modText = this.add.text(0, 75, "", {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '46px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 5
                }).setOrigin(0.5, 0.5);
                gameWindow.add(modText);
                modText.alpha = 0;
                //TARGET TEXT
                const targetText = this.add.text(0, 225, "", {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '46px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 5
                }).setOrigin(0.5, 0.5);
                gameWindow.add(targetText);
                targetText.alpha = 0;
                //BAR
                const bar = this.add.rectangle(-280, -270, 0, 20, 0xb4e051).setOrigin(0, 0.5);
                gameWindow.add(bar);
                const strokeBar = this.add.rectangle(-280, -270, 560, 20).setOrigin(0, 0.5);
                strokeBar.setStrokeStyle(3, 0x000000, 1);
                gameWindow.add(strokeBar);
                bar.alpha = 0;
                this.tweens.add({
                    targets: bar,
                    alpha: 1,
                    duration: 100,
                    ease: 'Linear'
                });
                this.tweens.add({
                    targets: bar,
                    width: 560,
                    duration: 10000,
                    ease: 'Linear',
                    onComplete: () => {
                        const data = {
                            initLevel: (th, config) => {
                                th.scene.launch('BackgSc', config);
                                th.scene.bringToTop('BackgSc');
                                th.cameras.main.setBackgroundColor(0xffffff);
                                th.cameras.main.fadeIn(300, 0, 0, 0);
                            }
                        }
                        this.cameras.main.fadeOut(300, 0, 0, 0);
                        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                            window.currentLevel = rLvl.key;
                            if (this.scene.get("level")) {
                                this.scene.get("level").events.once('destroy', () => {
                                    this.scene.add("level", rLvl.scene);
                                    this.scene.start("level", data);
                                });
                                this.scene.remove("level");
                            } else {
                                this.scene.add("level", rLvl.scene);
                                this.scene.start("level", data);
                            }
                        });
                    }
                });
                //EFFECT CHANGE
                const repeating = this.time.addEvent({
                    delay: 100,
                    callback: () => {
                        rLvl = randLevel(gImage);
                        nameText.setText("Name: " + rLvl.name);
                    },
                    callbackScope: this,
                    loop: true
                });
                this.time.delayedCall(5000, () => {
                    repeating.remove();
                    this.tweens.add({
                        targets: nameText,
                        y: -225,
                        duration: 500,
                        ease: 'Quad.InOut',
                        onComplete: () => {
                            //COMPLEXITY TEXT TWEEN
                            complexityText.setText("Complexity: " + rLvl.complexity);
                            this.tweens.add({
                                targets: complexityText,
                                alpha: 1,
                                duration: 300,
                                ease: 'Linear'
                            });
                            //MOD TEXT TWEEN
                            this.time.delayedCall(300, () => {
                                modText.setText("Mod: " + rLvl.mod);
                                this.tweens.add({
                                    targets: modText,
                                    alpha: 1,
                                    duration: 300,
                                    ease: 'Linear'
                                });
                            }, [], this);
                            //TARGET TEXT TWEEN
                            this.time.delayedCall(600, () => {
                                targetText.setText("Target: " + rLvl.target);
                                this.tweens.add({
                                    targets: targetText,
                                    alpha: 1,
                                    duration: 300,
                                    ease: 'Linear'
                                });
                            }, [], this);
                        }
                    });
                }, [], this);
            }
        });
        playButton.alpha = 0;
        this.time.delayedCall(2000, () => {
            this.tweens.add({
                targets: playButton,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
        }, [], this);
        //SNAPSHOOT TEXT
        const snapshotText = this.add.text(this.cameras.main.width, this.cameras.main.height, 'Snapshot: ' + gameJson.snapshot, {
            fontFamily: 'Pixelify Sans',
            fontSize: '36px',
            color: '#ffe561',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(1, 1);
        snapshotText.alpha = 0;
        this.time.delayedCall(2500, () => {
            this.tweens.add({
                targets: snapshotText,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
        }, [], this);
        //HALLOWEEN LIGHTS
        if (isEvent.event == "halloween") {
            icon.setPipeline('Light2D');
            headText.setPipeline('Light2D');
            splashText.setPipeline('Light2D');
            levelText.setPipeline('Light2D');
            snapshotText.setPipeline('Light2D');
            playButton.iterate(function(child) {
                child.setPipeline('Light2D');
            });
        }
    }
    update() {}
}