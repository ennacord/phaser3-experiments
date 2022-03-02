import Phaser, { Scene } from 'phaser';
import { DEFAULT_DIALOG_LINE_CREATE_OPTS, DialogLine } from '../objects/DialogLine';

export default class Demo extends Phaser.Scene {
	dialogLine?: IDialogLine;

	constructor() {
		super('GameScene');
	}

	preload() {
		DialogLine.preload(this);
	}

	create() {
		this.dialogLine = this.add.dialogLine(DEFAULT_DIALOG_LINE_CREATE_OPTS);
	}

	update() {
		this.dialogLine?.update(this);
	}
}
