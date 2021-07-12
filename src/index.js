import Phaser, { Core } from 'phaser';
import Button from './tools/button'
import DialogButton from './tools/dialogbutton'
import CloseButton from './tools/closebutton'
import Dialog from './tools/dialog'

import Bathroom from './assets/bathroom.png';
import Toilet from './assets/toilet.png';
import Shower from './assets/showerset.png';
import Washer from './assets/washer.png';
import Ice from './assets/icefloe.png';
import NeutralBear from './assets/neutralbear.png';

let gameState = {
    score: 0,
    iceSize: 2,
    isDialogOpen: false,
    shower: {
        isAnswered: false,
        isCorrect: false
    },
    washer: {
        isAnswered: false,
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

class StartScreen extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'StartScreen'});
    }

    preload ()
    {
        
    }
      
    create ()
    {
        const playButton = this.add.rectangle(200, 260, 150, 50, 0x6fc4fc);
        
        playButton.setInteractive();

        playButton.on('pointerup', () => {
            this.scene.stop ('StartScreen')
            this.scene.start ('FirstScene')

        })
        
        const playButtonText = this.add.text(175, 250, "Play", {fill: '#83a1a7'});
        
        playButtonText.setInteractive();

        playButtonText.on('pointerover', () => playButtonText.setStyle({fill: '#fef01a'}) )
            .on('pointerout', () => playButtonText.setStyle({ fill: '#83a1a7'}))

        playButtonText.on('pointerup', () => {
            this.scene.stop ('StartScreen')
            this.scene.start ('FirstScene')
        })


        const instructionsButton = this.add.rectangle(400, 260, 150, 50, 0x6fc4fc);
            instructionsButton.setInteractive();

            instructionsButton.on('pointerup', () => {
                this.scene.stop ('StartScreen')
                this.scene.start ('InstructionScreen')
            })



        const instructionsButtonText = this.add.text(350, 250, "How to Play", {fill: '#83a1a7'});
            instructionsButtonText.setInteractive();

            instructionsButtonText.on('pointerover', () => instructionsButtonText.setStyle({ fill: '#fef01a'}) )
                .on('pointerout', () => instructionsButtonText.setStyle({ fill: '#83a1a7'}))
            
            instructionsButtonText.on('pointerup', () => {
                this.scene.stop ('StartScreen')
                this.scene.start ('InstructionScreen')
            })

    }
}

class FirstScene extends Phaser.Scene {
    constructor () {

        super({key: 'FirstScene'});
        this.score = 0
    }
    preload () {
        this.load.image('bathroom', Bathroom);
        // this.load.image('toilet', Toilet);
        this.load.image('shower', Shower);
        this.load.image('washer', Washer);
        this.load.image('ice', Ice);
        this.load.image('neutralbear', NeutralBear);
    }
    create () {
        const bathroom = this.add.image(0, 0, 'bathroom');

        bathroom.setScale(.5);

        bathroom.setOrigin(0,0);


        // const toilet = this.add.sprite(75, 130, 'toilet');

        // toilet.setInteractive();

        // toilet.on('pointerover', () => {
        //     toilet.setBlendMode(Phaser.BlendModes.SCREEN);
        // })

        // toilet.on('pointerdown', () => {
        //     renderDialog(this, "Would you like to flush the toilet?")
        // })

        // toilet.on('pointerout', () => {
        //     toilet.setBlendMode(Phaser.BlendModes.NORMAL);
        // })


        const shower = this.add.sprite(484, 128, 'shower');

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


        const washer = this.add.sprite(152, 472, 'washer');

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

       gameState.scoreText = this.add.text(700, 150, this.score, { fontSize: '25px', fill: '#ff00ae' });
       
       const arcticBackground = this.add.rectangle(922, 100, 200, 200, 0x74c1de);
       gameState.iceFloe = this.add.image(922, 100, 'ice');
       gameState.iceFloe.setScale(2);
    // gameState.iceFloe = this.add.rectangle(700, 50, 150, 20, 0x6fc4fc);

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

            if (this.initialTime === 20 && gameState.iceSize < 4) {
                gameState.iceSize -= .25;
                gameState.iceFloe.setScale(gameState.iceSize);
            } else if (this.initialTime === 10 && gameState.iceSize < 4) {
                gameState.iceSize -= .25;
                gameState.iceFloe.setScale(gameState.iceSize);
            } else if (this.initialTime === 0) {
                timedEvent.remove();
                //put Game Over scene here and also make current scene unclickable
            }
        }

       this.initialTime = 30;
       timerText = this.add.text(
           680, 
           200, 
           formatTime(this.initialTime), 
           { fontSize: '30px' }
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
    width: 1022,
    height: 632,
    scene: [StartScreen, InstructionScreen, FirstScene]
};

const game = new Phaser.Game(config);
