import ExplainAnswer from './explanation'

class DialogButton {
  constructor(x, y, label, scene, gameState, key, type) {
    this.gameState = gameState
    this.key = key
    this.type = type
    this.button = scene.add.text(x, y, label)
        .setOrigin(0,0)
        .setPadding(5)
        .setStyle({ backgroundcolor: '#FFF' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          if (type === 'correct') {
            this.handleCorrectAnswer();
          } else if (type === 'wrong') {
            this.handleWrongAnswer();
          } else {
            this.handleNeutralAnswer();
          }
        })
        .on('pointerover', () => {
          if (!gameState[key].isAnswered) {
            this.button.setStyle({ fill: '#118ac6'});
          }
        })
        .on('pointerout', () => {
          if (!gameState[key].isAnswered) {
            this.button.setStyle({ fill: '#000' });
          }
        })
    this.displayTextColor();
    // this.changeBear();
  }
  handleWrongAnswer() {
    if (!this.gameState[this.key].isAnswered && this.gameState.iceSize < 2) {
      this.gameState[this.key].isAnswered = true;
      this.button.setStyle({ fill: '#f00' });
      this.gameState.score -= 5;
      this.gameState.scoreText.setText(`${ this.gameState.score }`);
      this.gameState.iceSize -= .25;
      this.gameState.iceFloe.setScale(this.gameState.iceSize);
    }
  }

  handleCorrectAnswer() {
    if (!this.gameState[this.key].isAnswered && this.gameState.iceSize < 2) {
      this.gameState[this.key].isAnswered = true;
      this.gameState[this.key].isCorrect = true;
      this.button.setStyle({ fill: '#008000' });
      this.gameState.score += 10;
      this.gameState.scoreText.setText(`${ this.gameState.score }`);
      this.gameState.iceSize += .25;
      this.gameState.iceFloe.setScale(this.gameState.iceSize);
      // return new ExplainAnswer ()
    }
  }

  handleNeutralAnswer() {
    if (this.gameState[this.key].isAnswered && this.type !== 'correct' && this.type !== 'wrong') {
      this.button.setStyle({ fill: '#000' });
    }
  }

  displayTextColor() {
    if (this.gameState[this.key].isCorrect && this.type === 'correct') {
      this.button.setStyle({ fill: '#008000' });
    } else if (!this.gameState[this.key].isCorrect && this.gameState[this.key].isAnswered && this.type === 'wrong') {
      this.button.setStyle({ fill: '#f00' });
    } else {
      this.button.setStyle({ fill: '#000' })
    }
  }

  destroy() {
    this.button.destroy();
  }

  // changeBear() {
  //   if (this.gameState.iceSize > 1 && this.gameState.bear) {
  //       console.log('Ice size works');
  //       this.gameState.bear.destroy();
  //       this.gameState.bear = this.scene.add.image(920, 80, 'happybear');
  //   } else if (this.gameState.iceSize < 1 && this.gameState.bear) {
  //       this.gameState.bear.destroy();
  //       // this.add.image(920, 80, 'sadbear');
  //   } else {
  //       this.gameState.bear.destroy();
  //       // this.add.image(920, 100, 'neutralbear');
  //   }
  // }
}

export default DialogButton

//this.gameState => our gameState
//this.key => the name of our object('washer', 'shower')
//this.gameState[this.key] => gameState['washer'] => gameState.washer
//this.gameState[this.key].isCorrect => gameState.washer.isCorrect
//To explain: "If the answer is correct and this is the correct type, then we show the text as green"
//"Else if the answer is not correct and it was already answered and if it is the wrong type, then we show the text as red"
//"Else then the text shows black"
//Note that in order for these conditions to happen, the order of priority is top to bottom (order matters) and all of them must be true because of &&
//Also note that in displayTextColor() no need to put .isAnswered because if in order for it to be correct, it has to be answered (so it's implied), but for the wrong answer it needs to be clarified