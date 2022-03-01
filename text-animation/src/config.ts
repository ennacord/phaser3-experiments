import Phaser from 'phaser';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from './constants';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  scale: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
