export default class bootScene extends Phaser.Scene {
    constructor() {
        super('bootScene');
    }

    preload() {
        //load all assets
        this.load.image('logo', '../assets/images/logo/LynchStudio.png');
        this.load.bitmapFont('font', './assets/fonts/thick_8x8.png', '../assets/fonts/thick_8x8.xml');
    }

    create() {
        this.cameras.main.setBackgroundColor('#54aeff');

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        this.logo = this.add.image(centerX, centerY + -80, 'logo').setOrigin(0.5, 0.5);
        this.logo.setScale(.85);

        // Loading text
        this.loadingText = this.add.bitmapText(centerX, centerY + 170, 'font', 'LOADING..........', 40).setOrigin(0.5, 0.5);


    // Removing progress bar after load
        this.load.on('complete', () => {
        this.loadingText.destroy();
        });

    // Click start for bypassing audio bug
        this.time.delayedCall(3000, () => {
        // Destroy loading elements when "Click to Start" appears
        this.loadingText.destroy();

        const startText = this.add.bitmapText(centerX, centerY + 170, 'font', 'Click to Start', 35).setOrigin(0.5, 0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('mainMenuScene');
        });
    });
    }
}