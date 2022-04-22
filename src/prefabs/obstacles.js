class Defender extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);
        this.worldScene = scene;
        this.speed = speed;
        scene.physics.add.existing(this);
    }

    update(time, delta) {
        this.y += this.worldScene.scrollSpeed * (delta / 1000);
        this.x += this.speed * (delta / 1000)
        if (this.y > game.config.height + this.height) {
            this.destroy();
        }
    }
}