export default class mainMenuScene extends Phaser.Scene {
    constructor() {
        super("mainMenuScene");
    }

    preload() {
        // Load assets like background images, buttons, etc.
        this.load.image('background', './assets/images/background/MainMenuBG.jpg');
        this.load.image('GameName', './assets/images/logo/GameName.png');
        this.load.image('CaveBG', './assets/images/background/CaveBG.png');
        this.load.image('CrystalCaveBG', './assets/images/background/CrystalCaveBG.jpg');
        

        //load spritesheet
        this.load.spritesheet('player', './assets/images/spritesheet/player.png', {  frameWidth: 31.5, frameHeight: 32});
        this.load.spritesheet('coin', './assets/images/spritesheet/coin.png', {  frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('chest', './assets/images/spritesheet/chest.gif', {  frameWidth: 42, frameHeight: 32});
               
        // Load button images
        this.load.image('startButton', './assets/images/buttons/start.png');
        this.load.image('creditButton', './assets/images/buttons/credit.png');
        this.load.image('quitButton', './assets/images/buttons/quit.png');
        
        
        // Load audio
        this.load.audio('backgroundMusic', './assets/audio/BGMusic/MainMenuBGM.mp3');
        this.load.audio('CrystalBGM', './assets/audio/BGMusic/Crystal-BGM.mp3');
        this.load.audio('IslandBG', './assets/audio/BGMusic/Island-BG.mp3');
        this.load.audio('CaveBG', './assets/audio/BGMusic/Cave-BG.mp3');
        this.load.audio('jump1', './assets/audio/sound-effect/jump1.wav');
        this.load.audio('jump2', './assets/audio/sound-effect/jump2.wav');
        this.load.audio('jump3', './assets/audio/sound-effect/jump3.wav');
        this.load.audio('jump4', './assets/audio/sound-effect/jump4.wav');
        this.load.audio('jump5', './assets/audio/sound-effect/jump5.wav');
        this.load.audio('jump6', './assets/audio/sound-effect/jump6.wav');
        this.load.audio('chestPick', './assets/audio/sound-effect/chestpick.mp3');
        this.load.audio('pick', './assets/audio/sound-effect/pick.wav');
        this.load.audio('die', './assets/audio/sound-effect/death.wav');

        // Load fonts
        this.load.bitmapFont('font', './assets/fonts/thick_8x8.png', '../assets/fonts/thick_8x8.xml');

    }

    create() {
        // Add background image
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Add Name image
        this.name = this.add.image(this.cameras.main.width / 2, 250, 'GameName').setOrigin(0.5, 0.5);
        this.name.setScale(.7);
    
        // Load and play background music
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 1 });
        if (!this.backgroundMusic.isPlaying && !this.sound.mute) {
            this.backgroundMusic.play();
        }
    
        // Add sound status text
        this.soundStatusText = this.add.text(20, 20, 'Sound: On', { font: '24px Arial', fill: '#ffffff' });
        
        // Add mute/unmute button
        this.muteButton = this.add.text(this.cameras.main.width - 150, 20, 'Mute', { font: '24px Arial', fill: '#ffffff' });
        this.muteButton.setInteractive();
        this.muteButton.on('pointerdown', () => {
            this.toggleSound();
        });
    
        // Add Start button
        const startButton = this.add.image(this.cameras.main.width / 3, 460, 'startButton') // Start off-screen to the left
        startButton.setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('gameBootScene1');
            this.backgroundMusic.stop();

        });
        // Add hover effect for Start button
        startButton.on('pointerover', () => {
            startButton.setTint(0xb2ffb2);
        });
        startButton.on('pointerout', () => {
            startButton.clearTint();
        });
    
        // Add Credit button
        const creditButton = this.add.image(this.cameras.main.width / 2, 460, 'creditButton'); // Start off-screen to the right
        creditButton.setOrigin(0.5);
        creditButton.setInteractive();
        creditButton.on('pointerdown', () => {
            if (!this.scene.isActive('creditScene')) {
                this.scene.stop('titleScene');
                this.scene.start('creditScene');
                this.backgroundMusic.stop();
            }
        });
    
        // Add hover effect for Credit button
        creditButton.on('pointerover', () => {
            creditButton.setTint(0xb2ffb2);
        });
        creditButton.on('pointerout', () => {
            creditButton.clearTint();
        });
    
    
        // Add Quit button
        const quitButton = this.add.image(this.cameras.main.width / 1.5, 460, 'quitButton'); // Start off-screen at the bottom
        quitButton.setOrigin(0.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            if (window.confirm("Are you sure you want to quit?")) {
                window.close();
            }
            this.backgroundMusic.stop();
        });
    
        // Add hover effect for Quit button
        quitButton.on('pointerover', () => {
            quitButton.setTint(0xb2ffb2);
        });
        quitButton.on('pointerout', () => {
            quitButton.clearTint();
        });
    
        // Get reference to the game scene instance
        this.gameScene = this.scene.get('gameLevel1');
    }

    toggleSound() {
        if (this.sound.mute) {
            this.sound.setMute(false);
            this.soundStatusText.setText('Sound: On');
        } else {
            this.sound.setMute(true);
            this.soundStatusText.setText('Sound: Off');
        }
    }
}