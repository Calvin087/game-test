// https://youtu.be/Ot3X2dYSr3Q?t=886

class SceneTransition {
  constructor() {
    this.element = null;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("SceneTransition");
  }

  fadeOut() {
    this.element.classList.add("fade-out");
    // so the element that we're passing will have an
    // onanimation end attribute that will fire once it's done animating.
    // We can target this and do something once it's ready. Madness.
    this.element.addEventListener(
      "animationend",
      () => {
        this.element.remove();
      },
      { once: true }
    );
  }

  init(container, callback) {
    //   callback is to know when it's finished
    this.createElement();
    container.appendChild(this.element);

    // how do we know when it's finished
    this.element.addEventListener(
      "animationend",
      () => {
        callback();
      },
      { once: true } // who knew.... This automatically unbinds when done
    );
  }
}
