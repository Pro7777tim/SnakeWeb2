export class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, label, config = {}) {
        super(scene, x, y);
        const { 
            width = 150, height = 50, 
            backgroundColor = 0xffe561,
            hoverColor = 0xe1ca56,
            clickColor = 0xc8b34c,
            textStyle = { fontSize: '20px', color: '#ffffff', imgScale: 6, imgRotation: 0 },
            lineStyle = {color: 0x000000, lineWidth: 2},
            onClick = () => {}
        } = config;
        const bg = scene.add.rectangle(0, 0, width, height, backgroundColor).setOrigin(0.5);
        this.add(bg);
        const graphics = scene.add.graphics();
        graphics.lineStyle(lineStyle.lineWidth, lineStyle.color, 1);
        graphics.strokeRect(-width/2, -height/2, width, height);
        graphics.lineStyle(lineStyle.lineWidth/2, 0x000000, 1);
        graphics.strokeRect(-width/2-lineStyle.lineWidth/2, -height/2-lineStyle.lineWidth/2, width+lineStyle.lineWidth, height+lineStyle.lineWidth);
        this.add(graphics);
        if (label[0] != "!") {
            const txt = scene.add.text(0, 0, label, textStyle).setOrigin(0.5);
            this.add(txt);
            this.txt = txt;
        } else {
            this.add(
                scene.add.image(
                    0,
                    0,
                    label.slice(1),
                ).setOrigin(0.5, 0.5)
                .setScale(textStyle.imgScale)
                .setRotation(textStyle.imgRotation)
            );
        }
        bg.setInteractive({ useHandCursor: true });
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
        const bg = scene.add.rectangle(0, 0, width, height, backgroundColor).setInteractive();
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

export class Checkbox extends Phaser.GameObjects.Container {
    constructor(
        scene,
        x,
        y,
        label,
        checked = false,
        onChange,
        options = {}
    ) {
        super(scene, 0, 0);
        const {
            size = 32,
            backgroundColor = 0x1e293b,
            borderColor = 0xffffff,
            borderWidth = 2,
            iconKey = 'apple',
            iconScale = 0.8,
            textStyle = {
                fontSize: '24px',
                color: '#000'
            },
            spacing = 50,
            lineWidth = 8
        } = options;

        const box = scene.add.rectangle(x, y, size, size, backgroundColor)
            .setStrokeStyle(borderWidth, borderColor)
            .setInteractive({ useHandCursor: true });
        const check = scene.add.image(x, y, iconKey)
            .setOrigin(0.5)
            .setScale(iconScale)
            .setVisible(checked);
        const text = scene.add.text(
            x + spacing,
            y,
            label,
            textStyle
        ).setOrigin(0, 0.5);
        const graphics = scene.add.graphics();
        graphics.lineStyle(lineWidth / 2, 0x000000, 1);
        graphics.strokeRect(
            -size / 2 - lineWidth / 2 + x,
            -size / 2 - lineWidth / 2 + y,
            size + lineWidth,
            size + lineWidth
        );
        box.on('pointerdown', () => {
            box.setFillStyle(0xc8b34c);
        });
        box.on('pointerover', () => {
            box.setFillStyle(0xe1ca56);
        });
        box.on('pointerout', () => {
            box.setFillStyle(backgroundColor);
        });
        box.on('pointerup', () => {
            checked = !checked;
            check.setVisible(checked);
            onChange?.(checked);
            box.setFillStyle(backgroundColor);
        });
        this.add([
            box,
            check,
            text,
            graphics
        ]);
        this.isChecked = () => checked;
        this.setChecked = (value) => {
            checked = value;
            check.setVisible(value);
        };

        scene.add.existing(this);
    }
}

export class Slider extends Phaser.GameObjects.Container {
    constructor(
        scene,
        x,
        y,
        length = 10,
        value = 3,
        onChange,
        options = {},
        text = '',
        textStyle = {
            fontSize: '24px',
            color: '#ffffff'
        }
    ) {
        super(scene, x, y);
        const {
            headKey = 'head',
            bodyKey = 'body',
            emptyAlpha = 0.3,
            spacing = 40,
            scale = 1
        } = options;
        this.maxLength = length;
        this.value = value;
        this.cells = [];
        let offsetX = 0;
        for (let i = 0; i < this.maxLength; i++) {
            const key = (i === 0) ? headKey : bodyKey;
            const img = scene.add.image(
                i * offsetX,
                0,
                key
            )
            .setOrigin(0.5)
            .setScale(scale)
            .setInteractive({ useHandCursor: true });
            offsetX = spacing * 1.5;
            if (i === 0) {
                img.setRotation(-Math.PI / 2);
                img.x = -spacing / 4
            }
            img.index = i;
            img.on('pointerdown', () => {
                this.setValue(i + 1);
                onChange?.(this.value);
            });
            this.cells.push(img);
            this.add(img);
        }
        const label = scene.add.text(
            -spacing,
            -spacing * 1.5,
            text,
            textStyle
        ).setOrigin(0, 0.5);
        this.add(label);
        this.label = label;
        this.getValue = () => this.value;
        this.setValue = (val) => {
            this.value = Phaser.Math.Clamp(val, 0, this.length) - 1;
            this.updateVisual();
        };
        this.updateVisual = () => {
            label.text = `${text}: ${this.value * 10}%`;
            for (let i = 0; i < this.cells.length; i++) {
                if (i < this.value + 1) {
                    this.cells[i].setAlpha(1);
                } else {
                    this.cells[i].setAlpha(emptyAlpha);
                }
            }
        };
        this.updateVisual();
        scene.add.existing(this);
    }
}