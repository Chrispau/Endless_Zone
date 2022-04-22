// Endless Zone
let cursors;
let keyJ;

const config = {
    type: Phaser.CANVAS,
    width: 600,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [Play]
}

let game = new Phaser.Game(config);