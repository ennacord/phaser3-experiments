import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants";

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

const VERY_LONG_TIME = 1000 * 60 * 30; // 30 mins
const STEP = 100;

const displayCallback = (timerEvent: Phaser.Time.TimerEvent): Phaser.Types.GameObjects.BitmapText.DisplayCallback => (display) => {
	if (timerEvent.getElapsed() < STEP * display.index) {
		display.y += WINDOW_HEIGHT * 100;
	}
	return display;
};

export class Dialog {
	text?: Phaser.GameObjects.DynamicBitmapText;
	debugText?: Phaser.GameObjects.Text;
	timerEvent?: Phaser.Time.TimerEvent;

	preload(scene: Phaser.Scene) {
		scene.load.image('logo', 'assets/phaser3-logo.png');
		scene.load.bitmapFont('inter', 'assets/inter-regular-outline-2_0.png', 'assets/inter-regular-outline-2.fnt');
	}

	create(scene: Phaser.Scene) {
		const timerEvent = scene.time.addEvent({ delay: VERY_LONG_TIME, repeat: 0 });
		const text = scene.add.dynamicBitmapText(WINDOW_WIDTH / 8, 200, 'inter', dummyText[0], 32);
		text.setMaxWidth(WINDOW_WIDTH * 3 / 4);
		text.setDisplayCallback(displayCallback(timerEvent));
		this.text = text;
		this.timerEvent = timerEvent;
	}

	update(scene: Phaser.Scene) {
		this.debugText?.destroy();
		this.debugText = scene.add.text(WINDOW_WIDTH / 8, 200, `${this.timerEvent?.getElapsed()}`, { font: '32px Arial', fill: '#00ff00' });
	}
}