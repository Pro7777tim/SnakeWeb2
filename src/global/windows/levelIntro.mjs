import { randLevel } from "../levels.mjs";
import { Window } from '../UI.mjs';

export class LevelIntro extends Phaser.Scene {

    constructor() {
        super('LevelIntro');
    }

    create() {
        const scene = this;

        let rLvl = randLevel();
        if (!rLvl) {
            playButton.txt.setText("Game completed");
            return;
        }

        // WINDOW
        const gameWindow = new Window(
            scene,
            scene.cameras.main.width / 2,
            scene.cameras.main.height / 2,
            {
                width: 1000,
                height: 1000,
                backgroundColor: 0xffe561,
                lineStyle: {
                    color: 0xb4e051,
                    lineWidth: 10
                }
            }
        ).setDepth(15);

        gameWindow.alpha = 0;
        scene.tweens.add({
            targets: gameWindow,
            alpha: 1,
            duration: 100,
            ease: 'Linear'
        });

        // NAME TEXT
        const nameText = scene.add.text(0, 0, "Name: " + rLvl.name, {
            fontFamily: 'Pixelify Sans',
            fontSize: '84px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5, 0.5);

        gameWindow.add(nameText);
        nameText.alpha = 0;

        scene.tweens.add({
            targets: nameText,
            alpha: 1,
            duration: 100,
            ease: 'Linear'
        });

        // COMPLEXITY TEXT
        const complexityText = scene.add.text(0, -150, "", {
            fontFamily: 'Pixelify Sans',
            fontSize: '68px',
            color: '#b4e051',
            stroke: '#000',
            strokeThickness: 7
        }).setOrigin(0.5, 0.5);

        gameWindow.add(complexityText);
        complexityText.alpha = 0;

        // MOD TEXT
        const modText = scene.add.text(0, 125, "", {
            fontFamily: 'Pixelify Sans',
            fontSize: '68px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 7
        }).setOrigin(0.5, 0.5);

        gameWindow.add(modText);
        modText.alpha = 0;

        // TARGET TEXT
        const targetText = scene.add.text(0, 350, "", {
            fontFamily: 'Pixelify Sans',
            fontSize: '68px',
            color: '#b4e051',
            stroke: '#000',
            strokeThickness: 7
        }).setOrigin(0.5, 0.5);

        gameWindow.add(targetText);
        targetText.alpha = 0;

        // BAR
        const bar = scene.add.rectangle(-480, -480, 0, 30, 0xb4e051).setOrigin(0, 0);
        gameWindow.add(bar);

        const strokeBar = scene.add.rectangle(-480, -480, 960, 30).setOrigin(0, 0);
        strokeBar.setStrokeStyle(4, 0x000000, 1);
        gameWindow.add(strokeBar);

        bar.alpha = 0;

        scene.tweens.add({
            targets: bar,
            alpha: 1,
            duration: 100,
            ease: 'Linear'
        });

        scene.tweens.add({
            targets: bar,
            width: 960,
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
                };

                scene.cameras.main.fadeOut(300, 0, 0, 0);

                scene.cameras.main.once(
                    Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
                    () => {
                        window.currentLevel = rLvl.key;

                        if (scene.scene.get("level")) {
                            scene.scene.get("level").events.once('destroy', () => {
                                scene.scene.add("level", rLvl.scene);
                                scene.scene.start("level", data);
                            });
                            scene.scene.remove("level");
                        } else {
                            scene.scene.add("level", rLvl.scene);
                            scene.scene.start("level", data);
                        }
                    }
                );
            }
        });

        // EFFECT CHANGE
        const repeating = scene.time.addEvent({
            delay: 100,
            callback: () => {
                rLvl = randLevel(gImage);
                nameText.setText("Name: " + rLvl.name);
            },
            callbackScope: scene,
            loop: true
        });

        scene.time.delayedCall(5000, () => {
            repeating.remove();

            scene.tweens.add({
                targets: nameText,
                y: -380,
                duration: 500,
                ease: 'Quad.InOut',
                onComplete: () => {
                    complexityText.setText("Complexity: " + rLvl.complexity);
                    scene.tweens.add({
                        targets: complexityText,
                        alpha: 1,
                        duration: 300,
                        ease: 'Linear'
                    });

                    scene.time.delayedCall(300, () => {
                        modText.setText("Mod: " + rLvl.mod);
                        scene.tweens.add({
                            targets: modText,
                            alpha: 1,
                            duration: 300,
                            ease: 'Linear'
                        });
                    }, [], scene);

                    scene.time.delayedCall(600, () => {
                        targetText.setText("Target: " + rLvl.target);
                        scene.tweens.add({
                            targets: targetText,
                            alpha: 1,
                            duration: 300,
                            ease: 'Linear'
                        });
                    }, [], scene);
                }
            });
        }, [], scene);
    }
}
