// This extends  the game object because it needs it's own movement

class Person extends GameObject {
  constructor(config) {
    super(config); // runs all the parents code

    this.movingProgressRemaining = 0;
    // This locks the sprite to the map's grid.

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    // this is extending from parent class
    this.updatePosition();
    // get directions from direction input and pass it to person updater.
    this.updateSprite(state);
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      state.arrow
    ) {
      this.direction = state.arrow;
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      // this.direction belongs to the parent class "default is down"
      this[property] += change; // incrementing the y - this property === object.y
      this.movingProgressRemaining -= 1;
    }
  }

  updateSprite(state) {
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      !state.arrow
    ) {
      this.sprite.setAnimation("idle-" + this.direction);
    }

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
    }
  }
}
