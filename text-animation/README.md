# Text Animation

This experiment tries to replicate how text is progressively displayed in VNs.
The only text object that permits per-character animation in phaser3 is [DynamicBitmapText](https://newdocs.phaser.io/docs/3.55.2/Phaser.GameObjects.DynamicBitmapText).
So we use that. Even still, it doesn't seem possible to animate per-character alpha, so my current approach is to put it off-screen until we are ready for it to be displayed.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Builds project and open web server, watching for changes |
| `npm run build` | Builds code bundle with production settings  |
| `npm run serve` | Run a web server to serve built code bundle |

## Development

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm run dev` and navigate to http://localhost:3000.

## Production

After running `npm run build`, the files you need for production will be on the `dist` folder. To test code on your `dist` folder, run `npm run serve` and navigate to http://localhost:5000
