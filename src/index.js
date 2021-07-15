import Phaser, { Core } from 'phaser';
import Button from './tools/button'
import DialogButton from './tools/dialogbutton'
import CloseButton from './tools/closebutton'
import Dialog from './tools/dialog'

import Bathroom from './assets/bathroom.png';
import Toilet from './assets/toilet.png';
import Shower from './assets/showerset.png';
import Washer from './assets/washer.png';
import Ice from './assets/icefloeborder.png';
import Bear from './assets/bear.png';
import Sad from './assets/bearsad.png';
import Happy from './assets/bearhappy.png';
import Arctic from './assets/arcticbackgroundborder.png';
import Kitchen from './assets/kitchen.png';
import Bathselect from './assets/bathroomselect.png';
import Kitchenselect from './assets/kitchenselect.png';


let gameState = {
    score: 0,
    iceSize: 1,
    isDialogOpen: false,
    shower: {
        isAnswered: false,
        isCorrect: false
    },
    washer: {
        isAnswered: false,
        isCorrect: false
    },
    toilet: {
        isAnswered: true,
        isCorrect: false
    }
};

function renderDialog (scene, text) {
    if (gameState.dialogBox) {
        gameState.dialogBox.destroy();
        gameState.dialogText.destroy();
    }

    gameState.dialogBox = scene.add.rectangle(75, 350, 600, 200, 0xffffff)
    gameState.dialogBox.strokeColor = 0x000000;
    gameState.dialogBox.strokeWeight = 3;
    gameState.dialogBox.isStroked = true;
    gameState.dialogBox.setOrigin(0,0);

    gameState.dialogText = scene.add.text(100, 400, text, { fill: "#000000" });
    gameState.dialogText.setOrigin(0,0);
}

class StartScreen extends Phaser.Scene {
    constructor () {
        super({key: 'StartScreen'});
    }
    preload () {
        this.load.image('ice', Ice);
        this.load.image('neutralbear', Bear);
    }
    create () {
        this.add.image(470, 300, 'ice');
        this.add.image(465, 255, 'neutralbear');
        const playButton = new Button(380, 375, 'Play', this, () => {
            this.scene.stop('StartScreen')
            this.scene.start('NavScreen')
        } )
        const instructionsButton = new Button(575, 375, 'How to Play', this, () => {
            this.scene.stop('StartScreen')
            this.scene.start('InstructionScreen')
        } )
    }
}

class NavScreen extends Phaser.Scene {
    constructor () {
        super({key: 'NavScreen'});
        this.score = 0;
    }

    preload () {
        this.load.image('bathselect', Bathselect);
        this.load.image('kitchenselect', Kitchenselect);
        this.load.image('arctic', Arctic)
        this.load.image('sadbear', Sad);
    }

    create () {
        const arcticBackground = this.add.image(915, 100, 'arctic')
        
        gameState.iceFloe = this.add.image(928, 125, 'ice');
        
        gameState.bear = this.add.image(920, 85, 'neutralbear');

        this.gameOverText = this.add.text(300, 300, 'Game Over', {fontSize: '30px', fill: '#000'})
        this.gameOverText.setOrigin(0,0);
        this.gameOverText.visible = false;
        
        var timerText;
        var timedEvent;
        
        function formatTime(seconds) {
           var minutes = Math.floor(seconds/60);
           var partInSeconds = seconds%60;
           
           partInSeconds = partInSeconds.toString().padStart(2,'0'); 
           return `${minutes}:${partInSeconds}`;
        }

        function countdownTime () {
            this.initialTime -= 1;
            timerText.setText(formatTime(this.initialTime));

            if (this.initialTime === 20 && gameState.iceSize < 2) {
                gameState.iceSize -= .25;
                gameState.iceFloe.setScale(gameState.iceSize);
            } else if (this.initialTime === 10 && gameState.iceSize < 2) {
                gameState.iceSize -= .25;
                gameState.iceFloe.setScale(gameState.iceSize);
            } else if (gameState.iceSize === 0.5 || this.initialTime === 0) {
                timedEvent.remove();
                this.gameOverText.visible = true;
                gameState.bear.destroy();
                this.add.image(920, 85, 'sadbear');
            } 
        }

       this.initialTime = 30;
       timerText = this.add.text(
           880, 
           300, 
           formatTime(this.initialTime), 
           { fontSize: '30px', fill: '#000000' }
        );

       timedEvent = this.time.addEvent({
           callback: countdownTime,
           delay: 1000,
           callbackScope: this,
           loop: true
       })

        const navBackground = this.add.rectangle(0, 0, 1632, 1248, 0x3a3a50)

        gameState.scoreText = this.add.text(900, 225, this.score, { fontSize: '40px', fill: '#000000' });

        const bathSelect = this.add.image(75, 10, 'bathselect');

        bathSelect.setScale(.25);

        bathSelect.setOrigin(0,0);

        bathSelect.setInteractive();

        bathSelect.on('pointerover', () => {
            bathSelect.setBlendMode(Phaser.BlendModes.SCREEN);
            this.bathroomText = this.add.text(200, 140, 'Bathroom', { fontSize: '32px', fill: '#000' });
            this.bathroomText.visible = true;
        })

        bathSelect.on('pointerout', () => {
            bathSelect.setBlendMode(Phaser.BlendModes.NORMAL);
            this.bathroomText.visible = false;
        })

        bathSelect.on('pointerdown', () => {
            this.scene.stop('NavScreen')
            this.scene.start('BathroomScene')
        })

        const kitchenSelect = this.add.image(171, 322, 'kitchenselect');

        kitchenSelect.setScale(.25);

        kitchenSelect.setOrigin(0,0);

        kitchenSelect.setInteractive();

        kitchenSelect.on('pointerover', () => {
            kitchenSelect.setBlendMode(Phaser.BlendModes.SCREEN);
            this.kitchenText = this.add.text(320, 450, 'Kitchen', { fontSize: '32px', fill: '#000' });
            this.kitchenText.visible = true;
        })

        kitchenSelect.on('pointerout', () => {
            kitchenSelect.setBlendMode(Phaser.BlendModes.NORMAL);
            this.kitchenText.visible = false;
        })

        kitchenSelect.on('pointerdown', () => {
            this.scene.stop('NavScreen')
            this.scene.start('KitchenScene')
        })
    }
}

class BathroomScene extends Phaser.Scene {
    constructor () {
        super({key: 'BathroomScene'});
        this.score = 0
    }
    preload () {
        this.load.image('bathroom', Bathroom);
        this.load.image('toilet', Toilet);
        this.load.image('shower', Shower);
        this.load.image('washer', Washer);
        this.load.image('ice', Ice);
        this.load.image('neutralbear', Bear);
        this.load.image('sadbear', Sad);
        this.load.image('happybear', Happy);
        this.load.image('arctic', Arctic)
    }
    create () {
        const bathroom = this.add.image(0, 0, 'bathroom');

        bathroom.setScale(.5);

        bathroom.setOrigin(0,0);


        const toilet = this.add.sprite(70, 130, 'toilet');

        toilet.setInteractive();

        toilet.on('pointerover', () => {
            toilet.setBlendMode(Phaser.BlendModes.SCREEN);
        })

        toilet.on('pointerout', () => {
            toilet.setBlendMode(Phaser.BlendModes.NORMAL);
        })
        
        toilet.on('pointerdown', () => {
            const correctParams = {
                key: 'toilet',
                type: 'none'
            }
            const wrongParams = {
                key: 'toilet',
                type: 'none'
            }
            new Dialog(
                gameState, 
                this, 
                "A perfectly clean toilet that you used earlier today.",
                correctParams,
                wrongParams
            )
        })

        const shower = this.add.sprite(480, 125, 'shower');

        shower.setInteractive();

        shower.on('pointerover', function() {
            this.setBlendMode(Phaser.BlendModes.SCREEN);
        })

        shower.on('pointerout', function() {
            this.setBlendMode(Phaser.BlendModes.NORMAL);
        })

        shower.on('pointerdown', () => {
            const correctParams = {
                x: 150,
                y: 450,
                question: "Less than 5 minutes",
                key: 'shower',
                type: 'correct'
            }
            const wrongParams = {
                x: 150,
                y: 480,
                question: "15-20 minutes",
                key: 'shower',
                type: 'wrong'
            }
            const correctExplainParams = {
                x: 150,
                y: 500,
                question: "Yes! Not only are you using less water",
                key: 'shower',
                type: 'correct'
            }
            new Dialog(
                gameState, 
                this, 
                "How long should you take a shower?", 
                correctParams, 
                wrongParams,
                correctExplainParams
            )
        })


        const washer = this.add.sprite(148, 469, 'washer');

        washer.setInteractive();

        washer.on('pointerover', function() {
            this.setBlendMode(Phaser.BlendModes.SCREEN);
        })

        washer.on('pointerout', function() {
            this.setBlendMode(Phaser.BlendModes.NORMAL);
        })

        washer.on('pointerdown', () => {
            const correctParams = {
                x: 150,
                y: 480,
                question: "Smaller loads with cold water",
                key: 'washer',
                type: 'correct'
            }
            const wrongParams = {
                x: 150,
                y: 450,
                question: "Larger loads with warm water",
                key: 'washer',
                type: 'wrong'
            }
            new Dialog(
                gameState, 
                this, 
                "How should you wash your laundry?", 
                correctParams, 
                wrongParams
            )
        })
        gameState.scoreText = this.add.text(900, 225, this.score, { fontSize: '40px', fill: '#000000' });

        const backFromBath = new Button(920, 375, 'Back', this, () => {
            this.scene.pause('BathroomScene')
            this.scene.start('NavScreen')
        } )

        // const menuButton = new Button(920, 375, 'Menu', this, () => {
        //     this.scene.restart('BathroomScene');
        //     this.scene.stop('BathroomScene');
        //     this.scene.start('StartScreen');            
        // } )
        
        const arcticBackground = this.add.image(915, 100, 'arctic')
        
        gameState.iceFloe = this.add.image(928, 125, 'ice');
        
        gameState.bear = this.add.image(920, 85, 'neutralbear');

        this.gameOverText = this.add.text(300, 300, 'Game Over', {fontSize: '30px', fill: '#000'})
        this.gameOverText.setOrigin(0,0);
        this.gameOverText.visible = false;
        
        var timerText;
        var timedEvent;
        
        function formatTime(seconds) {
           var minutes = Math.floor(seconds/60);
           var partInSeconds = seconds%60;
           
           partInSeconds = partInSeconds.toString().padStart(2,'0'); 
           return `${minutes}:${partInSeconds}`;
        }

        function countdownTime () {
            this.initialTime -= 1;
            timerText.setText(formatTime(this.initialTime));

            if (this.initialTime === 20 && gameState.iceSize < 2) {
                gameState.iceSize -= .25;
                gameState.iceFloe.setScale(gameState.iceSize);
            } else if (this.initialTime === 10 && gameState.iceSize < 2) {
                gameState.iceSize -= .25;
                gameState.iceFloe.setScale(gameState.iceSize);
            } else if (gameState.iceSize === 0.5 || this.initialTime === 0) {
                timedEvent.remove();
                this.gameOverText.visible = true;
                gameState.bear.destroy();
                this.add.image(920, 85, 'sadbear');
            } 
        }

       this.initialTime = 30;
       timerText = this.add.text(
           880, 
           300, 
           formatTime(this.initialTime), 
           { fontSize: '30px', fill: '#000000' }
        );

       timedEvent = this.time.addEvent({
           callback: countdownTime,
           delay: 1000,
           callbackScope: this,
           loop: true
       })
    }

    update() {
    }

}

class KitchenScene extends Phaser.Scene {
    constructor () {
        super({key: 'KitchenScene'});
    }

    preload () {
        this.load.image('kitchen', Kitchen);
    }

    create () {
        const kitchen = this.add.image(0, 0, 'kitchen');

        kitchen.setScale(.5);

        kitchen.setOrigin(0,0);

    }
}

class InstructionScreen extends Phaser.Scene {
    constructor () {
        super({key: 'InstructionScreen'});    
    }
    preload () {

    }
      
    create () {

        // const instructions = [
        //     "A polar bear in the arctic needs your help! Save your fluffy friend by using your mouse to click on objects around your home and correctly answer the quiz questions to keep your bear afloat before time runs out. Be careful: not all of the objects have quiz questions, so you'll have to look fast! "
        // ];

        // const instructionsText = this.add.text(300, 150, instructions, {fontFamily: 'Verdana', color: '#fff'});

        this.make.text({
            x: 250,
            y: 175,
            text: 'A polar bear in the arctic needs your help! Save your fluffy friend by using your mouse to click on objects around your home and correctly answer the quiz questions to keep your bear afloat before time runs out. Be careful: not all of the objects have quiz questions, so you have to look fast!',
            origin: { x: 0, y: 0 },
            style: {
                font: 'bold 20px Arial',
                fill: 'white',
                align: 'center',
                wordWrap: { width: 450 }
            }
        });

        const backButton = new Button(450, 500, 'Back', this, () => {
            this.scene.stop('InstructionScreen')
            this.scene.start('StartScreen')
        } )

        backButton.button.setStyle({ fontFamily: 'Verdana' })
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1015,
    height: 624,
    backgroundColor: '#74c1de',
    scene: [StartScreen, InstructionScreen, NavScreen, BathroomScene, KitchenScene]
};

const game = new Phaser.Game(config);
