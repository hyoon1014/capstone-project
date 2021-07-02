class DialogButton {
  constructor(x, y, label, scene, gameState, key, type) {
    this.gameState = gameState
    this.key = key
    this.button = scene.add.text(x, y, label)
        .setOrigin(0,0)
        .setPadding(5)
        .setStyle({ backgroundcolor: '#FFF' })
        .setStyle({ fill: '#000' })
        .setInteractive({ useHandCursor: true })

        .on('pointerdown', () => {
          if (type === 'correct') {
            this.handleCorrectAnswer();
          } else if (type === 'wrong') {
            this.handleWrongAnswer();
          }
        })
        .on('pointerover', () => {
          if (!gameState[key]) {
            this.button.setStyle({ fill: '#118ac6'});
          }
        })
        .on('pointerout', () => {
          if (!gameState[key]) {
            this.button.setStyle({ fill: '#000' });
          }
        })
  }
  handleWrongAnswer() {
    if (!this.gameState[this.key]) {
      this.gameState[this.key] = true;
      this.button.setStyle({ fill: '#f00' });
      this.gameState.score -= 5;
      this.gameState.scoreText.setText(`${ this.gameState.score }`);
    }
  }

  handleCorrectAnswer() {
    if (!this.gameState[this.key]) {
      this.gameState[this.key] = true;
      this.button.setStyle({ fill: '#008000' });
      this.gameState.score += 10;
      this.gameState.scoreText.setText(`${ this.gameState.score }`);
    }
  }
}

export default DialogButton