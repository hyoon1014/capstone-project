class CloseButton {
  constructor(x, y, label, scene, callback) {
    this.button = scene.add.text(x, y, label)
        .setOrigin(0,0)
        .setPadding(5)
        .setStyle({ fontSize: '20px', fill: '#000', backgroundcolor: '#FFF' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => callback())
        .on('pointerover', () => this.button.setStyle({ fill: '#118ac6'}))
        .on('pointerout', () => this.button.setStyle({ fill: '#000' }));
  }
}

export default CloseButton