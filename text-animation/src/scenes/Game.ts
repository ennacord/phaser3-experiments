import Phaser, { Scene } from 'phaser';

const displayCallback = (scene: Scene): Phaser.Types.GameObjects.BitmapText.DisplayCallback => (display) => {
  display.y = display.y + display.index + scene.time.now / 200;
  return display;
}

const dummyText = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Praesent eu nibh congue quam pellentesque tincidunt non sit amet eros.',
  'Nulla id sem non risus vehicula volutpat.',
  'Quisque tincidunt orci quis erat dignissim, pellentesque rhoncus augue porttitor.',
  'Aliquam at massa interdum, tempor tellus iaculis, accumsan massa.',
  'Morbi vel turpis quis nisi euismod molestie nec et tellus.',
  'Aenean sollicitudin libero quis laoreet luctus.',
  'Ut molestie elit non porta dapibus.',
  'Curabitur commodo nibh dictum, vestibulum nibh a, facilisis ante.',
  'Fusce egestas magna sed imperdiet tincidunt.',
  'In quis massa tempus, vehicula lectus quis, pharetra ipsum.',
  'Nam eu nisi ac arcu feugiat ultrices sed eu neque.',
  'Curabitur fermentum felis et sodales venenatis.',
  'Mauris at erat accumsan, sollicitudin mauris nec, lobortis justo.',
  'In pharetra leo sed convallis molestie.',
  'Praesent sit amet mauris vel libero consectetur laoreet.',
  'Quisque dignissim augue a ullamcorper consectetur.',
  'Nunc consequat risus tincidunt, tempus felis sed, faucibus mauris.',
  'Sed eu lacus consequat, semper lorem a, porttitor arcu.'
];

export default class Demo extends Phaser.Scene {
  text1: Phaser.GameObjects.Text | undefined;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.bitmapFont('inter', 'assets/inter-regular-outline-2_0.png', 'assets/inter-regular-outline-2.fnt');
  }

  create() {
    const text2 = this.add.dynamicBitmapText(200, 200, 'inter', dummyText[0], 32);
    text2.setDisplayCallback(displayCallback(this));
  }

  update() {
  }
}
