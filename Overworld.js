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

      // establishing a camera position / person
      const cameraPerson = this.map.gameObjects.hero; // inside OverworldMaps

      // This is serparate from the one below because we need to
      // update all positions before drawing them to the screen
      // This stops things bouncing around.
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          // Person.update
          arrow: this.directionInput.direction,
          map: this.map, // allowing us to check methods on the map being drawn
        });
      });

      // Draw Lower Layer
      this.map.drawLowerImage(this.ctx, cameraPerson); // calling the instance written in init

      // Draw Chars
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          // if the y position of the hero is lower on the map than npcs,
          // draw the npc first and hero last.
          // draws the layers correctly.
          return a.y - b.y;
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
          // we're passing camera person, so everything can move around it.
          // We're not moving the main character. The world moves.
        });

      // Draw Upper Image
      this.map.drawUpperImage(this.ctx, cameraPerson); // calling the instance written in init

      requestAnimationFrame(() => {
        step(); // placing this here stops an infinite loop, instead calls each frame
        // runs on every frame
        // every time there is a new frame, it calls the step function
        // creating a loop
      });
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      // is there
    });
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    // this is the map that the game boots up with.
    // we're SAVING a bunch of stuff to the window object
    // in OverworldMap. We then pass ref into Overworld Map.
    // Overworld map uses the DEMO ROOM as the config and
    // it's gameObjects become the ones saved in the window object,
    // that have been created and saved at the bottom of overworldmap
    this.bindActionInput();
    this.map.mountObjects();
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();

    // we're using a for loop to iterate over these movements
    // and play them on the screen using overworldMaps

    // this.map.startCutscene([
    // { who: "hero", type: "walk", direction: "down" },
    // { who: "hero", type: "walk", direction: "down" },
    // { who: "npcA", type: "walk", direction: "up" },
    // { who: "npcA", type: "walk", direction: "left" },
    // { who: "hero", type: "stand", direction: "right" },
    // // { who: "hero", type: "stand", direction: "down" },
    // // { who: "npcA", type: "walk", direction: "left" },
    // // { who: "npcA", type: "stand", direction: "up" },
    // { type: "textMessage", text: `Let's get started!` },
    // ]);
  }
}
