class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('field', 'assets/field.png');
        this.load.image('gg', 'assets/gameover.png');
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
        // extra key for debug stuff TODO: REMOVE/DISABLE BEFORE FINAL SUBMISSION
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // physics sprite
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'runner')
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

        //set game over initially to false
        this.gameOver = false;

        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Stencil Std, fantasy',
            fontSize: '56px',
            //backgroundColor: '#013220',
            strokeThickness: 4,
            stroke: '013220',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.p1Score = 0;
        this.scoreLeft = this.add.text(0, 0, 'SCORE: ' + this.p1Score, scoreConfig);


        // scale difficulty through multiple waves based on distance traveled
        this.wave = 0;
        this.obstacleSpeed = 200;    // obstacles start at 200
        this.obstacleSpeedMultiplier = 1;     
        this.nextWaveThreshold = 100; // starting at 100 yards
        this.obstacleSpawnDelay = 4000; // initial time between obstacles appearing in ms
        this.obstacleSpawnTimer = this.obstacleSpawnDelay;
    }



    update(time, delta) {


        this.player.setVelocity(0);

        if (!this.gameOver) {

            // starting speed is 10yards/s, or 1 screen length
            this.scrollingField.tilePositionY -= this.scrollSpeed * (delta / 1000); // normalize scroll speed to pixels per second
            this.centerDistance += (this.scrollSpeed * (delta / 1000) / (game.config.height / 10)); // total distance the screen has scrolled so far, in yards
            //console.log(this.centerDistance);

            // increasing challenge
            if (this.centerDistance > this.nextWaveThreshold) {
                this.wave++
                this.nextWaveThreshold += 100;
                console.log(this.nextWaveThreshold);
                this.obstacleSpawnDelay *= 0.95;
                this.obstacleSpeedMultiplier += 0.1
                //console.log(this.obstacleSpeedMultiplier);
                // obstacles appear a little more frequently and move a little faster

            }

            //obstacle spawning
            this.obstacleSpawnTimer -= delta;
            if (this.obstacleSpawnTimer <= 0) {
                this.obstacleSpawnTimer = this.obstacleSpawnDelay;
                this.spawnDefender(this.obstacleSpeed, this.obstacleSpeedMultiplier);
            }

            //score display
            this.p1Score = Math.floor(this.centerDistance);
            this.scoreLeft.text = 'SCORE: ' + this.p1Score + " YARDS";

            // polling controls
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
                this.spawnDefender(this.obstacleSpeed, this.obstacleSpeedMultiplier);
            }


        }

        if (this.gameOver) {
            //game over display
            let gameoverConfig = {
                fontFamily: 'Stencil Std, fantasy',
                fontSize: '100px',
                color: '#FFFFFF',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
            }

            this.gameoverScreen = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'gg').setOrigin(0, 0);
            this.add.text(game.config.width / 2, game.config.height / 6, 'GAME OVER', gameoverConfig).setOrigin(0.5);
            gameoverConfig.fontSize = '80px';
            this.add.text(game.config.width / 2, game.config.height / 2, 'SCORE: ' + this.p1Score + ' YARDS', gameoverConfig).setOrigin(0.5);
            gameoverConfig.fontSize = '45px';
            this.add.text(game.config.width / 2, game.config.height - 100, 'Press (R) to Restart', gameoverConfig).setOrigin(0.5);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
    }


    // put a defender on the screen with given horizontal speed coming from a random side of the screen
    spawnDefender(speed, multiplier) {
        let startingX, direction;
        if (Math.random() >= 0.5) {
            startingX = -10;
            direction = 1;
        } else {
            startingX = game.config.width + 10;
            direction = -1;
        }
        let startingY = randomRange(-game.config.height / 3, game.config.height / 3);
        this.defenders.add(new Defender(this, startingX, startingY, 'defender', 0, speed * direction, multiplier), true); //second arg must be true to add object to display list i guess
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