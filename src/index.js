import Phaser, { Core } from 'phaser';
import Button from './tools/button'
import DialogButton from './tools/dialogbutton'
import CloseButton from './tools/closebutton'
import Dialog from './tools/dialog'

import Bathroom from './assets/bathroom.png';
import Toilet from './assets/toilet.png';
import Shower from './assets/showerset.png';
import Washer from './assets/washer.png';
import Ice from './assets/ice.png';
import Bear from './assets/bear.png';
import Sad from './assets/bearsad.png';
import Happy from './assets/bearhappy.png';
import Arctic from './assets/arcticbackgroundborder.png';
import Kitchen from './assets/kitchen.png';
import Navigation from './assets/navscreen.png';
import Bathselect from './assets/bathroomselect.png';


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
        const playButton = new Button(350, 375, 'Play', this, () => {
            this.scene.stop('StartScreen')
            this.scene.start('NavScreen')
        } )
        const instructionsButton = new Button(500, 375, 'How to Play', this, () => {
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
        this.load.image('navigation', Navigation);
        this.load.image('bathselect', Bathselect);
    }

    create () {
        // const navigationArea = this.add.image(0, 0, 'navigation');

        // navigationArea.setScale(.5);

        // navigationArea.setOrigin(0,0);

        const navBackground = this.add.rectangle(0, 0, 1632, 1248, 0x3a3a50)

        gameState.scoreText = this.add.text(900, 225, this.score, { fontSize: '40px', fill: '#000000' });

        const bathSelect = this.add.image(75, 18, 'bathselect');

        bathSelect.setScale(.25);

        bathSelect.setOrigin(0,0);

        bathSelect.setInteractive();

        bathSelect.on('pointerover', () => {
            bathSelect.setBlendMode(Phaser.BlendModes.SCREEN);
        })

        bathSelect.on('pointerout', () => {
            bathSelect.setBlendMode(Phaser.BlendModes.NORMAL);
        })

        bathSelect.on('pointerdown', () => {
            this.scene.stop('NavScreen')
            this.scene.start('BathroomScene')
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
            new Dialog(
                gameState, 
                this, 
                "How long should you take a shower?", 
                correctParams, 
                wrongParams
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

        const menuButton = new Button(920, 375, 'Menu', this, () => {
            this.scene.restart('BathroomScene');
            this.scene.stop('BathroomScene');
            this.scene.start('StartScreen');            
        } )
        
        const arcticBackground = this.add.image(915, 100, 'arctic')
        
        gameState.iceFloe = this.add.image(928, 125, 'ice');
        
        gameState.bear = this.add.image(920, 85, 'neutralbear');
        
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
                //put Game Over scene here and also make current scene unclickable
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

    }
}

class InstructionScreen extends Phaser.Scene {
    constructor () {
        super({key: 'InstructionScreen'});    
    }
    preload () {

    }
      
    create () {

        const instructions = [
            "Instructions here"
        ];

        const instructionsText = this.add.text(300, 150, instructions, {fontFamily: 'Verdana', color: '#fef01a'});

        const backButton = new Button(400, 500, 'Back', this, () => {
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
