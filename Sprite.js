class Sprite {
  constructor(config) {
    console.log(config.needShadow);
    // Set up the image based on
    // what's been passed in to the config object
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
      // only once the image is loaded through this function does
      // loaded get set to true. then we can draw on the canvas.
    };

    // ==============================================

    // Configuring shadows on elements
    this.shadow = new Image();
    this.useShadow = config.needShadow === false ? false : true;

    if (this.useShadow === true) {
      // only use a shadow on an element if it's not coded already
      this.shadow.src = "/images/characters/shadow.png";
    }

    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    // ==============================================

    // Configuring animation and initial state
    this.animations = config.animations || {
      // this is the default state for the sprite
      // going to contain a bunch of key frames
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = config.currentAnimation || "idle-right";
    this.currentAnimationFrame = 0;

    // Establishing cadence of animation between sprite sheet frams
    this.animationFrameLimit = config.animationFrameLimit || 8;
    // Now we track our time through that cadence, then decrement it
    // counting down how long before switching to the next frame.
    this.animationFrameProgress = this.animationFrameLimit;

    // reference the game object.
    this.gameObject = config.gameObject;
  }

  // ==============================================

  get frame() {
    // this becomes this.frame and it returns a value.
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
    // figure out which frame we're on and which animation frame we're on.
  }

  setAnimation(key) {
    // On each Key press
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0; // reset frame
      this.animationFrameProgress = this.animationFrameLimit; // reset cadence
    }
  }

  updateAnimationProgress() {
    // Downtick the frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    // reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
    // nudge built in for correct map position
    // This moves every gameObject/Sprite on the screen based on the coordinates of the main character.
    // The character doesn't move, everything else around it does in relation to the character.
    // This gives the illusion that we're moving. DAMN!!!
    // Tha map needs to be updated as well.
    // 10.5 is half the width minus one cell, so if it's 22 cells wide - 1
    // Then divided by 2, we get 10.5 (the middle)
    // Same with the top
    const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y; // nudge built in

    // onload takes a while, so we need to wait for it
    // to load before trying to draw the sprites to the screen

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;
    // using the getter method to return the value,
    // then destructuring

    this.isLoaded &&
      ctx.drawImage(
        this.image,
        frameX * 32, // left cut * gridSize of sprite sheet
        frameY * 32, // right
        32, // width of cut
        32, // height
        x, // position
        y, // position
        32, // size of cropped cut
        32 // size of cropped cut
      );
    this.updateAnimationProgress(); // calling this, to redraw the character incase it has changed frame
  }
}
