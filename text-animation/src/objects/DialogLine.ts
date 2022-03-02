import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants";
import Phaser from 'phaser';

const dummyText = 'Lorem ipsum dolor sit amet.';

const VERY_LONG_TIME = 1000 * 60 * 30; // 30 mins
const VERY_FAR_AWAY = WINDOW_HEIGHT * 5;

export enum DialogLineState {
	ACTIVATING, // the line is animating to progressively show text
	ACTIVE, // the line is showing all its text, and it is the active line
	DEACTIVATED, // the line is showing all its text, and it is no longer the active line
};

export enum DialogLineUpdateAction {
	NOOP,
	FORCE_NEXT_STATE,
}

type DisplayCallbackFactory = (params: {
	timerEvent: Phaser.Time.TimerEvent,
	step: number,
	lastI: number,
	getState: () => DialogLineState,
	transitionState: () => void,
}) => Phaser.Types.GameObjects.BitmapText.DisplayCallback;

const displayCallbackFactory: DisplayCallbackFactory = ({ timerEvent, step, lastI, getState, transitionState }): Phaser.Types.GameObjects.BitmapText.DisplayCallback => (display) => {
	switch (getState()) {
	case DialogLineState.ACTIVATING:
		// hide letter while it's still animating and not time for it to show
		if (timerEvent.getElapsed() < step * display.index) {
			display.y += VERY_FAR_AWAY;
		// when it's time for the last character to show, transition state.
		} else if (display.index === lastI) {
			transitionState();
		}
		break;
	case DialogLineState.ACTIVE:
		if (display.index === lastI) {
			if (timerEvent.getElapsed() >= 1000) {
				display.y += VERY_FAR_AWAY;
			}
		}
		break;
	case DialogLineState.DEACTIVATED:
		if (display.index === lastI) {
			display.y += VERY_FAR_AWAY;
		}
		break;
	}
	return display;
};

export const DEFAULT_DIALOG_LINE_CREATE_OPTS: IDialogLineCreateOpts = {
	x: WINDOW_WIDTH / 8,
	y: WINDOW_HEIGHT / 8,
	width: WINDOW_WIDTH * 3 / 4,
	size: 32,
	step: 100,
};

export interface IDialogLineUpdateOpts {
	dialogLineUpdate?: DialogLineUpdateAction;
}

export class DialogLine extends Phaser.GameObjects.Container implements IDialogLine {
	text: Phaser.GameObjects.DynamicBitmapText;
	debugText?: Phaser.GameObjects.Text;
	timerEvent: Phaser.Time.TimerEvent;
	state: DialogLineState = DialogLineState.ACTIVATING;

	static preload(scene: Phaser.Scene) {
		scene.load.image('logo', 'assets/phaser3-logo.png');
		scene.load.bitmapFont('inter', 'assets/inter-regular-outline-2_0.png', 'assets/inter-regular-outline-2.fnt');
	}

	constructor(scene: Phaser.Scene, { x, y, width, size, step }: IDialogLineCreateOpts) {
		super(scene);

		const timerEvent = scene.time.addEvent({ delay: VERY_LONG_TIME, repeat: 0 });
		this.timerEvent = timerEvent;

		const lastI = dummyText.length;
		const textToRender = `${dummyText}‣`;
		const text = scene.add.dynamicBitmapText(x, y, 'inter', textToRender, size);
		text.setMaxWidth(width);
		text.setDisplayCallback(displayCallbackFactory({ timerEvent, step, lastI, getState: () => this.state, transitionState: this.transitionState.bind(this) }));
		this.text = text;
	}

	update<T extends IDialogLineUpdateOpts>(scene: Phaser.Scene, { dialogLineUpdate }: T) {
		if (dialogLineUpdate === DialogLineUpdateAction.FORCE_NEXT_STATE) {
			this.transitionState();
		}
		this.debugText?.destroy();
		this.debugText = scene.add.text(WINDOW_WIDTH / 8, 200, `${this.timerEvent.getElapsed()}, ${this.timerEvent.getProgress()}`, { font: '32px Arial' });
	}

	transitionState() {
		switch (this.state) {
		case DialogLineState.ACTIVATING:
			this.state = DialogLineState.ACTIVE;
			this.timerEvent.reset({
				loop: true,
				delay: 2000,
			});
			break;
		case DialogLineState.ACTIVE:
			this.state = DialogLineState.DEACTIVATED;
			this.timerEvent.destroy();
		}
	}

	destroy(fromScene?: boolean): void {
		this.data.destroy();
		this.text.destroy();
		this.timerEvent.destroy();
		this.debugText?.destroy();
		super.destroy(fromScene);
	}
}

Phaser.GameObjects.GameObjectFactory.register('dialogLine', function (this: Phaser.GameObjects.GameObjectFactory, opts: IDialogLineCreateOpts) {
	const dialogLine = new DialogLine(this.scene, opts);
	this.displayList.add(dialogLine);

	return dialogLine;
})
