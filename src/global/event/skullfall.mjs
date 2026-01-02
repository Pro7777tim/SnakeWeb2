export class Skullfall {
    constructor(scene) {
        this.scene = scene;
        this.emitter = this.scene.add.particles(
            0, 0,
            "skull",
            {
                x: { min: 0, max: scene.scale.width },
                y: -10,
                speedY: { min: 40, max: 100 },
                speedX: { min: -10, max: 10 },
                frequency: 2000,
                lifespan: 20000,
                scale: { min: 1.5, max: 2 },
                rotate: { min: 0, max: 360 },
                alpha: { start: 1, end: 0 }
            }
        );
    }
}