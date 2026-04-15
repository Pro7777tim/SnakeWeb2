import { Window, Checkbox, Slider} from "../UI.mjs";
import { setSettings } from "../settings.mjs";
export class SettingsWindow extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        //WINDOW
        const windowObj = new Window(
            scene,
            scene.cameras.main.width / 2,
            scene.cameras.main.height / 2,
            {
                width: 1800,
                height: 1000,
                backgroundColor: 0xffe561,
                lineStyle: {
                    color: 0xb4e051,
                    lineWidth: 12
                }
            }
        );
        this.add(windowObj);
        windowObj.alpha = 0;
        scene.tweens.add({
            targets: windowObj,
            alpha: 1,
            duration: 300,
            ease: 'Linear'
        });

        //CROSS
        const crossBtn = scene.add.image(
            840,
            -440,
            "crossBtn"
        ).setOrigin(0.5, 0.5)
        .setScale(6)
        .setInteractive({ useHandCursor: true })
        .on('pointerup', () => {
            crossBtn.setTint(0xffffff);
            scene.tweens.add({
                targets: windowObj,
                alpha: 0,
                duration: 300,
                ease: 'Linear'
            });
        })
        .on('pointerdown', () => {
            crossBtn.setTint(0x999999);
        })
        .on('pointerover', () => {
            crossBtn.setTint(0xcccccc);
        })
        .on('pointerout', () => {
            crossBtn.setTint(0xffffff);
        });
        windowObj.add(crossBtn);

        //TIPS
        const tipText = scene.add.text(-880, 480, '* green settings are not saved', {
            fontFamily: 'Pixelify Sans',
            fontSize: '48px',
            color: '#b4e051',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0, 1);
        const tip2Text = scene.add.text(-125, 480, '* red settings require a reboot', {
            fontFamily: 'Pixelify Sans',
            fontSize: '48px',
            color: '#dd4141',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0, 1);
        windowObj.add([tipText, tip2Text]);

        //SETTINGS
        const musicCheckbox = new Checkbox(
            scene,
            -800,
            -400,
            'Music',
            settings.music,
            value => setSettings("music", value),
            {
                size: 120,
                backgroundColor: 0xffe561,
                borderColor: 0xb4e051,
                borderWidth: 8,
                iconKey: 'apple',
                iconScale: 2.5,
                spacing: 80,
                textStyle: {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '64px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 8
                },
                lineWidth: 12
            }
        );

        const soundCheckbox = new Checkbox(
            scene,
            -800,
            -250,
            'Sound',
            settings.sound,
            value => setSettings("sound", value),
            {
                size: 120,
                backgroundColor: 0xffe561,
                borderColor: 0xb4e051,
                borderWidth: 8,
                iconKey: 'apple',
                iconScale: 2.5,
                spacing: 80,
                textStyle: {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '64px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 8
                },
                lineWidth: 12
            }
        );

        const eventCheckbox = new Checkbox(
            scene,
            -800,
            -100,
            'Events',
            settings.events,
            value => setSettings("events", value),
            {
                size: 120,
                backgroundColor: 0xffe561,
                borderColor: 0xb4e051,
                borderWidth: 8,
                iconKey: 'apple',
                iconScale: 2.5,
                spacing: 80,
                textStyle: {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '64px',
                    color: '#dd4141',
                    stroke: '#000',
                    strokeThickness: 8
                },
                lineWidth: 12
            }
        );

        const modileModeCheckbox = new Checkbox(
            scene,
            -800,
            50,
            'Mobile\nmode',
            settings.mobileMode,
            (value) => {settings.mobileMode = value},
            {
                size: 120,
                backgroundColor: 0xffe561,
                borderColor: 0xb4e051,
                borderWidth: 8,
                iconKey: 'apple',
                iconScale: 2.5,
                spacing: 80,
                textStyle: {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '64px',
                    color: '#b4e051',
                    stroke: '#000',
                    strokeThickness: 8
                },
                lineWidth: 12
            }
        );

        const levelIntroCheckbox = new Checkbox(
            scene,
            -350,
            -400,
            'Level intro',
            settings.levelIntro,
            value => setSettings("levelIntro", value),
            {
                size: 120,
                backgroundColor: 0xffe561,
                borderColor: 0xb4e051,
                borderWidth: 8,
                iconKey: 'apple',
                iconScale: 2.5,
                spacing: 80,
                textStyle: {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '64px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 8
                },
                lineWidth: 12
            }
        );

        const showTimeAndScoreCheckbox = new Checkbox(
            scene,
            -350,
            -250,
            'Show time\nand score',
            settings.showTimeAndScore,
            value => setSettings("showTimeAndScore", value),
            {
                size: 120,
                backgroundColor: 0xffe561,
                borderColor: 0xb4e051,
                borderWidth: 8,
                iconKey: 'apple',
                iconScale: 2.5,
                spacing: 80,
                textStyle: {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '64px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 8
                },
                lineWidth: 12
            }
        );

        const fpsIndicatorCheckbox = new Checkbox(
            scene,
            -350,
            -100,
            'Show fps\nindicator',
            settings.showFpsIndicator,
            value => setSettings("showFpsIndicator", value),
            {
                size: 120,
                backgroundColor: 0xffe561,
                borderColor: 0xb4e051,
                borderWidth: 8,
                iconKey: 'apple',
                iconScale: 2.5,
                spacing: 80,
                textStyle: {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '64px',
                    color: '#fff',
                    stroke: '#000',
                    strokeThickness: 8
                },
                lineWidth: 12
            }
        );

        const volumeSlider = new Slider(
            scene,
            -800,
            350,
            11,
            settings.volume / 10,
            (val) => {
                scene.sound.volume = val / 10;
                setSettings("volume", val * 10);
            },
            {
                headKey: 'head',
                bodyKey: 'body',
                spacing: 52,
                scale: 4
            },
            "Volume",
            {
                fontFamily: 'Pixelify Sans',
                fontSize: '64px',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 8
            }
        );

        if (gameJson.showFullScreenButton) {
            const fullScreenCheckbox = new Checkbox(
                scene,
                -350,
                50,
                'FullScreen',
                settings.fullScreen,
                (value) => {
                    if (value) {
                        scene.scale.startFullscreen();
                    } else {
                        scene.scale.stopFullscreen();
                    }
                    settings.fullScreen = value;
                },
                {
                    size: 120,
                    backgroundColor: 0xffe561,
                    borderColor: 0xb4e051,
                    borderWidth: 8,
                    iconKey: 'apple',
                    iconScale: 2.5,
                    spacing: 80,
                    textStyle: {
                        fontFamily: 'Pixelify Sans',
                        fontSize: '64px',
                        color: '#b4e051',
                        stroke: '#000',
                        strokeThickness: 8
                    },
                    lineWidth: 12
                }
            );
            windowObj.add(fullScreenCheckbox);
        }

        windowObj.add([
            musicCheckbox,
            soundCheckbox,
            eventCheckbox,
            modileModeCheckbox,
            showTimeAndScoreCheckbox,
            fpsIndicatorCheckbox,
            levelIntroCheckbox,
            volumeSlider
        ]);

        scene.add.existing(this);
    }
}