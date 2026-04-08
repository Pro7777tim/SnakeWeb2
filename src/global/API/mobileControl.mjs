import { Button } from "../UI.mjs";

export class ClassicControl extends Phaser.GameObjects.Container {
    constructor(scene, x, y, func) {
        super(scene, x, y);
        const {
            up = function () {},
            down = function () {},
            left = function () {},
            right = function () {}
        } = func;
        if (settings.mobileMode) {
            const btUp = new Button(scene, x, y - 120, "!arrow", {
                width: 100,
                height: 100,
                backgroundColor: 0xffe561,
                hoverColor: 0xe1ca56,
                clickColor: 0xc8b34c,
                textStyle: {
                    imgScale: 1.5
                },
                lineStyle: {
                    color: 0xb4e051,
                    lineWidth: 8
                },
                onClick: up
            });
            const btDown = new Button(scene, x, y, "!arrow", {
                width: 100,
                height: 100,
                backgroundColor: 0xffe561,
                hoverColor: 0xe1ca56,
                clickColor: 0xc8b34c,
                textStyle: {
                    imgScale: 1.5,
                    imgRotation: Math.PI
                },
                lineStyle: {
                    color: 0xb4e051,
                    lineWidth: 8
                },
                onClick: down
            });
            const btLeft = new Button(scene, x - 120, y, "!arrow", {
                width: 100,
                height: 100,
                backgroundColor: 0xffe561,
                hoverColor: 0xe1ca56,
                clickColor: 0xc8b34c,
                textStyle: {
                    imgScale: 1.5,
                    imgRotation: 3 * Math.PI / 2
                },
                lineStyle: {
                    color: 0xb4e051,
                    lineWidth: 8
                },
                onClick: left
            });
            const btRight = new Button(scene, x + 120, y, "!arrow", {
                width: 100,
                height: 100,
                backgroundColor: 0xffe561,
                hoverColor: 0xe1ca56,
                clickColor: 0xc8b34c,
                textStyle: {
                    imgScale: 1.5,
                    imgRotation: Math.PI / 2
                },
                lineStyle: {
                    color: 0xb4e051,
                    lineWidth: 8
                },
                onClick: right
            });
            btDown.setAlpha(0.5).setDepth(10);
            btUp.setAlpha(0.5).setDepth(10);
            btLeft.setAlpha(0.5).setDepth(10);
            btRight.setAlpha(0.5).setDepth(10);
        }
        scene.add.existing(this);
    }
}