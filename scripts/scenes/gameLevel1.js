export default class gameLevel1 extends Phaser.Scene {
    constructor() {
        super("gameLevel1");
    }

    preload() {    
        this.load.image('tiles', './assets/tilemaps/level-1/tiles.png');
        this.load.tilemapTiledJSON('map', './assets/tilemaps/level-1/map1.json');         
    }

    create() {
        // Set the world bounds to match the size of the tile map
        this.physics.world.setBounds(0, 0, 4032, 680);
        this.cameras.main.setBounds(0, 0, 4032, 680);
        this.cameras.main.setBackgroundColor('#bcdeff');

        // Creating Tilemap
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset", 'tiles');
        const background = map.createLayer('background', tileset, 0, 50);
        const foreground = map.createLayer('foreground', tileset, 0, 50);
        const decorate1 = map.createLayer('decorate-1', tileset, 0, 50);
        const decorate2 = map.createLayer('decorate-2', tileset, 0, 50);
        this.water = map.createLayer('water', tileset, 0, 50);
        this.spike = map.createLayer('spike', tileset, 0, 50);
        const end = map.createLayer('Finish-Line', tileset, 0, 50);

        // Create the player sprite and enable physics
        this.player = this.physics.add.sprite(0, 550, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //Player scale adjust property
        this.player.setScale(1);

        //Background Music
        this.gameBG = this.sound.add('IslandBG', { volume: 0.9, loop: true });
        this.gameBG.play();

        //Jump
        this.jumpSounds = [
            this.sound.add('jump1', { volume: 1.2}),
            this.sound.add('jump2', { volume: 1.2}),
            this.sound.add('jump3', { volume: 1.2}),
            this.sound.add('jump4', { volume: 1.2}),
            this.sound.add('jump5', { volume: 1.2}),
            this.sound.add('jump6', { volume: 1.2}),
        ];

        //Death
        this.die = this.sound.add('die', { volume: 1.2});

        //Pick Coins
        this.pick = this.sound.add('pick', { volume: 1.2});

        //Coin
        this.creatingCoin(210, 500);
        this.creatingCoin(210, 230);
        this.creatingCoin(480, 460);
        this.creatingCoin(480, 100);
        this.creatingCoin(670, 240);
        this.creatingCoin(935, 500);
        this.creatingCoin(1145, 280);
        this.creatingCoin(1230, 550);
        this.creatingCoin(1240, 165);
        this.creatingCoin(1440, 550);
        this.creatingCoin(1440, 490);
        this.creatingCoin(1610, 150);
        this.creatingCoin(1680, 150);
        this.creatingCoin(1770, 440);
        this.creatingCoin(1790, 440);
        this.creatingCoin(1810, 440);
        this.creatingCoin(1990, 408);
        this.creatingCoin(2110, 295);
        this.creatingCoin(2410, 565);
        this.creatingCoin(2550, 565);
        this.creatingCoin(2610, 335);
        this.creatingCoin(2620, 475);
        this.creatingCoin(2660, 425);
        this.creatingCoin(2720, 565);
        this.creatingCoin(2880, 495);
        this.creatingCoin(3000, 500);
        this.creatingCoin(3050, 500);
        this.creatingCoin(3170, 215);
        this.creatingCoin(3170, 325);
        this.creatingCoin(3205, 225);
        this.creatingCoin(3205, 325);
        this.creatingCoin(3240, 215);
        this.creatingCoin(3240, 325);
        this.creatingCoin(3340, 500);
        this.creatingCoin(3390, 500);
        this.creatingCoin(3470, 325);

        

        //Collision
        foreground.setCollisionByExclusion([-1]);
        this.water.setCollisionByExclusion([-1]);
        this.spike.setCollisionByExclusion([-1]);
        end.setCollisionByExclusion([-1]);


        // Enable collision between the player and the tilemap layer
        this.physics.add.collider(this.player, foreground);
        this.colliderWater = this.physics.add.collider(this.player, this.water, this.playerDied, null, this);
        this.colliderSpikes = this.physics.add.collider(this.player, this.spike, this.playerDied, null, this);
        this.physics.add.collider(this.player, end, this.Win, null, this);
    
        // Animations for the player
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
            frameRate: 15,
            repeat: -1
        });
    
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 5
        });
    
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 10 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Make the camera follow the player
        this.cameras.main.startFollow(this.player);

        // Set initial zoom level (e.g., 2x zoom)
        this.cameras.main.setZoom(2);

        //Movement event trigger
        this.allowMovement = true;

        this.hearts = 3
        this.heartstext = this.add.bitmapText(325, 155, 'font', 'Hearts: 03', 13).setScrollFactor(0).setOrigin(0, 0);

        this.score = 0;
        this.scoreText = this.add.bitmapText(525, 155, 'font', 'Score: 00', 13).setScrollFactor(0).setOrigin(0, 0);
        
        this.coin = 0;
        this.coinsText = this.add.bitmapText(725, 155, 'font', 'Coins: 00', 13).setScrollFactor(0).setOrigin(0, 0);

    }

    update() {
        if (this.allowMovement) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-240);
                this.player.anims.play('walk', true);
                this.player.flipX = true;
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(240);
                this.player.anims.play('walk', true);
                this.player.flipX = false;
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play('idle');
            }
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(-317);
                this.player.anims.play('jump');
                
                // Play a random jump sound
             const randomIndex = Math.floor(Math.random() * this.jumpSounds.length);
             this.jumpSounds[randomIndex].play();
            }
        }
    }


        playerDied(player, tile) {
            this.hearts--;
            this.heartstext.setText('Hearts: ' + this.hearts);

            if(this.hearts <= 0){
                this.gameBG.stop();
                this.scene.start('gameOverScene', { score: this.score, coin: this.coin });
            }else{
                this.die.play();
                //Disable collision n movement
                this.allowMovement = false;
                this.physics.world.removeCollider(this.colliderWater);
                this.physics.world.removeCollider(this.colliderSpikes);

                this.tweens.add({
                    targets: this.player,
                    alpha: 0,
                    duration: 250,
                    onComplete: () => {
                        this.player.setPosition(0, 550);
                        this.tweens.add({
                            targets: this.player,
                            alpha: 1,
                            duration: 250,
                            onComplete: () => {
                                //Enable collision n movement
                                this.time.delayedCall(250, () => {
                                    this.allowMovement = true;
                                    this.colliderWater = this.physics.add.collider(this.player, this.water, this.playerDied, null, this);
                                    this.colliderSpikes = this.physics.add.collider(this.player, this.spike, this.playerDied, null, this);
                                });
                            }
                        });
                    }
                });
            }
        }

    creatingCoin(x, y){
    const coin = this.physics.add.staticSprite(x, y, 'coin');

    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 6 }),
        frameRate: 8,
        repeat: -1
    });

    coin.anims.play('spin');

    this.physics.add.overlap(this.player, coin, this.collectingCoins, null, this);
    }

    collectingCoins(player, coin) {
        coin.disableBody(true, true);
        this.pick.play();
        //Scoring
        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
        this.coin += 1;
        this.coinsText.setText('Coins: 0' + this.coin);       
    }

    Win(){
        this.gameBG.stop();
        this.scene.start('winningScene', { score: this.score, coin: this.coin, hearts: this.hearts });
    }
}