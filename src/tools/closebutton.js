class CloseButton {
  constructor(x, y, label, scene) {
    this.scene = scene;
    this.button = this.scene.add.text(x, y, label)
        .setOrigin(0,0)
        .setPadding(5)
        .setStyle({ fontSize: '20px', fill: '#000', backgroundcolor: '#FFF' })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.button.setStyle({ fill: '#118ac6'}))
        .on('pointerout', () => this.button.setStyle({ fill: '#000' }));
  }
  destroy() {
    this.button.destroy();
  }
}

export default CloseButton