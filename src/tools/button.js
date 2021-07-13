class Button {
  constructor(x, y, label, scene, callback) {
      this.button = scene.add.text(x, y, label)
          .setOrigin(0.5,0)
          .setPadding(10)
          .setStyle({ backgroundColor: '#111' })
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => callback())
          .on('pointerover', () => {
            this.button.setStyle({ fill: '#f39c12' })
            this.button.setScale(1.25);
          })
          .on('pointerout', () => {
            this.button.setStyle({ fill: '#FFF' })
            this.button.setScale(1);
          });
  }
}

export default Button