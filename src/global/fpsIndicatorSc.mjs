export class FpsIndicatorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FpsIndicatorScene', active: true });
    }

    create() {
        this.scene.bringToTop();
        let lastVisible = settings.showFpsIndicator;

        this.fpsText = this.add.text(this.scale.width - 10, 10, 'FPS: 0', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#00ff00',
            stroke: '#000',
            strokeThickness: 3
        })
        .setOrigin(1, 0)
        .setScrollFactor(0)
        .setDepth(999)
        .setVisible(settings.showFpsIndicator);

        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                const fps = Math.floor(this.game.loop.actualFps);
                this.fpsText.setText('FPS: ' + fps);
                
                if (settings.showFpsIndicator != lastVisible) {
                    this.fpsText.setVisible(settings.showFpsIndicator);
                    lastVisible = settings.showFpsIndicator;
                }
            }
        });
    }
}