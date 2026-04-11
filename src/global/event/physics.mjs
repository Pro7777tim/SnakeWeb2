export const makePhysics = (obj, scene) => {
    scene.physics.add.existing(obj);

    obj.body.setCollideWorldBounds(true);
    obj.body.setBounce(0.6);
    obj.body.setMass(Math.random() * 5);
    obj.body.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 0)
    );
    /*obj.body.setAngularVelocity(
        Phaser.Math.Between(-200, 200)
    );*/
};

export const launchEffect = (objects) => {
    objects.icon.setBlendMode(Phaser.BlendModes.SCREEN);
    objects.headText.setBlendMode(Phaser.BlendModes.SCREEN);
    objects.splashText.setBlendMode(Phaser.BlendModes.SCREEN);
    objects.levelText.setBlendMode(Phaser.BlendModes.SCREEN);
    objects.snapshotText.setBlendMode(Phaser.BlendModes.SCREEN);
    objects.snapshotShowText.setBlendMode(Phaser.BlendModes.SCREEN);
    makePhysics(objects.icon, objects.scene);
    makePhysics(objects.headText, objects.scene);
    makePhysics(objects.splashText, objects.scene);
    makePhysics(objects.levelText, objects.scene);
    makePhysics(objects.snapshotText, objects.scene);
    makePhysics(objects.snapshotShowText, objects.scene);
    objects.playButton.iterate((child) => {
        child.setBlendMode(Phaser.BlendModes.SCREEN);
    });
    objects.settingsButton.iterate((child) => {
        child.setBlendMode(Phaser.BlendModes.SCREEN);
    });
    objects.scene.physics.add.existing(objects.playButton);
    objects.playButton.body.setCollideWorldBounds(true);
    objects.playButton.body.setBounce(0.6);
    objects.playButton.body.setMass(Math.random() * 5);
    objects.playButton.body.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 0)
    );
    objects.scene.physics.add.existing(objects.settingsButton);
    objects.settingsButton.body.setCollideWorldBounds(true);
    objects.settingsButton.body.setBounce(0.6);
    objects.settingsButton.body.setMass(Math.random() * 5);
    objects.settingsButton.body.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 0)
    );
    objects.scene.input.on('pointerdown', (pointer) => {
        [
            objects.icon,
            objects.headText,
            objects.splashText,
            objects.levelText,
            objects.snapshotText,
            objects.snapshotShowText
        ].forEach(obj => {
            objects.scene.physics.add.existing(obj);
            const dx = obj.x - pointer.x;
            const dy = obj.y - pointer.y;
            const force = 1;
            obj.body.setVelocity(dx * force, dy * force);
        });
    });
}