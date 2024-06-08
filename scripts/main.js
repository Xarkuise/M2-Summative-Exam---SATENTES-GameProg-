import bootScene from './scenes/bootScene.js';
import mainMenuScene from './scenes/mainMenuScene.js';
import gameBootScene1 from './scenes/gameBootScene1.js';
import gameLevel1 from './scenes/gameLevel1.js';
import gameBootScene2 from './scenes/gameBootScene2.js';
import gameLevel2 from './scenes/gameLevel2.js';
import gameBootScene3 from './scenes/gameBootScene3.js';
import gameLevel3 from './scenes/gameLevel3.js';
import winningScene from './scenes/winningScene.js';
import winningScene2 from './scenes/winningScene2.js';
import winningScene3 from './scenes/winningScene3.js';
import gameOverScene from './scenes/gameOverScene.js';



var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    pixelArt: true,
    scene: [bootScene, mainMenuScene, gameBootScene1, gameLevel1, winningScene, gameBootScene2, gameLevel2, winningScene2, gameBootScene3, gameLevel3, winningScene3, gameOverScene]
    
};

new Phaser.Game(config);