export default class gameLevel2 extends Phaser.Scene {
    constructor() {
        super("gameLevel2");
    }

    init(data){
        this.hearts = data.hearts;
        this.score = data.score;
    }

    preload() {    
        this.load.image('tile3', './assets/tilemaps/level-2/tile3.gif');
        this.load.tilemapTiledJSON('map2', './assets/tilemaps/level-2/map2.json');         

    }

    create() {
        // Set the world bounds to match the size of the tile map
        this.physics.world.setBounds(0, 0, 4032, 680);
        this.cameras.main.setBounds(0, 0, 4032, 680);
        this.CaveBG = this.add.image(0, 0, 'CaveBG').setOrigin(0, 0);
        this.CaveBG.setDisplaySize(4032, 680);

        // Creating Tilemap
        const map = this.make.tilemap({ key: "map2" });
        const tileset1 = map.addTilesetImage("tileset3", 'tile3');
        const background = map.createLayer('background', tileset1, 0, 50);
        const foreground = map.createLayer('foreground', tileset1, 0, 50);
        const decorate1 = map.createLayer('decorate1', tileset1, 0, 50);
        const decorate2 = map.createLayer('decorate2', tileset1, 0, 50);
        const decorate3 = map.createLayer('decorate3', tileset1, 0, 50);
        this.fire = map.createLayer('fire', tileset1, 0, 50);
        this.spike = map.createLayer('spike', tileset1, 0, 50);
        const end = map.createLayer('Finish-Line',tileset1, 0, 50);

        

        // Create the player sprite and enable physics
        this.player = this.physics.add.sprite(50, 570, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //Player scale adjust property
        this.player.setScale(1);

        //Background Music
        this.CaveBG = this.sound.add('CaveBG', { volume: 0.9, loop: true });
        this.CaveBG.play();

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
        this.creatingCoin(270, 520);
        this.creatingCoin(370, 520);
        this.creatingCoin(640, 560);
        this.creatingCoin(800, 560);
        this.creatingCoin(720, 320);
        this.creatingCoin(970, 560);
        this.creatingCoin(1145, 320);
        this.creatingCoin(1240, 120);
        this.creatingCoin(1320, 470);
        this.creatingCoin(1390, 340);
        this.creatingCoin(1500, 220);
        this.creatingCoin(1680, 105);
        this.creatingCoin(1600, 460);
        this.creatingCoin(1820, 460);
        this.creatingCoin(1990, 420);
        this.creatingCoin(2080, 105);
        this.creatingCoin(2110, 280);
        this.creatingCoin(2530, 200);
        this.creatingCoin(2780, 200);
        this.creatingCoin(2430, 320);
        this.creatingCoin(3060, 200);

        
        this.creatingCoin(3800, 120);

        //Chest
        this.creatingChest(410, 320);
        this.creatingChest(1010, 115);

        

        //Collision
        foreground.setCollisionByExclusion([-1]);
        this.fire.setCollisionByExclusion([-1]);
        this.spike.setCollisionByExclusion([-1]);
        end.setCollisionByExclusion([-1]);


        // Enable collision between the player and the tilemap layer
        this.physics.add.collider(this.player, foreground);
        this.colliderFire = this.physics.add.collider(this.player, this.fire, this.playerDied, null, this);
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
                this.CaveBG.stop();
                this.scene.start('gameOverScene', { score: this.score, coin: this.coin });
            }else{
                this.die.play();
                //Disable collision n movement
                this.allowMovement = false;
                this.physics.world.removeCollider(this.colliderFire);
                this.physics.world.removeCollider(this.colliderSpikes);

                this.tweens.add({
                    targets: this.player,
                    alpha: 0,
                    duration: 250,
                    onComplete: () => {
                        this.player.setPosition(50, 570);
                        this.tweens.add({
                            targets: this.player,
                            alpha: 1,
                            duration: 250,
                            onComplete: () => {
                                //Enable collision n movement
                                this.time.delayedCall(250, () => {
                                    this.allowMovement = true;
                                    this.colliderFire = this.physics.add.collider(this.player, this.fire, this.playerDied, null, this);
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
        this.CaveBG.stop();
        this.scene.start('winningScene2', { score: this.score, coin: this.coin, hearts: this.hearts });
    }
}