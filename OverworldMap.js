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
    upperSrc: "/images/maps/scpTop1.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(36),
        y: utils.withGrid(16),
      }),
      npcA: new Person({
        x: utils.withGrid(12),
        y: utils.withGrid(4),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          // this creates a dummy animation for the NPC to follow
          { type: "stand", direction: "left", time: 1000 },
          { type: "stand", direction: "up", time: 1000 },
          { type: "stand", direction: "right", time: 1000 },
          { type: "stand", direction: "up", time: 1000 },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: `Thank God you're here! SCP096's containment
                lock has opened!`,
                faceHero: "npcA",
              },
              {
                type: "textMessage",
                text: `It's already taken
                two agents and there's blood everywhere!`,
                faceHero: "npcA",
              },
              {
                type: "textMessage",
                text: `Agent ▓▓▓▓ changed the password to the chamber and
                none of us know what is, please HELP!`,
                faceHero: "npcA",
              },
              {
                type: "textMessage",
                text: `We have about 3 minutes until the
                system resets and leaves the door open indefinately`,
                faceHero: "npcA",
              },
            ],
          },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(18),
        y: utils.withGrid(14),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          // this creates a dummy animation for the NPC to follow
          { type: "stand", direction: "up", time: 1800 },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 1800 },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "down" },
          { type: "stand", direction: "down", time: 1800 },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: `I saw Agent ▓▓▓▓ leave his notebook in
                the D-Class break room, maybe his passwords are there.`,
                faceHero: "npcB",
              },
              {
                type: "textMessage",
                text: `It's a dumb place to leave it, but he wasn't the
                brightest of personnel`,
                faceHero: "npcB",
              },
              {
                type: "textMessage",
                text: `Oh and we have a leak of SCP009 (Red Ice), it's spreading
                but as long as you DON'T TOUCH IT, you'll be ok!`,
                faceHero: "npcB",
              },
            ],
          },
        ],
      }),
      npcC: new Person({
        x: utils.withGrid(28),
        y: utils.withGrid(30),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          // this creates a dummy animation for the NPC to follow
          { type: "stand", direction: "up" },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: `Unless you're trying to go home in a body bag,
                don't touch the Red Ice`,
                faceHero: "npcC",
              },
              {
                type: "textMessage",
                text: `I'm looking for Agent ▓▓▓▓'s password, he had a folder on the PC
                but I can't get it to turn on.`,
                faceHero: "npcC",
              },
              {
                type: "textMessage",
                text: `Check the other PC's to see if they're working.`,
                faceHero: "npcC",
              },
            ],
          },
        ],
      }),
      npcD: new Person({
        x: utils.withGrid(22),
        y: utils.withGrid(16),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          // this creates a dummy animation for the NPC to follow
          { type: "stand", direction: "right" },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: `We're going to die here aren't we?`,
                faceHero: "npcD",
              },
              {
                type: "textMessage",
                text: `That thing took Tommy and Steve!`,
                faceHero: "npcD",
              },
              {
                type: "textMessage",
                text: `There's nothing left of them!`,
                faceHero: "npcD",
              },
            ],
          },
        ],
      }),
      npcE: new Person({
        x: utils.withGrid(37),
        y: utils.withGrid(15),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          // this creates a dummy animation for the NPC to follow
          { type: "stand", direction: "left" },
        ],
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: `I'm taking samples of SCP009, I think it may have
                been the reason the doors around here are jammed.`,
                faceHero: "npcE",
              },
              {
                type: "textMessage",
                text: `.................................`,
                faceHero: "npcE",
              },
              {
                type: "textMessage",
                text: `Can you hear someone whispering?`,
                faceHero: "npcE",
              },
            ],
          },
        ],
      }),
    },
    walls: utilsGiantWalls.scp1,
    cutsceneSpaces: {
      // checkForFootstepCutscene() is looking for this
    },
  },
};
