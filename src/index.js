import Phaser from 'phaser';
import Button from './tools/button'
import DialogButton from './tools/dialogbutton'

import FryingPan from './assets/fryingpan.jpeg';
import KitchenSink from './assets/kitchensink.png';
import Bear from './assets/spritebear.png';

import Bathroom from './assets/bathroom.png';
import Toilet from './assets/toilet.png';
import Shower from './assets/showerset.png';
import Washer from './assets/washer.png';

let gameState = {
    score: 0, 
    showerIsAnswered: false
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
    preload () 
    {
        // this.load.image('fryingpan', FryingPan);
        // this.load.image('kitchensink', KitchenSink);
        // this.load.image('bear', Bear);
        this.load.image('bathroom', Bathroom);
        this.load.image('toilet', Toilet);
        this.load.image('shower', Shower);
        this.load.image('washer', Washer);
    }
    create () 
    {
        

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
            renderDialog(this, "How long should you take a shower?")

            const CorrectShowerButton = this.add.text(150, 450, "Less than 5 minutes", { fill: '#000' });

            CorrectShowerButton.setInteractive();

            CorrectShowerButton.on('pointerover', () => {
                if(!gameState.showerIsAnswered) {
                    CorrectShowerButton.setStyle({ fill: '#118ac6' })
                }
            })
            
            CorrectShowerButton.on('pointerout', () => {
                if(!gameState.showerIsAnswered) {
                    CorrectShowerButton.setStyle({ fill: '#000' })
                }
            })

            CorrectShowerButton.on('pointerup', () => {
                gameState.showerIsAnswered = true;
                CorrectShowerButton.setStyle({ fill: '#008000' });
                gameState.score += 10;
                gameState.scoreText.setText(`${gameState.score}`); 
            })

            
            const WrongShowerButton = this.add.text(150, 480, "Less than 5 minutes", { fill: '#000' });

            WrongShowerButton.setInteractive();

            WrongShowerButton.on('pointerover', () => WrongShowerButton.setStyle({ fill: '#118ac6' }))
                WrongShowerButton.on('pointerout', () => WrongShowerButton.setStyle({ fill: '#000' }))

            // const CorrectShowerButton = new DialogButton(150, 450, 'Less than 5 minutes', this, () => {})
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
            renderDialog(this, "How should you wash your laundry?")

            const WrongWasherButton = this.add.text(150, 450, "Larger loads with warm water", { fill: '#000' });

            WrongWasherButton.setInteractive();

            WrongWasherButton.on('pointerover', () => WrongWasherButton.setStyle({ fill: '#118ac6' }))
                .on('pointerout', () => WrongWasherButton.setStyle({ fill: '#000' }))

            
            const CorrectWasherButton = this.add.text(150, 480, "Smaller loads with cold water", { fill: '#000' });

            CorrectWasherButton.setInteractive();

            CorrectWasherButton.on('pointerover', () => CorrectWasherButton.setStyle({ fill: '#118ac6' }))
                .on('pointerout', () => CorrectWasherButton.setStyle({ fill: '#000' }))
                .on('pointerup', () => {
                    gameState.score += 10;
                    gameState.scoreText.setText(`${gameState.score}`);

                    gameState.dialogBox.destroy();
                    gameState.dialogText.destroy();
                    CorrectWasherButton.destroy();
                    WrongWasherButton.destroy();
                })
        })
        // washer.on('pointerup', () => {
            
        //         const useButton = new Button(230, 472, 'Turn off', this, () => {
    
        //         })
                
        //         const closeButton = new Button(230, 510, 'Close', this, () => {
        //             closeButton.button.destroy();
        //             useButton.button.destroy();
    
        //             })
        //     })
        

       gameState.scoreText = this.add.text(700, 150, this.score, { fontSize: '25px', fill: '#ff00ae' });

        // const firstRoom = this.add.rectangle(300, 350, 500, 400, 0xa55005);
        
        // const bear = this.add.sprite(200, 350, 'bear');

        // bear.setScale(1);

        // const fryingPan = this.add.sprite(300, 350, 'fryingpan');

        // fryingPan.setScale(.1);

        // fryingPan.setInteractive();

        // fryingPan.on('pointerover', function () {
        //     this.setBlendMode(Phaser.BlendModes.SCREEN);
        // })

        // fryingPan.on('pointerout', function() {
        //     this.setBlendMode(Phaser.BlendModes.NORMAL);
        // })

        // fryingPan.on('pointerup', () => {
        //     // this.add.rectangle(450, 350, 50, 25, 0xffffff);
        //     // this.add.text(425, 345, "Use", { fill: '#002bff' });
        //     const useButton = new Button(375, 350, 'Use', this, () => {
                
        //     })

        //     const closeButton = new Button(375, 400, 'Close', this, () => {
        //         closeButton.button.destroy();
        //         useButton.button.destroy();
        //     })
        // })

        // const kitchenSink = this.add.sprite(400, 350, 'kitchensink');

        // kitchenSink.setScale(.05);

        // kitchenSink.setInteractive();

        // kitchenSink.on('pointerover', function () {
        //     this.setBlendMode(Phaser.BlendModes.SCREEN);
        // })

        // kitchenSink.on('pointerout', function () {
        //     this.setBlendMode(Phaser.BlendModes.NORMAL);
        // })

        // kitchenSink.on('pointerup', () => {
            
        //     const useButton = new Button(470, 350, 'Turn off', this, () => {

        //     })
            
        //     const closeButton = new Button(470, 400, 'Close', this, () => {
        //         closeButton.button.destroy();
        //         useButton.button.destroy();

        //         })
        // })
    }

    update() {
    
    }

}

class InstructionScreen extends Phaser.Scene {
    constructor () 
    {
        super({key: 'InstructionScreen'});
        
    }
    preload ()
    {

    }
      
    create ()
    {

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
    width: 822,
    height: 632,
    scene: [StartScreen, InstructionScreen, FirstScene]
};

const game = new Phaser.Game(config);
