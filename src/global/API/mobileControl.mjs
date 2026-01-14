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
        if (scene.sys.game.device.input.touch) {
            const btUp = new Button(scene, x, y - 120, "", {
                width: 100,
                height: 100,
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
                onClick: up
            }).add(
                scene.add.image(
                    0,
                    0,
                    "arrow"
                ).setOrigin(0.5, 0.5)
                .setScale(1.5)
            );
            const btDown = new Button(scene, x, y, "", {
                width: 100,
                height: 100,
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
                onClick: down
            }).add(
                scene.add.image(
                    0,
                    0,
                    "arrow"
                ).setOrigin(0.5, 0.5)
                .setRotation(Math.PI)
                .setScale(1.5)
            );
            const btLeft = new Button(scene, x - 120, y, "", {
                width: 100,
                height: 100,
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
                onClick: left
            }).add(
                scene.add.image(
                    0,
                    0,
                    "arrow"
                ).setOrigin(0.5, 0.5)
                .setRotation(3 * Math.PI / 2)
                .setScale(1.5)
            );
            const btRight = new Button(scene, x + 120, y, "", {
                width: 100,
                height: 100,
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
                onClick: right
            }).add(
                scene.add.image(
                    0,
                    0,
                    "arrow"
                ).setOrigin(0.5, 0.5)
                .setRotation(Math.PI / 2)
                .setScale(1.5)
            );
            btDown.setAlpha(0.5).setDepth(10);
            btUp.setAlpha(0.5).setDepth(10);
            btLeft.setAlpha(0.5).setDepth(10);
            btRight.setAlpha(0.5).setDepth(10);
        }
        scene.add.existing(this);
    }
}