class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    // creating layers of images, floor as lower treetops as upper
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx) {
    //   take in context to draw to
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  drawUpperImage(ctx) {
    //   take in context to draw to
    ctx.drawImage(this.upperImage, 0, 0);
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        isPlayerControlled: true,
      }),
      // npc1: new Person({
      //   x: utils.withGrid(7),
      //   y: utils.withGrid(9),
      //   src: "/images/characters/people/npc1.png",
      // }),
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
