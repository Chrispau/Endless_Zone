class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.cameras.main.setBackgroundColor('#99E550')
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Impact, fantasy',
            fontWeight: '900',
            fontSize: '96px',
            backgroundColor: '#99E550',
            color: '#013220',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - 200, 'ENDLESS ZONE', menuConfig).setOrigin(0.5);
        menuConfig.fontFamily = 'Gill Sans, sans-serif';
        menuConfig.fontSize = '42px';
        menuConfig.backgroundColor = '#013220';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2, 'Use arrow keys to move', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '48px';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 + 200, 'Press SPACEBAR to start', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start("play");    
        }
      }
}