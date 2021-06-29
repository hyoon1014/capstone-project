import Phaser from 'phaser';
import Button from './tools/button'

import FryingPan from './assets/fryingpan.jpeg';
import KitchenSink from './assets/kitchensink.png';
import Bear from './assets/spritebear.png';

import Bathroom from './assets/bathroom.png';
import Toilet from './assets/toilet.png';
import Shower from './assets/showerset.png';
import Washer from './assets/washer.png';

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


        const toilet = this.add.sprite(75, 130, 'toilet');

        toilet.setInteractive();

        toilet.on('pointerover', function() {
            this.setBlendMode(Phaser.BlendModes.SCREEN);
        })

        toilet.on('pointerout', function() {
            this.setBlendMode(Phaser.BlendModes.NORMAL);
        })


        const shower = this.add.sprite(484, 128, 'shower');

        shower.setInteractive();

        shower.on('pointerover', function() {
            this.setBlendMode(Phaser.BlendModes.SCREEN);
        })

        shower.on('pointerout', function() {
            this.setBlendMode(Phaser.BlendModes.NORMAL);
        })


        const washer = this.add.sprite(152, 472, 'washer');

        washer.setInteractive();

        washer.on('pointerover', function() {
            this.setBlendMode(Phaser.BlendModes.SCREEN);
        })

        washer.on('pointerout', function() {
            this.setBlendMode(Phaser.BlendModes.NORMAL);
        })

        washer.on('pointerup', () => {
            
                const useButton = new Button(230, 472, 'Turn off', this, () => {
    
                })
                
                const closeButton = new Button(230, 510, 'Close', this, () => {
                    closeButton.button.destroy();
                    useButton.button.destroy();
    
                    })
            })
        

        const score = this.add.text(700, 150, this.score, { fill: '#ff00ae' });

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
