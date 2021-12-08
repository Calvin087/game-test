class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
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

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    // Start a loop of async events and await them
    // the array of events currently is in overworld in init()
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({ event: events[i], map: this });
      await eventHandler.init();
    }

    // when it's finished, switch to false
    this.isCutscenePlaying = false;

    // Reset NPC to go back totheir old behavour
    Object.values(this.gameObjects).forEach((object) => {
      object.doBehaviorEvent(this);
    });
  }

  checkForActionCutscene() {
    // Where is the hero
    const hero = this.gameObjects["hero"];

    // what is this hero's next positiong?
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);

    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });

    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events);
    }

    console.log(match);
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    // index into the map below at cutscenes key, and see if there's anything here.
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    console.log({ match });
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
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
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "up", time: 300 },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Hey, hows it goin",
                faceHero: "npcA",
              },
              { type: "textMessage", text: "Something Else here" },
              { who: "hero", type: "walk", direction: "up" },
            ],
          },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(8),
        y: utils.withGrid(5),
        src: "/images/characters/people/npc2.png",
        // behaviorLoop: [
        //   // this creates a dummy animation for the NPC to follow
        //   { type: "walk", direction: "left" },
        //   { type: "stand", direction: "up" },
        //   { type: "walk", direction: "up" },
        //   { type: "walk", direction: "right" },
        //   { type: "walk", direction: "down" },
        // ],
      }),
    },
    walls: utilsGiantWalls.demoRoomWalls,
    cutsceneSpaces: {
      // checkForFootstepCutscene() is looking for this
      [utils.asGridCoord(7, 4)]: [
        // we choose a grid position on the map to create a scene
        {
          events: [
            { who: "npcB", type: "walk", direction: "left" },
            { who: "npcB", type: "stand", direction: "up", time: 300 },
            { type: "textMessage", text: "Get Out!" },
            { who: "npcB", type: "walk", direction: "right" },
            { who: "npcB", type: "stand", direction: "down" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
          ],
        },
      ],
      [utils.asGridCoord(5, 10)]: [
        {
          events: [
            // changing maps
            { type: "changeMap", map: "Kitchen" },
          ],
        },
      ],
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/Kitchenupper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(5),
      }),
      npcA: new Person({
        x: utils.withGrid(10),
        y: utils.withGrid(8),
        src: "/images/characters/people/npc1.png",
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Hey, hows it goin",
                faceHero: "npcA",
              },
              { type: "textMessage", text: "Something Else here" },
              { who: "hero", type: "walk", direction: "up" },
            ],
          },
        ],
      }),
    },
  },
  SCP1: {
    lowerSrc: "/images/maps/scp1.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(25),
        y: utils.withGrid(3),
      }),
      npcA: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(1),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          // this creates a dummy animation for the NPC to follow
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "up", time: 300 },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Hey, hows it goin",
                faceHero: "npcA",
              },
              { type: "textMessage", text: "Something Else here" },
              { who: "hero", type: "walk", direction: "up" },
            ],
          },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(1),
        y: utils.withGrid(1),
        src: "/images/characters/people/npc2.png",
        // behaviorLoop: [
        //   // this creates a dummy animation for the NPC to follow
        //   { type: "walk", direction: "left" },
        //   { type: "stand", direction: "up" },
        //   { type: "walk", direction: "up" },
        //   { type: "walk", direction: "right" },
        //   { type: "walk", direction: "down" },
        // ],
      }),
    },
    walls: utilsGiantWalls.scp1,
    cutsceneSpaces: {
      // checkForFootstepCutscene() is looking for this
      [utils.asGridCoord(7, 4)]: [
        // we choose a grid position on the map to create a scene
        {
          events: [
            { who: "npcB", type: "walk", direction: "left" },
            { who: "npcB", type: "stand", direction: "up", time: 300 },
            { type: "textMessage", text: "Get Out!" },
            { who: "npcB", type: "walk", direction: "right" },
            { who: "npcB", type: "stand", direction: "down" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
          ],
        },
      ],
      [utils.asGridCoord(5, 10)]: [
        {
          events: [
            // changing maps
            { type: "changeMap", map: "Kitchen" },
          ],
        },
      ],
    },
  },
};
