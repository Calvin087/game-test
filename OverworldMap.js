class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};
    // creating layers of images, floor as lower treetops as upper
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    //   take in context to draw to
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImage(ctx, cameraPerson) {
    //   take in context to draw to
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);

    return this.walls[`${x},${y}`] || false; // checking if the walls coords are true
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key]; // ie: hero, npc1, npc2 etc
      object.id = key; // the id becomes the name hero, npc1, npc2

      // the whole map at the bottom of the page is being passed
      // in as config, so we're now passing the whole map to mount.
      // mount, calls map.addWall which is here. So we're calling mount,
      // then coming back here to call addWall!!!!
      object.mount(this);
    });
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX, wasY, direction) {
    // takes in the old position of a wall, calculates the next position
    // then deletes the old one and makes a new one for each movement of
    // the character
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npcA: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          // this creates a dummy animation for the NPC to follow
          { type: "walk", direction: "left", time: 800 },
          { type: "walk", direction: "up", time: 500 },
          { type: "walk", direction: "right", time: 1200 },
          { type: "walk", direction: "down", time: 300 },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(7),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          // this creates a dummy animation for the NPC to follow
          { type: "walk", direction: "left" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
        ],
      }),
    },
    walls: {
      [utils.asGridCoord(7, 6)]: true, // DYNAMIC key naming. Return value becomes key name
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
  },
  // Kitchen: {
  //   lowerSrc: "/images/maps/KitchenLower.png",
  //   upperSrc: "/images/maps/Kitchenupper.png",
  //   gameObjects: {
  //     hero: new GameObject({ x: 3, y: 1 }),
  //     npc1: new GameObject({
  //       x: 9,
  //       y: 6,
  //       src: "/images/characters/people/npc2.png",
  //     }),
  //     npc1: new GameObject({
  //       x: 10,
  //       y: 8,
  //       src: "/images/characters/people/npc3.png",
  //     }),
  //   },
  // },
};
