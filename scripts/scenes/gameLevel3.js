export default class gameLevel3 extends Phaser.Scene {
    constructor() {
        super("gameLevel3");
    }

    init(data){
        // this.hearts = data.hearts;
        this.score = data.score;
        this.coin  = data.coin;
    }

    preload() {    
        this.load.image('tile2', './assets/tilemaps/level-3/tileset2.png');
        this.load.tilemapTiledJSON('map3', './assets/tilemaps/level-3/map3.json');         

    }

    create() {
        // Set the world bounds to match the size of the tile map
        this.physics.world.setBounds(0, 0, 4032, 680);
        this.cameras.main.setBounds(0, 0, 4032, 680);
        this.CaveBG = this.add.image(0, 0, 'CrystalCaveBG').setOrigin(0, 0);
        this.CaveBG.setDisplaySize(4032, 680);

        // Creating Tilemap
        const map = this.make.tilemap({ key: "map3" });
        const tileset2 = map.addTilesetImage("tileset2", 'tile2');
        
        const decorate3 = map.createLayer('decorate3', tileset2, 0, 50);
        const end = map.createLayer('Finish-Line', tileset2, 0, 50);
        const background = map.createLayer('background', tileset2, 0, 50);
        const decorate1 = map.createLayer('decorate1', tileset2, 0, 50);
        this.spike = map.createLayer('crystal-spike', tileset2, 0, 50);
        this.water = map.createLayer('water', tileset2, 0, 50);
        const foreground = map.createLayer('foreground', tileset2, 0, 50);
        const decorate2 = map.createLayer('decorate2', tileset2, 0, 50);
        
        
        
        

        // Create the player sprite and enable physics
        this.player = this.physics.add.sprite(50, 125, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //Player scale adjust property
        this.player.setScale(1);

        //Background Music
        this.CrystalBGM = this.sound.add('CrystalBGM', { volume: 0.9, loop: true });
        this.CrystalBGM.play();

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
        this.pick = this.sound.add('pick', { volume: .5});

        this.chestPick = this.sound.add('chestPick', { volume: 1});

        //Coin
        this.creatingCoin(220, 340);
        this.creatingCoin(350, 520);
        this.creatingCoin(640, 580);
        this.creatingCoin(800, 580);
        this.creatingCoin(720, 340);
        this.creatingCoin(980, 580);
        this.creatingCoin(980, 180);
        this.creatingCoin(1230, 210);
        this.creatingCoin(1320, 440);
        this.creatingCoin(1500, 245);
        this.creatingCoin(1540, 500);
        this.creatingCoin(1820, 245);
        this.creatingCoin(1970, 400);
        this.creatingCoin(2110, 450);
        this.creatingCoin(2430, 450);
        this.creatingCoin(2530, 635);
        this.creatingCoin(2840, 560);
        this.creatingCoin(3080, 465);
        this.creatingCoin(3430, 415);

        //Chest
        this.creatingChest(410, 320);
        this.creatingChest(2560, 450);

        

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

        this.hearts = 3;
        this.heartstext = this.add.bitmapText(325, 155, 'font', 'Hearts: ' + this.hearts, 13).setScrollFactor(0).setOrigin(0, 0);

        this.scoreText = this.add.bitmapText(525, 155, 'font', 'Score: ' + this.score, 13).setScrollFactor(0).setOrigin(0, 0);

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
                this.CrystalBGM.stop();
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
                        this.player.setPosition(50, 125);
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

    creatingChest(x, y){
        const chest = this.physics.add.staticSprite(x, y, 'chest');
    
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('chest', {end: 0 }),
            frameRate: 8,
            repeat: -1
        });
    
        chest.anims.play('open');
    
        this.physics.add.overlap(this.player, chest, this.collectingChest, null, this);
        }
    
        collectingChest(player, chest) {
            chest.disableBody(true, true);
            this.chestPick.play();
            //Scoring
            this.score += 500;
            this.scoreText.setText('Score: ' + this.score);
            this.coin += 5;
            this.coinsText.setText('Coins: 0' + this.coin);       
        }
    

    Win(){
        this.CrystalBGM.stop();
        this.scene.start('winningScene3', { score: this.score, coin: this.coin });
    }
}