class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('field', 'assets/field.png');
        this.load.image('runner', 'assets/runningback.png');
    }

    create() {
        this.scrollingField = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'field').setOrigin(0, 0);
        this.PLAYER_VELOCITY = 400
        this.scrollSpeed = game.config.height;
        // create simple cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // pysics sprite
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height/2, 'runner').setOrigin(0.5, 1);
        this.player.setCollideWorldBounds(true);
    
        this.testSprite = this.add.tileSprite(game.config.width / 2, game.config.height/2, 0, 0, 'runner').setOrigin(0.5, 1);
        this.speed = game.config.height;
        this.centerDistance = 0;
        this.lastYardline = 0;
    }



    update(time, delta) {
        // starting speed is 10yards/s, or 1 screen length
        this.scrollingField.tilePositionY -= this.scrollSpeed * delta / 1000; // normalize scroll speed to pixels per second
        this.player.setVelocity(0);

        if (cursors.left.isDown) {
            this.player.setVelocityX(-this.PLAYER_VELOCITY);
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(this.PLAYER_VELOCITY);
        }
        if (cursors.up.isDown) {
            this.player.setVelocityY(-this.PLAYER_VELOCITY);
        } else if (cursors.down.isDown) {
            this.player.setVelocityY(this.PLAYER_VELOCITY);
        }
    
        this.scrollingField.tilePositionY -= this.speed * (delta / 1000); // normalize scroll speed to pixels per second
        this.centerDistance += (this.speed * (delta / 1000)) / 80; // total distance the screen has scrolled so far, in yards
        
    }
}