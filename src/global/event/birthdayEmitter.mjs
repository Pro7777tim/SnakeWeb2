export class BirthdayEmitter {
    constructor(scene) {
        this.scene = scene;
        this.createSquareTexture();
        this.emitter = this.scene.add.particles(0, 0, 'confettiSquare', {
            emitting: false,
            lifespan: { min: 600, max: 1200 },
            speed: { min: 150, max: 350 },
            angle: { min: 0, max: 360 },
            gravityY: 400,
            scale: { start: 1, end: 0.5 },
            tint: [
                0xff0000, 0xffd700,
                0x00ff00, 0x00ffff,
                0xff00ff, 0xff8800,
                0x88ff00
            ],
            quantity: 30
        });
    }
    createSquareTexture() {
        const size = 8;
        const gfx = this.scene.add.graphics();
        gfx.fillStyle(0xffffff, 1);
        gfx.fillRect(0, 0, size, size);
        gfx.generateTexture('confettiSquare', size, size);
        gfx.destroy();
    }
    shoot(x, y, count = 40) {
        this.emitter.emitParticleAt(x, y, count);
    }
    startAutoAtPointer(interval = 1000) {
        this.scene.time.addEvent({
            delay: interval,
            callback: () => {
                const p = this.scene.input.activePointer;
                if (p.isDown) {
                    this.shoot(p.worldX, p.worldY);
                }
            },
            loop: true
        });
    }
}
