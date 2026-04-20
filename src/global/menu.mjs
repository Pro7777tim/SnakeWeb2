import { loadJson } from "../json/loadJson.mjs";
import { Button, ConfirmWindow } from './UI.mjs';
import { isEvent } from "./event/events.mjs";
import { SnowEmitter } from "./event/snowfall.mjs";
import { EasterEmitter } from "./event/easterEmitter.mjs";
import { Skullfall } from "./event/skullfall.mjs";
import { BirthdayEmitter } from './event/birthdayEmitter.mjs';
import { launchEffect } from "./event/physics.mjs";
import { Loading } from "./windows/loading.mjs";
import { SettingsWindow } from "./windows/settings.mjs";

export class menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }

    preload() {
        //LOADING EFFECT
        new Loading(this);
        //----LOAD----
        //BASIC
        this.load.atlas('icons', 'src/img/icons_atlas.png', 'src/img/json/icons_atlas.json');
        this.load.atlas('particles', 'src/img/particles_atlas.png', 'src/img/json/particles_atlas.json');
        this.load.atlas('menu_icon', 'src/img/menu_icon_atlas.png', 'src/img/json/menu_icon_atlas.json');

        this.load.atlas('classic', 'src/img/levels/classic_atlas.png', 'src/img/json/levels/classic_atlas.json');
        this.load.image('rock', 'src/img/levels/rock.png');

        this.load.audio("clasicBg", "src/sound/clasic_bg.mp3");
        this.load.audio("eatSn", "src/sound/eat.mp3");
        this.load.audio("collisionSn", "src/sound/collision.mp3");

        this.load.font('Pixelify Sans', 'src/fonts/Pixelify_Sans/static/PixelifySans-Medium.ttf', 'truetype');
        //EVENTS
        if (isEvent.event == "halloween") {
            this.load.audio("bgHalloweenSong", "src/sound/bg_halloween.mp3");
        } else if (isEvent.event == "kpncaBirthday" || isEvent.event == "pro777Birthday" || isEvent.event == "songBirthday") {
            this.load.audio("bgBirthdaySong", "src/sound/bg_birthday.mp3");
        } else if (isEvent.event == "newYear") {
            this.load.audio("bgNewYearSong", "src/sound/bg_new_year.mp3");
        }
    }

    async create() {
        //GET DATA
        window.gameJson = await loadJson("src/json/game.json");
        if (!sessionStorage.getItem('firstRun')) {
            window.settings.mobileMode = this.sys.game.device.input.touch;
            window.settings.fullScreen = this.scale.isFullscreen;
            sessionStorage.setItem('firstRun', 'true');
        }
        //SNAPSHOOT TEXT
        if (isEvent.snapshotText) {
            gameJson.snapshotText = isEvent.snapshotText;
        }
        //ICON
        let icon;
        if (completeLevels == allLevels) {
            icon = this.add.image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 5.5,
                'icons',
                'snakeVictoriousIcon'
            ).setOrigin(0.5, 0.5)
            .setScale(5.5);
        } else {
            icon = this.add.image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 5.5,
                'icons',
                isEvent.icon
            ).setOrigin(0.5, 0.5)
            .setScale(5.5);
        }
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
            new SnowEmitter(this);
        }
        //EASTER
        if (isEvent.event == "easter") {
            new EasterEmitter(this);
        }
        //HALLOWEEN
        if (isEvent.event == "halloween") {
            this.lights.enable();
            this.lights.addLight(this.cameras.main.width / 2, this.cameras.main.height / 2, 1980, 0xFFFACD, 3);
            this.lights.addLight(this.cameras.main.width / 2.15, this.cameras.main.height / 8, 100, 0xFFFACD, 2);
            new Skullfall(this);
        }
        //BIRTHDAY
        if (isEvent.event == "kpncaBirthday" || isEvent.event == "pro777Birthday" || isEvent.event == "songBirthday" || completeLevels == allLevels) {
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
        //1stAPRIL
        if (isEvent.event == "1stApril") {
            this.cameras.main.setBackgroundColor('#2267b4');
        }
        //----BG SONG----
        if (!window.bgMusic) {
            window.bgMusic = this.sound.add(isEvent.bgSong, {
                loop: true,
                volume: 0.05
            });
            bgMusic.play();
        }
        bgMusic.setMute(!window.settings.music);
        window.settings = new Proxy(window.settings, {
            set(target, property, value) {
                if (property == "music") {
                    bgMusic.setMute(!value);
                }
                target[property] = value;
                return true;
            }
        });
        this.sound.volume = settings.volume / 100;
        //----CREATING OBJECTS----
        //HEAD TEXT
        const headText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2.5, 'Snake Web 2', {
            fontFamily: 'Pixelify Sans',
            fontSize: '100px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 10
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
        const splashText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2.15, 'by Iceberg game studio', {
            fontFamily: 'Pixelify Sans',
            fontSize: '64px',
            color: '#b4e051',
            stroke: '#000',
            strokeThickness: 8
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
        const levelText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 1.8, 'Levels completed: ' + window.completeLevels + " / " + window.allLevels, {
            fontFamily: 'Pixelify Sans',
            fontSize: '84px',
            color: '#ffe561',
            stroke: '#000',
            strokeThickness: 8
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
        const playButton = new Button(this, this.cameras.main.width / 2 - 80, this.cameras.main.height / 1.4, '!playBtn', {
            width: 125,
            height: 125,
            backgroundColor: 0xffe561,
            hoverColor: 0xe1ca56,
            clickColor: 0xc8b34c,
            textStyle: {
                imgScale: 5
            },
            lineStyle: {
                color: 0xb4e051,
                lineWidth: 12
            },
            onClick: () => {
                if (completeLevels == allLevels) {
                    if (levelText.text != "All levels completed!") {
                        levelText.text = "All levels completed!";
                        playButton.list[2].setTexture("menu_icon", "replayBtn");
                        playButton.list[2].setScale(4);
                    } else if (playButton.list[2]) {
                        new ConfirmWindow(this, "Do you want to reset progress?", 1200, (value) => {
                            if (value) {
                                new ConfirmWindow(this, "Are you sure?", 600, (value2) => {
                                    if (value2) {
                                        localStorage.removeItem("local_image");
                                        location.reload();
                                    }
                                })
                            }
                        });
                    }
                }
                this.scene.launch('LevelIntro');
                this.scene.bringToTop('LevelIntro');
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
        //SETTINGS BUTTON
        let settWindow;
        const settingsButton = new Button(this, this.cameras.main.width / 2 + 80, this.cameras.main.height / 1.4, '!settingsBtn', {
            width: 125,
            height: 125,
            backgroundColor: 0xffe561,
            hoverColor: 0xe1ca56,
            clickColor: 0xc8b34c,
            textStyle: {
                imgScale: 6
            },
            lineStyle: {
                color: 0xb4e051,
                lineWidth: 12
            },
            onClick: () => {
                if (!settWindow) {
                    settWindow = new SettingsWindow(this);
                } else {
                    settWindow.list.forEach(child => {
                        this.tweens.add({
                            targets: child,
                            alpha: 1,
                            duration: 300,
                            ease: 'Linear'
                        });
                    });                    
                }
            }
        });
        settingsButton.alpha = 0;
        this.time.delayedCall(2500, () => {
            this.tweens.add({
                targets: settingsButton,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
        }, [], this);
        //SNAPSHOOT SHOW TEXT
        const snapshotShowText = this.add.text(this.cameras.main.width, this.cameras.main.height, 'Snapshot: ' + gameJson.snapshot, {
            fontFamily: 'Pixelify Sans',
            fontSize: '54px',
            color: '#b4e051',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(1, 1);
        snapshotShowText.alpha = 0;
        this.time.delayedCall(3500, () => {
            this.tweens.add({
                targets: snapshotShowText,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
        }, [], this);
        //SNAPSHOOT TEXT
        const snapshotText = this.add.text(0, this.cameras.main.height, gameJson.snapshotText, {
            fontFamily: 'Pixelify Sans',
            fontSize: '54px',
            color: '#ffe561',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0, 1);
        snapshotText.alpha = 0;
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: snapshotText,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
        }, [], this);
        //1stAPRIL
        if (isEvent.event == "1stApril") {
            launchEffect({
                icon,
                headText,
                splashText,
                levelText,
                snapshotText,
                snapshotShowText,
                playButton,
                settingsButton,
                scene: this
            });
        }
        //HALLOWEEN LIGHTS
        if (isEvent.event == "halloween") {
            icon.setPipeline('Light2D');
            headText.setPipeline('Light2D');
            splashText.setPipeline('Light2D');
            levelText.setPipeline('Light2D');
            snapshotText.setPipeline('Light2D');
            snapshotShowText.setPipeline('Light2D');
            playButton.iterate(function(child) {
                child.setPipeline('Light2D');
            });
            settingsButton.iterate(function(child) {
                child.setPipeline('Light2D');
            });
        }
    }
    update() {}
}