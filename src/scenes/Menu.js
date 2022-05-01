class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('graphic', 'assets/title_img.png');
        this.load.audio('menu', './assets/menu.wav');
    }

    create() {
        this.cameras.main.setBackgroundColor('#99E550')
        // title screen graphic
        this.add.sprite(game.config.width / 2, game.config.height / 2, 'graphic');
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Impact, fantasy',
            fontWeight: '900',
            fontSize: '96px',
            color: '#013220',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - 200, 'ENDLESS ZONE', menuConfig).setOrigin(0.5);
        menuConfig.fontFamily = 'Gill Sans, sans-serif';
        menuConfig.fontSize = '36px';
        menuConfig.color = '#FFFFFF';
        menuConfig.stroke = '#000'
        menuConfig.strokeThickness = 5;
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Use arrow keys or WASD to move', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '48px';
        this.add.text(game.config.width / 2, game.config.height / 2 + 150, 'Press W or UP to start', menuConfig).setOrigin(0.5);

        // define keys
        // create simple cursor input
        cursors = this.input.keyboard.createCursorKeys();
        //WASD KEYS
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //loop menu music
        this.menuMusic = this.sound.add('menu');
        this.menuMusic.setLoop(true);
        this.menuMusic.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyW) || Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.menuMusic.stop();
            this.scene.start("play");
        }
    }
}