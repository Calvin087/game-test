class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    // event who is the id (hero, npcA / B)
    // then we find the gameObject in the map's gameObjects
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time,
      }
    ); // on person class

    // Complete handler resolves the event when person is done walking.
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    };

    document.addEventListener("PersonStandComplete", completeHandler);
    // These events are scoped to a person with their id, so when this class
    // hears the event being fired off, it'll take action.
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    // event who is the id (hero, npcA / B)
    // then we find the gameObject in the map's gameObjects
    who.startBehavior(
      {
        map: this.map,
      },
      {
        type: "walk",
        direction: this.event.direction, // this comes from gameObjects behavior loop key
        retry: true,
      }
    ); // on person class

    // Complete handler resolves the event when person is done walking.
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };

    document.addEventListener("PersonWalkingComplete", completeHandler);
    // These events are scoped to a person with their id, so when this class
    // hears the event being fired off, it'll take action.
  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero]; // id of the npc passed in
      obj.direction = utils.oppositeDirection(
        // change the direction of the NPC to face hero
        this.map.gameObjects["hero"].direction
      );
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve(), // what happens when we exit message, resolve
    });

    message.init(document.querySelector(".game-container"));
  }

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve); // we're looking for Stand or Walk or other methods
    });
  }
}
