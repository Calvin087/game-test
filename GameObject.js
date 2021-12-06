class GameObject {
  constructor(config) {
    // passing an object to the config allows us to not
    // worry about the order of values etc.
    // similar to props.
    this.id = null; // giving our object an id/name so we can call it later.
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";

    // this is where we use the sprite class,
    // and pass in all of the config into that we need.
    this.sprite = new Sprite({
      gameObject: this,
      // passing itself as the object to Sprite class
      // along with it's x and y postions above.
      src: config.src || "/images/characters/people/hero.png", // default hero placeholder
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    // this starts the behavior watching after short delay.
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update() {}

  async doBehaviorEvent(map) {
    // if there's already something going on, let that finish before running
    // additional background animations.

    if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
      return;
    }

    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    // object.id is passed from OverWorldMap when creating thie GameObject
    // we then create and assign the id name to the eventConfig we're creating.
    eventConfig.who = this.id; // ie: hero, npcA, npcB

    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    // OverworldEvent this is going to be the engine that tells NPCs how to behave
    // this is also where we're going to add music, text, map changes etc.

    await eventHandler.init(); // returns a promise once things have finished.

    // once the above action has completed, we can move to the next instruction
    this.behaviorLoopIndex += 1;

    // We then have to check if there are any more instructions, if not, reset the index.
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    // Do it again
    // continuously calling itself and awaiting for the actions to finish.
    this.doBehaviorEvent(map);
  }
}
