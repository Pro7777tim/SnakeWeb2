import { isEvent } from "../event/events.mjs";
export class Loading {
    constructor(scene) {
        //super(scene);
        const { width, height } = scene.scale;
        scene.cameras.main.setBackgroundColor('#0f172a');
        const loadingText = scene.add.text(
            width / 2,
            height / 2 - 40,
            'Loading...',
            { fontSize: '32px', color: '#ffffff' }
        ).setOrigin(0.5);
        const box = scene.add.graphics();
        box.fillStyle(0x222222, 0.8);
        box.fillRect(width / 2 - 160, height / 2, 320, 30);
        const bar = scene.add.graphics();
        scene.load.on('progress', (value) => {
            bar.clear();
            bar.fillStyle(0x38bdf8, 1);
            bar.fillRect(
                width / 2 - 150,
                height / 2 + 5,
                300 * value,
                20
            );
        });
        scene.load.on('complete', () => {
            bar.destroy();
            box.destroy();
            loadingText.destroy();
            let bg = "#fff";
            if (isEvent.event == "halloween") {
                bg = "#000";
            }
            scene.cameras.main.setBackgroundColor(bg);
        });
    }
}