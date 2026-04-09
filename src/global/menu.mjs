import { loadJson } from "../json/loadJson.mjs";
import { Button } from './UI.mjs';
import { isEvent } from "./event/events.mjs";
import { SnowEmitter } from "./event/snowfall.mjs";
import { EasterEmitter } from "./event/easterEmitter.mjs";
import { Skullfall } from "./event/skullfall.mjs";
import { BirthdayEmitter } from './event/birthdayEmitter.mjs';
import { makePhysics } from "./event/physics.mjs";
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
        this.load.image('snakeIcon', 'src/img/icon.png');
        this.load.image('arrow', 'src/img/arrow.png');
        this.load.image('playBtn', 'src/img/playBtn.png');
        this.load.image('settingsBtn', 'src/img/settingsBtn.png');
        this.load.image('replayBtn', 'src/img/replayBtn.png');
        this.load.image('exitBtn', 'src/img/exitBtn.png');
        this.load.image('crossBtn', 'src/img/crossBtn.png');
        this.load.image('apple', 'src/img/apple.png');
        this.load.image('head', 'src/img/head.png');
        this.load.image('body', 'src/img/body.png');
        this.load.audio("clasicBg", "src/song/clasic_bg.mp3");
        //EVENTS
        if (isEvent.event == "halloween") {
            this.load.image('skull', 'src/img/skull.png');
            this.load.image('snakeIconHalloween', 'src/img/iconHalloween.png');
            this.load.audio("bgHalloweenSong", "src/song/bg_halloween.mp3");
        } else if (isEvent.event == "kpncaBirthday" || isEvent.event == "pro777Birthday" || isEvent.event == "songBirthday") {
            this.load.image('snakeIconBirthdayKpnca', 'src/img/iconBirthdayKpnca.png');
            this.load.image('snakeIconBirthday', 'src/img/iconBirthday.png');
            this.load.audio("bgBirthdaySong", "src/song/bg_birthday.mp3");
        } else if (isEvent.event == "newYear") {
            this.load.image('snowflakes', 'src/img/snowflakes.png');
            this.load.image('snakeIconChristmas', 'src/img/iconChristmas.png');
            this.load.audio("bgNewYearSong", "src/song/bg_new_year.mp3");
        } else if (isEvent.event == "easter") {
            this.load.image('flowers', 'src/img/flowers.png');
            this.load.image('snakeIconEaster', 'src/img/iconEaster.png');
        }
        this.load.font('Pixelify Sans', 'src/fonts/Pixelify_Sans/static/PixelifySans-Medium.ttf', 'truetype');
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
        const icon = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 5.5,
            isEvent.icon
        ).setOrigin(0.5, 0.5)
        .setScale(5.5);
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
        if (isEvent.event == "kpncaBirthday" || isEvent.event == "pro777Birthday" || isEvent.event == "songBirthday") {
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
                this.scene.launch('LevelIntro');
                this.scene.bringToTop('LevelIntro');
                this.scene.pause();
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
            icon.setBlendMode(Phaser.BlendModes.SCREEN);
            headText.setBlendMode(Phaser.BlendModes.SCREEN);
            splashText.setBlendMode(Phaser.BlendModes.SCREEN);
            levelText.setBlendMode(Phaser.BlendModes.SCREEN);
            snapshotText.setBlendMode(Phaser.BlendModes.SCREEN);
            snapshotShowText.setBlendMode(Phaser.BlendModes.SCREEN);
            makePhysics(icon, this);
            makePhysics(headText, this);
            makePhysics(splashText, this);
            makePhysics(levelText, this);
            makePhysics(snapshotText, this);
            makePhysics(snapshotShowText, this);
            playButton.iterate((child) => {
                child.setBlendMode(Phaser.BlendModes.SCREEN);
            });
            settingsButton.iterate((child) => {
                child.setBlendMode(Phaser.BlendModes.SCREEN);
            });
            this.physics.add.existing(playButton);
            playButton.body.setCollideWorldBounds(true);
            playButton.body.setBounce(0.6);
            playButton.body.setMass(Math.random() * 5);
            playButton.body.setVelocity(
                Phaser.Math.Between(-200, 200),
                Phaser.Math.Between(-200, 0)
            );
            this.physics.add.existing(settingsButton);
            settingsButton.body.setCollideWorldBounds(true);
            settingsButton.body.setBounce(0.6);
            settingsButton.body.setMass(Math.random() * 5);
            settingsButton.body.setVelocity(
                Phaser.Math.Between(-200, 200),
                Phaser.Math.Between(-200, 0)
            );
            this.input.on('pointerdown', (pointer) => {
                [
                    icon,
                    headText,
                    splashText,
                    levelText,
                    snapshotText,
                    snapshotShowText
                ].forEach(obj => {
                    this.physics.add.existing(obj);
                    const dx = obj.x - pointer.x;
                    const dy = obj.y - pointer.y;
                    const force = 1;
                    obj.body.setVelocity(dx * force, dy * force);
                });
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