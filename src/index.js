import Phaser from 'phaser';
import Button from './tools/button'

import FryingPan from './assets/fryingpan.jpeg';
import KitchenSink from './assets/kitchensink.png';

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

    }
    preload () 
    {
        this.load.image('fryingpan', FryingPan);
        this.load.image('kitchensink', KitchenSink);
    }
    create () 
    {

        const firstRoom = this.add.rectangle(400, 350, 400, 300, 0xa55005);
        
        const fryingPan = this.add.sprite(400, 350, 'fryingpan');

        fryingPan.setScale(.1);

        fryingPan.setInteractive();

        fryingPan.on('pointerover', function () {
            this.setBlendMode(Phaser.BlendModes.SCREEN);
        })

        fryingPan.on('pointerout', function() {
            this.setBlendMode(Phaser.BlendModes.NORMAL);
        })

        fryingPan.on('pointerup', () => {
            // this.add.rectangle(450, 350, 50, 25, 0xffffff);
            // this.add.text(425, 345, "Use", { fill: '#002bff' });
            const useButton = new Button(450, 350, 'Use', this, () => {
                
            })

            const closeButton = new Button(450, 400, 'Close', this, () => {
                closeButton.button.destroy();
                useButton.button.destroy();
            })
        })

        const kitchenSink = this.add.sprite(500, 350, 'kitchensink');

        kitchenSink.setScale(.05);

        kitchenSink.setInteractive();

        kitchenSink.on('pointerover', function () {
            this.setBlendMode(Phaser.BlendModes.SCREEN);
        })

        kitchenSink.on('pointerout', function () {
            this.setBlendMode(Phaser.BlendModes.NORMAL);
        })

        kitchenSink.on('pointerup', () => {
            const useButton = new Button(550, 350, 'Use', this, () => {
            
            })
            
            const closeButton = new Button(550, 400, 'Close', this, () => {
                closeButton.button.destroy();
                useButton.button.destroy();
            })
        })
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
    width: 800,
    height: 600,
    scene: [StartScreen, InstructionScreen, FirstScene]
};

const game = new Phaser.Game(config);
