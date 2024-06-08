export default class gameOverScene extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    init(data){
        this.score = data.score;
        this.coin  = data.coin;
    }

    preload() {
        // Load assets like background image, buttons, and audio
        this.load.image('gameoverbackground', './assets/images/background/gameOverBackground.jpg');
        this.load.image('restartButton', './assets/images/buttons/restart.png');
        this.load.image('mainMenuButton', './assets/images/buttons/main.png');
        
        //Load Audio
        this.load.audio('gameoverSound', './assets/audio/BGMusic/Game Over.ogg');
        this.load.audio('sound', './assets/audio/sound-effect/menu.wav');
    }
    
    create() {

        this.background = this.add.image(0, 0, 'gameoverbackground').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        

        // Display game over text
        this.add.bitmapText(this.sys.game.config.width / 2, 130, 'font', 'Game Over', 100).setOrigin(0.5, 0.5);
    
        // Display score
        this.add.bitmapText(this.sys.game.config.width / 2, 290, 'font', 'Score: ' + this.score, 25).setOrigin(0.5, 0.5);
        
        this.add.bitmapText(this.sys.game.config.width / 2, 340, 'font', 'Coin Collected: ' + this.coin, 25).setOrigin(0.5, 0.5);



        // Add restart button
        const restartButton = this.add.image(this.cameras.main.width / 2, 420, 'restartButton')
        restartButton.setOrigin(0.5);
        restartButton.setInteractive();
        restartButton.on('pointerdown', () => {
            this.scene.start('gameLevel1');
            this.sound.stopAll();
            })
            restartButton.on('pointerover', () => {
            restartButton.y -= 5; 
            this.sound.play('sound');
            document.body.style.cursor = 'pointer';
        })
        restartButton.on('pointerout', () => {
            creditsButton.y += 5;
            document.body.style.cursor = 'default';
        });


        
    
        // Add main menu button
        const mainMenuButton = this.add.image(this.cameras.main.width / 2, 490, 'mainMenuButton')
        mainMenuButton.setOrigin(0.5);
        mainMenuButton.setInteractive();
        mainMenuButton.on('pointerdown', () => {
            this.scene.start('mainMenuScene');
            this.sound.stopAll();
            })

        mainMenuButton.on('pointerover', () => {
            mainMenuButton.y -= 5; 
            this.sound.play('sound');
            document.body.style.cursor = 'pointer';
            })

        mainMenuButton.on('pointerout', () => {
            mainMenuButton.y += 5;
            document.body.style.cursor = 'default';
            });

        // Play game over sound
        const gameoverSound = this.sound.add('gameoverSound', { volume: 1});
        gameoverSound.play();
    }
}