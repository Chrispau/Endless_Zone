// Endless Zone
let cursors;

const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [Play]
}

let game = new Phaser.Game(config);