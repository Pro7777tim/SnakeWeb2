import { Button, Window } from "../UI.mjs";
import { updateLevelComplete } from "../levels.mjs";

export class DefeatWindow extends Phaser.GameObjects.Container {
    constructor(scene, config = {}, showDataConfig = {}) {
        super(scene);
        const { 
            textDefeat = "You lost!",
            subText = "The snake crashed"
        } = config;
        const { 
            shTime = true,
            shScore = true
        } = showDataConfig;
        let nextY = 290;
        scene.scene.stop("BackgSc");
        const windowObj = new Window(
            scene,
            scene.cameras.main.width / 2,
            scene.cameras.main.height / 2,
            {
                width: 1000,
                height: 1000,
                backgroundColor: 0xffe561,
                lineStyle: {
                    color: 0xb4e051,
                    lineWidth: 8
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
        //HEAD TEXT
        const headText = scene.add.text(0, -290, textDefeat, {
            fontFamily: 'Pixelify Sans',
            fontSize: '84px',
            color: '#dd4141',
            stroke: '#000',
            strokeThickness: 10
        }).setOrigin(0.5, 1);
        windowObj.add(headText); 
        headText.alpha = 0;
        scene.tweens.add({
            targets: headText,
            alpha: 1,
            duration: 300,
            ease: 'Linear'
        });
        //SUB TEXT
        const subTextObj = scene.add.text(0, -250, subText, {
            fontFamily: 'Pixelify Sans',
            fontSize: '68px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);
        windowObj.add(subTextObj); 
        subTextObj.alpha = 0;
        scene.time.delayedCall(500, () => {
            scene.tweens.add({
                targets: subTextObj,
                alpha: 1,
                duration: 300,
                ease: 'Linear'
            });
        });
        //TIME TEXT
        if (shTime) {
            const timeTextObj = scene.add.text(0, nextY, "Time: " + scene.registry.get('time') + "sec", {
                fontFamily: 'Pixelify Sans',
                fontSize: '64px',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 8
            }).setOrigin(0.5);
            windowObj.add(timeTextObj); 
            timeTextObj.alpha = 0;
            scene.time.delayedCall(2000, () => {
                scene.tweens.add({
                    targets: timeTextObj,
                    alpha: 1,
                    duration: 300,
                    ease: 'Linear'
                });
            });
            nextY += 80;
        }
        //SCORE TEXT
        if (shScore) {
            const scoreTextObj = scene.add.text(0, nextY, "Score: " + scene.registry.get('score'), {
                fontFamily: 'Pixelify Sans',
                fontSize: '64px',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 8
            }).setOrigin(0.5);
            windowObj.add(scoreTextObj); 
            scoreTextObj.alpha = 0;
            let time = 2500;
            if (!shTime) {
                time = 2000;
            }
            scene.time.delayedCall(time, () => {
                scene.tweens.add({
                    targets: scoreTextObj,
                    alpha: 1,
                    duration: 300,
                    ease: 'Linear'
                });
            });
        }
        //RESTART BUTTON
        const restartButton = new Button(scene, 0, 0, 'Restart game', {
            width: 600,
            height: 120,
            backgroundColor: 0xffe561,
            hoverColor: 0xe1ca56,
            clickColor: 0xc8b34c,
            textStyle: {
                fontFamily: 'Pixelify Sans',
                fontSize: '68px',
                color: '#b4e051',
                stroke: '#000',
                strokeThickness: 8
            },
            lineStyle: {
                color: 0xb4e051,
                lineWidth: 8
            },
            onClick: () => {
                scene.scene.restart();
            }
        });
        windowObj.add(restartButton);
        restartButton.alpha = 0;
        scene.time.delayedCall(1000, () => {
            scene.tweens.add({
                targets: restartButton,
                alpha: 1,
                duration: 300,
                ease: 'Linear'
            });
        }, [], scene);
        //EXIT BUTTON
        const exitButton = new Button(scene, 0, 140, 'Exit', {
            width: 400,
            height: 120,
            backgroundColor: 0xffe561,
            hoverColor: 0xe1ca56,
            clickColor: 0xc8b34c,
            textStyle: {
                fontFamily: 'Pixelify Sans',
                fontSize: '72px',
                color: '#b4e051',
                stroke: '#000',
                strokeThickness: 8
            },
            lineStyle: {
                color: 0xb4e051,
                lineWidth: 8
            },
            onClick: () => {
                scene.cameras.main.fadeOut(300, 0, 0, 0);
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    scene.scene.start('menu');
                });
            }
        });
        windowObj.add(exitButton);
        exitButton.alpha = 0;
        scene.time.delayedCall(1500, () => {
            scene.tweens.add({
                targets: exitButton,
                alpha: 1,
                duration: 300,
                ease: 'Linear'
            });
        }, [], scene);
        this.setDepth(12);
        scene.add.existing(this);
    }
}

export class WinWindow extends Phaser.GameObjects.Container {
    constructor(scene, config = {}, showDataConfig = {}) {
        super(scene);
        const { 
            textWin = "You win!",
            subText = "The snake is full"
        } = config;
        const { 
            shTime = true,
            shScore = true
        } = showDataConfig;
        let nextY = 200;
        scene.scene.stop("BackgSc");
        updateLevelComplete(window.currentLevel);
        const windowObj = new Window(
            scene,
            scene.cameras.main.width / 2,
            scene.cameras.main.height / 2,
            {
                width: 1000,
                height: 1000,
                backgroundColor: 0xffe561,
                lineStyle: {
                    color: 0xb4e051,
                    lineWidth: 8
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
        //HEAD TEXT
        const headText = scene.add.text(0, -290, textWin, {
            fontFamily: 'Pixelify Sans',
            fontSize: '84px',
            color: '#80c67c',
            stroke: '#000',
            strokeThickness: 10
        }).setOrigin(0.5, 1);
        windowObj.add(headText); 
        headText.alpha = 0;
        scene.tweens.add({
            targets: headText,
            alpha: 1,
            duration: 300,
            ease: 'Linear'
        });
        //SUB TEXT
        const subTextObj = scene.add.text(0, -250, subText, {
            fontFamily: 'Pixelify Sans',
            fontSize: '68px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);
        windowObj.add(subTextObj); 
        subTextObj.alpha = 0;
        scene.time.delayedCall(500, () => {
            scene.tweens.add({
                targets: subTextObj,
                alpha: 1,
                duration: 300,
                ease: 'Linear'
            });
        });
        //TIME TEXT
        if (shTime) {
            const timeTextObj = scene.add.text(0, nextY, "Time: " + scene.registry.get('time') + "sec", {
                fontFamily: 'Pixelify Sans',
                fontSize: '64px',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 8
            }).setOrigin(0.5);
            windowObj.add(timeTextObj); 
            timeTextObj.alpha = 0;
            scene.time.delayedCall(1500, () => {
                scene.tweens.add({
                    targets: timeTextObj,
                    alpha: 1,
                    duration: 300,
                    ease: 'Linear'
                });
            });
            nextY += 80;
        }
        //SCORE TEXT
        if (shScore) {
            const scoreTextObj = scene.add.text(0, nextY, "Score: " + scene.registry.get('score'), {
                fontFamily: 'Pixelify Sans',
                fontSize: '64px',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 8
            }).setOrigin(0.5);
            windowObj.add(scoreTextObj); 
            scoreTextObj.alpha = 0;
            let time = 2000;
            if (!shTime) {
                time = 1500;
            }
            scene.time.delayedCall(time, () => {
                scene.tweens.add({
                    targets: scoreTextObj,
                    alpha: 1,
                    duration: 300,
                    ease: 'Linear'
                });
            });
        }
        //EXIT BUTTON
        const exitButton = new Button(scene, 0, 0, 'Exit', {
            width: 400,
            height: 120,
            backgroundColor: 0xffe561,
            hoverColor: 0xe1ca56,
            clickColor: 0xc8b34c,
            textStyle: {
                fontFamily: 'Pixelify Sans',
                fontSize: '72px',
                color: '#b4e051',
                stroke: '#000',
                strokeThickness: 8
            },
            lineStyle: {
                color: 0xb4e051,
                lineWidth: 8
            },
            onClick: () => {
                scene.cameras.main.fadeOut(300, 0, 0, 0);
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    scene.scene.start('menu');
                });
            }
        });
        windowObj.add(exitButton);
        exitButton.alpha = 0;
        scene.time.delayedCall(1000, () => {
            scene.tweens.add({
                targets: exitButton,
                alpha: 1,
                duration: 300,
                ease: 'Linear'
            });
        }, [], scene);
        this.setDepth(12);
        scene.add.existing(this);
    }
}