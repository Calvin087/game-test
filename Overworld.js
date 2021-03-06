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
    this.chronometer = new Chronometer();
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
      // is there a cutscene at this point?
      // When we press enter, this fires on the OverWorldMap and checks for
      // Anything in the next position.
      this.map.checkForActionCutscene();
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      // this an event on the person class
      if (e.detail.whoId === "hero") {
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig) {
    // this is the map that the game boots up with.
    // we're SAVING a bunch of stuff to the window object
    // in OverworldMap. We then pass ref into Overworld Map.
    // Overworld map uses the DEMO ROOM as the config and
    // it's gameObjects become the ones saved in the window object,
    // that have been created and saved at the bottom of overworldmap
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  stopCountdown() {
    this.chronometer.stop();
  }

  init() {
    this.startMap(window.OverworldMaps.SCP1);

    // Probably not the best idea to pollute the window more but
    // I can't pass the chorometer through the map classes
    // need the time to stop decrementing during win / lose events.

    window.chronometer = this.chronometer;
    window.chronometer.init(() => {
      document.getElementById("timer").textContent = `Run:Now`;
      this.map.startCutscene([{ type: "escaped" }]);
    });
    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    // we're using a for loop to iterate over these movements
    // and play them on the screen using overworldMaps

    this.map.startCutscene([
      // add info on SCP details here
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      {
        type: "textMessage",
        text: `This doesn't look good, SCP-096's containment has failed`,
      },
      {
        type: "textMessage",
        text: `If we don't fix this, lots of people are gonna die!`,
      },
    ]);

    // window.chronometer.init(() => {
    //   document.getElementById("timer").textContent = `Run:Now`;
    //   this.map.startCutscene([{ type: "escaped" }]);
    // });
  }
}
