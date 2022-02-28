# phaser3-experiments

A repository to collect phaser3 experiments / spikes in the development of `ennacord/anniversary-1y`.

* `phaser3-rollup-typescript` is the base (sandbox) project, don't touch it but copy it into a new folder.
* `rewindable-movement` is an experiment (in progress) for a game where we can move an actor, but movement is logged, and a certain input "rewinds" events reading from the log.
* `scene` is an experiment (in progress) to form the foundation of the game, with a focus on well-organizing the game systems related to the scene.
* `text-animation` is an experiment (in progress) first to emulate how text is progressively displayed in VNs and in response to input, and next (not yet started) to encompass also the dialogue log

## Repository organization for this experiments repository

* Don't touch top-level folders that you didn't start, clone from existing
* Commits to branches are unprotected, feel free to commit to `main`. No PRs. Branch if desired or necessary.

## Project terminology

* A **scene** (preferred), or scenario, represents a conceptual scene in the VN. Typically, in response to user input, the scene progresses by
  * Animating (displaying, hiding, moving) large sprites representing characters on the screen, as well as the BG
  * Progressively displaying more of the script (optionally clearing existing displayed script for reasons of space)
  * Starting / stopping BGM and sound effects
  * We also have the option of having minigames as a subsystem of a scene.

## Important links

* phaser3 API docs https://newdocs.phaser.io/docs
* phaser3 examples https://phaser.io/examples
