import CloseButton from './closebutton'
import DialogButton from './dialogbutton';

class Dialog {
  constructor(gameState, scene, question, correctParams, wrongParams) {
    this.gameState = gameState;
    this.scene = scene;
    this.question = question;
    this.renderDialog();
    this.correctParams = correctParams;
    this.correctButton = this.createCorrectButton();
    this.wrongParams = wrongParams;
    this.wrongButton = this.createWrongButton();
    this.closeButton = this.createCloseButton();
    this.closeButton.button.on('pointerdown', () => this.closeDialogBox())
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
  createCloseButton() {
    return new CloseButton(650, 350, 'X', this.scene)
  }
  createCorrectButton() {
    return new DialogButton(
      this.correctParams.x,
      this.correctParams.y,
      this.correctParams.question,
      this.scene,
      this.gameState,
      this.correctParams.key,
      this.correctParams.type
    )
  }
  createWrongButton() {
    return new DialogButton(
      this.wrongParams.x,
      this.wrongParams.y,
      this.wrongParams.question,
      this.scene,
      this.gameState,
      this.wrongParams.key,
      this.wrongParams.type
    )
  }
  closeDialogBox() {
    this.gameState.dialogBox.destroy();
    this.gameState.dialogText.destroy();
    this.correctButton.destroy();
    this.wrongButton.destroy();
    this.closeButton.destroy();
    
  }
}

export default Dialog