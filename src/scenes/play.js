class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('field', 'assets/field.png');
    }

    create() {
        this.scrollingField = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'field').setOrigin(0, 0);
        this.speed = game.config.height;
    }

    update(time, delta) {
        // starting speed is 10yards/s, or 1 screen length
        this.scrollingField.tilePositionY -= this.speed * delta / 1000; // normalize scroll speed to pixels per second
    }
}