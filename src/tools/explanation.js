class ExplainAnswer {
  constructor(x, y, label, scene, gameState, key, type) {
    this.gameState = gameState
    this.key = key
    this.type = type
    this.button = scene.add.text(x, y, label)
        .setOrigin(0,0)
        .setPadding(5)
        .setStyle({ backgroundcolor: '#FFF' })
        // .setInteractive({ useHandCursor: true })
        // .on('pointerdown', () => {
        //   if (type === 'correct') {
        //     this.handleCorrectAnswer();
        //   } else if (type === 'wrong') {
        //     this.handleWrongAnswer();
        //   } else {
        //     this.handleNeutralAnswer();
        //   }
        // })
        // .on('pointerover', () => {
        //   if (!gameState[key].isAnswered) {
        //     this.button.setStyle({ fill: '#118ac6'});
        //   }
        // })
        // .on('pointerout', () => {
        //   if (!gameState[key].isAnswered) {
        //     this.button.setStyle({ fill: '#000' });
        //   }
        // })
  }
  destroy() {
    this.button.destroy();
  }
}

export default ExplainAnswer