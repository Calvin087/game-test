class GameObject {
  constructor(config) {
    // passing an object to the config allows us to not
    // worry about the order of values etc.
    // similar to props.
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
  }

  update() {}
}
