// Endless Zone
let cursors;
let keyUP, keyJ, keySPACE, keyR, keyW, keyA, keyS, keyD;

const config = {
    type: Phaser.CANVAS,
    width: 600,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);