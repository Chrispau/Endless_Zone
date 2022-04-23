class Defender extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed, multiplier) {
        super(scene, x, y, texture, frame);
        this.worldScene = scene;
        this.speed = speed;
        this.multiplier = multiplier;
        scene.physics.add.existing(this)
            .setScale(game.config.width / 600, game.config.height / 600);
    }

    update(time, delta) {
        this.body.setVelocityY(this.worldScene.scrollSpeed * this.multiplier);
        this.body.setVelocityX(this.speed * this.multiplier);
        if (this.y > game.config.height + this.height) {
            this.destroy();
        }
    }
}

class Fans extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed, multiplier) {
        super(scene, x, y, texture, frame);
        this.worldScene = scene;
        this.speed = speed;
        this.multiplier = multiplier;
        scene.physics.add.existing(this)
            .setScale(game.config.width / 800, game.config.height / 800)
    }
    
    update() {
        this.body.setVelocityY(this.worldScene.scrollSpeed / 4);
        this.body.setVelocityX(this.speed * this.multiplier);
        if (this.y > game.config.height + this.height) {
            this.destroy();
        }
    }
}