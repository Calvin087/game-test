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
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
    }

    // keyboard ready and has arrow passed
    if (this.isPlayerControlled && state.arrow) {
      this.startBehaviour(state, {
        type: "walk",
        direction: state.arrow,
      });
    }
    // get directions from direction input and pass it to person updater.
    this.updateSprite(state);
  }

  // this will allow us to move a character that IS NOT the main character
  startBehaviour(state, behaviour) {
    // set character direction
    this.direction = behaviour.direction;

    // if the space is taken, we do not move on.
    if (behaviour.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }

      // this makes a wall in the position of the main character.
      // it moves along with him so things can't pass through him
      state.map.moveWall(this.x, this.y, this.direction);

      // Ready to move character
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    // this.direction belongs to the parent class "default is down"
    this[property] += change; // incrementing the y - this property === GameObject.y
    this.movingProgressRemaining -= 1;
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }

    this.sprite.setAnimation("idle-" + this.direction);
  }
}
