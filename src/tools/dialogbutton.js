class DialogButton {
  constructor(x, y, label, scene, callback) {
    this.button = scene.add.text(x, y, label)
        .setOrigin(0,0)
        .setPadding(5)
        .setStyle({ backgroundcolor: '#FFF' })
        .setStyle({ fill: '#000' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => callback())
        .on('pointerover', () => this.button.setStyle({ fill: '#118ac6'}))
        .on('pointerout', () => this.button.setStyle({ fill: '#000' }));
  }
}

export default DialogButton