class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    // resolve is going to inform the brain that the event is done.
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    // event who is the id (hero, npcA / B)
    // then we find the gameObject in the map's gameObjects
    who.startBehavior(
      { map: this.map },
      {
        type: "walk",
        direction: this.event.direction, // this comes from gameObjects behavior loop key
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

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve); // we're looking for Stand or Walk or other methods
    });
  }
}
