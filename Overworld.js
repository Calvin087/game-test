class Overworld {
  // top level parent component
  // tracks state and sends it down
  constructor(config) {
    this.element = config.element;
    // we can pass in an element for the world to work on
    this.canvas = this.element.querySelector(".game-canvas");
    // Grabbing canvas element from whatever world we pass in.
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      // Clearing the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw Lower Layer
      this.map.drawLowerImage(this.ctx); // calling the instance written in init

      // Draw Chars
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          // Person.update
          arrow: this.directionInput.direction,
        });
        object.sprite.draw(this.ctx);
      });

      // Draw Upper Image
      this.map.drawUpperImage(this.ctx); // calling the instance written in init

      requestAnimationFrame(() => {
        step(); // placing this here stops an infinite loop, instead calls each frame
        // runs on every frame
        // every time there is a new frame, it calls the step function
        // creating a loop
      });
    };
    step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    // this is the map that the game boots up with.
    // we're SAVING a bunch of stuff to the window object
    // in OverworldMap. We then pass ref into Overworld Map.
    // Overworld map uses the DEMO ROOM as the config and
    // it's gameObjects become the ones saved in the window object,
    // that have been created and saved at the bottom of overworldmap
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();
  }
}
