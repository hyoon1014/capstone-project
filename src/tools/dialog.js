class Dialog {
  constructor(gameState, scene, question) {
    this.gameState = gameState;
    this.scene = scene;
    this.question = question;
    this.renderDialog();
  }
  renderDialog() {
    if (this.gameState.dialogBox) {
      this.gameState.dialogBox.destroy();
      this.gameState.dialogText.destroy();
    }

    this.gameState.dialogBox = this.scene.add.rectangle(75, 350, 600, 200, 0xffffff)
    this.gameState.dialogBox.strokeColor = 0x000000;
    this.gameState.dialogBox.strokeWeight = 3;
    this.gameState.dialogBox.isStroked = true;
    this.gameState.dialogBox.setOrigin(0,0);

    this.gameState.dialogText = this.scene.add.text(100, 400, this.question, { fill: "#000000" });
    this.gameState.dialogText.setOrigin(0,0);
  }
}

export default Dialog