export default class gameBootScene2 extends Phaser.Scene {
    constructor() {
        super('gameBootScene2');
    }

    init(data){
        this.score = data.score;
        this.hearts = data.hearts;
    }

    preload() {
    }

    create() {
        this.cameras.main.setBackgroundColor('#a2d2ff');

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        
        // Loading text
        this.loadingText = this.add.bitmapText(centerX, centerY + 220, 'font', 'LOADING..........', 20).setOrigin(0.5, 0.5);


        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        });

        //running man
        const player = this.add.sprite(centerX, centerY + -50, 'player');
        player.setScale(3);
        player.anims.play('run');

        //Fun fact
        const funFactText = this.add.bitmapText(centerX, centerY + 100, 'font', 'Level 2 - Cave of Death', 40).setOrigin(0.5, 0.5);

        //Next scene
        this.time.delayedCall(4000, () => {
            this.scene.start('gameLevel2', { score: this.score, hearts: this.hearts });;
        });
    }
}