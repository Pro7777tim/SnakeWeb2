export class SnowEmitter {
    constructor(scene) {
        this.scene = scene;
        this.emitter = this.scene.add.particles(
            0, 0,
            "snowflakes",
            {
                x: { min: 0, max: scene.scale.width },
                y: -10,
                speedY: { min: 30, max: 80 },
                speedX: { min: -10, max: 10 },
                frequency: 200,
                lifespan: 20000,
                scale: { min: 0.5, max: 1.5 },
                rotate: { min: 0, max: 360 },
                alpha: { start: 1, end: 0 }
            }
        );
    }
}
