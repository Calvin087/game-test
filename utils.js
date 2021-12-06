const utils = {
  withGrid(n) {
    return n * 16;
  },
  asGridCoord(x, y) {
    return `${x * 16},${y * 16}`; // commas make it safe for negatives.
  },
  nextPosition(initialX, initialY, direction) {
    // we're using this to figure out if
    // the position being moved to is taken

    let x = initialX;
    let y = initialY;
    const size = 16;
    switch (direction) {
      case "left":
        x -= size;
        break;
      case "right":
        x += size;
        break;
      case "up":
        y -= size;
        break;
      case "down":
        y += size;
        break;
    }

    return { x, y };
  },
};
