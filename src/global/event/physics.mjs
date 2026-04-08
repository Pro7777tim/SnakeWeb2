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