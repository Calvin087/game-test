// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
// We create a custom event here ln:38, and call it in OverworldEvent.js

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

  oppositeDirection(direction) {
    switch (direction) {
      case "left":
        return "right";

      case "right":
        return "left";

      case "up":
        return "down";

      default:
        return "up";
    }
  },

  emitEvent(name, detail) {
    // util function to create custom events on the enviroment.
    const event = new CustomEvent(name, {
      detail, // passed in config
    });

    document.dispatchEvent(event);
  },
};
