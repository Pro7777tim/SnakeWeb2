export class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, label, config = {}) {
        super(scene, x, y);
        const { 
            width = 150, height = 50, 
            backgroundColor = 0xffe561,
            hoverColor = 0xe1ca56,
            clickColor = 0xc8b34c,
            textStyle = { fontSize: '20px', color: '#ffffff' },
            lineStyle = {color: 0x000000, lineWidth: 2},
            onClick = () => {}
        } = config;
        const bg = scene.add.rectangle(0, 0, width, height, backgroundColor);
        bg.setOrigin(0.5);
        const graphics = scene.add.graphics();
        graphics.lineStyle(lineStyle.lineWidth, lineStyle.color, 1);
        graphics.strokeRect(-width/2, -height/2, width, height);
        graphics.lineStyle(lineStyle.lineWidth/2, 0x000000, 1);
        graphics.strokeRect(-width/2-lineStyle.lineWidth/2, -height/2-lineStyle.lineWidth/2, width+lineStyle.lineWidth, height+lineStyle.lineWidth);
        const txt = scene.add.text(0, 0, label, textStyle);
        txt.setOrigin(0.5);
        this.add(bg);
        this.add(txt);
        this.txt = txt;
        this.add(graphics);
        bg.setInteractive();
        bg.on('pointerdown', () => {
            bg.setFillStyle(clickColor);
        });
        bg.on('pointerup', () => {
            onClick();
            bg.setFillStyle(backgroundColor);
        });
        bg.on('pointerover', () => {
            bg.setFillStyle(hoverColor);
        });
        bg.on('pointerout', () => {
            bg.setFillStyle(backgroundColor);
        });
        scene.add.existing(this);
    }
}
export class Window extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config = {}) {
        super(scene, x, y);
        const { 
            width = 150, height = 50, 
            backgroundColor = 0xffe561,
            lineStyle = {color: 0x000000, lineWidth: 2},
        } = config;
        const bg = scene.add.rectangle(0, 0, width, height, backgroundColor);
        bg.setOrigin(0.5);
        const graphics = scene.add.graphics();
        graphics.lineStyle(lineStyle.lineWidth, lineStyle.color, 1);
        graphics.strokeRect(-width/2, -height/2, width, height);
        graphics.lineStyle(lineStyle.lineWidth/2, 0x000000, 1);
        graphics.strokeRect(-width/2-lineStyle.lineWidth/2, -height/2-lineStyle.lineWidth/2, width+lineStyle.lineWidth, height+lineStyle.lineWidth);
        this.add(bg);
        this.add(graphics);
        scene.add.existing(this);
    }
}