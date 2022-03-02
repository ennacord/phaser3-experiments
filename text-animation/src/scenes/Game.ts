import Phaser, { Scene } from 'phaser';
import { DEFAULT_DIALOG_LINE_CREATE_OPTS, DialogLine, DialogLineUpdateAction } from '../objects/DialogLine';

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
		this.input.on('pointerdown', () => {
			this.dialogLine?.update(this, { dialogLineUpdate: DialogLineUpdateAction.FORCE_NEXT_STATE });
		});
	}

	update() {
		this.dialogLine?.update(this, {});
	}
}
