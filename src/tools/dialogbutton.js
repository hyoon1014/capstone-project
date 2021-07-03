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
  }
  handleWrongAnswer() {
    if (!this.gameState[this.key].isAnswered) {
      this.gameState[this.key].isAnswered = true;
      this.button.setStyle({ fill: '#f00' });
      this.gameState.score -= 5;
      this.gameState.scoreText.setText(`${ this.gameState.score }`);
    }
  }

  handleCorrectAnswer() {
    if (!this.gameState[this.key].isAnswered) {
      this.gameState[this.key].isAnswered = true;
      this.gameState[this.key].isCorrect = true;
      this.button.setStyle({ fill: '#008000' });
      this.gameState.score += 10;
      this.gameState.scoreText.setText(`${ this.gameState.score }`);
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