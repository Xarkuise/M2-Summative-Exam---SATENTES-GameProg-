export default class winningScene3 extends Phaser.Scene {
    constructor() {
        super("winningScene3");
    }

    init(data){
        this.hearts = data.hearts;
        this.score = data.score;
        this.coin  = data.coin;
    }

    preload() {
        // Load the background image
        this.load.image('gSBackground3', 'assets/images/background/ThirdWinningBG.jpg');
        // Load the winning sound
        this.load.audio('winningSound', 'assets/audio/sound-effect/Victory!.wav');
        // Load font
        this.load.bitmapFont('font', './assets/fonts/thick_8x8.png', '../assets/fonts/thick_8x8.xml');

    }

    create() {
        // Display the background image
        this.winningBackground = this.add.image(0, 0, 'gSBackground3').setOrigin(0, 0);
        this.winningBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);


        // Play winning sound
        let winningSound = this.sound.add('winningSound', { volume: 1, loop: false });
        winningSound.play();

        // Display the winning message and score
        this.add.bitmapText(this.sys.game.config.width / 2, 130, 'font', 'You Win!', 100).setOrigin(0.5, 0.5);
        this.add.bitmapText(this.sys.game.config.width / 2, 290, 'font', 'Score: ' + this.score, 25).setOrigin(0.5, 0.5);
        this.add.bitmapText(this.sys.game.config.width / 2, 340, 'font', 'Coin Collected: ' + this.coin, 25).setOrigin(0.5, 0.5);

        // Add a restart button
        const restartButton = this.add.text(600, 500, 'Restart Game', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5).setInteractive();
        restartButton.on('pointerdown', () => {
            this.sound.stopAll(); // Stop all sounds before restarting
            this.scene.start('gameBootScene1');
        });  

        const mainButton = this.add.text(600, 560, 'Main Menu', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5).setInteractive();
        mainButton.on('pointerdown', () => {
            this.sound.stopAll(); // Stop all sounds before restarting
            this.scene.start('mainMenuScene');
        });  
    }
}