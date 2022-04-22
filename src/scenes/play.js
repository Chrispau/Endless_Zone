class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('field', 'assets/field.png');
        this.load.image('runner', 'assets/runningback.png');
        this.load.image('defender', 'assets/defender.png');
    }

    create() {
        this.scrollingField = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'field')
            .setOrigin(0, 0);
        this.PLAYER_VELOCITY = game.config.height / 2
        this.scrollSpeed = game.config.height;

        // create simple cursor input
        cursors = this.input.keyboard.createCursorKeys();
        // extra key for debug stuff
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

        // physics sprite
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height/2, 'runner')
            .setOrigin(0.5, 1)
            .setScale(game.config.width / 800, game.config.height / 800); 
            // scale sprite such that it is always the same relative to screen size
        this.player.setCollideWorldBounds(true);
    
        this.centerDistance = 0;
        this.defenders = this.physics.add.group({
            runChildUpdate: true
        });

        //this.physics.add.collider(this.player, this.defenders);

        this.physics.add.overlap(this.player, this.defenders, this.setGameOver, null, this);
        //this.lastYardline = 0;
    }



    update(time, delta) {
        // starting speed is 10yards/s, or 1 screen length
        this.scrollingField.tilePositionY -= this.scrollSpeed * (delta / 1000); // normalize scroll speed to pixels per second
        this.centerDistance += (this.scrollSpeed * (delta / 1000)) / (this.scrollSpeed / 10); // total distance the screen has scrolled so far, in yards
        //console.log(this.centerDistance);
        
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

        if (Phaser.Input.Keyboard.JustDown(keyJ)) {
            this.spawnDefender(300);
        }
        this.gameOver = false;
    }


    // put a defender on the screen with given horizontal speed coming from a random side of the screen
    spawnDefender(speed) {
        let startingX, direction;
        if (Math.random() >= 0.5) {
            startingX = -10;
            direction = 1;
        } else {
            startingX = game.config.width + 10;
            direction = -1;
        }
        let startingY = randomRange(-game.config.height / 2, game.config.height / 2);
        this.defenders.add (new Defender (this, startingX, startingY, 'defender', 0, speed * direction ), true); //second arg must be true to add object to display list i guess
    }
    setGameOver() {
        this.gameOver = true;

        console.log('game over');
    }

    
}

// get a random value in the range (works for negatives)
function randomRange(min, max) {
    let range = max - min;
    let val = Math.random() * range
    return val + min;
}