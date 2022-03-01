import Phaser, { Scene } from 'phaser';
import { WINDOW_WIDTH } from '../constants';
import { Dialog } from '../objects/Dialog';

export default class Demo extends Phaser.Scene {

  dialog = new Dialog();

  constructor() {
    super('GameScene');
  }

  preload() {
    this.dialog.preload(this);
  }

  create() {
    this.dialog.create(this);
  }

  update() {
    this.dialog.update(this);
  }
}
