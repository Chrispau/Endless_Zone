// Endless Zone
// Ian Cowan, Jason Chen, Nicholas Stepp, Chris Pau
// 
/* 
Creative Tilt: Technical - 
For this project, we used a variety of programming techniques to randomly
create obstacles (play.js - 121) at randomized ranges on the play field.
To accomplish this, we created helper functions (play.js - 257+) 
to abstract certain portions of code. I was particularly proud of my use of
deconstruction notation to allow randomSide to return two values which 
could be used directly to add an obstacle to the scene.


*/


let cursors;
let keyUP, keyJ, keySPACE, keyW, keyA, keyS, keyD, keyR;

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