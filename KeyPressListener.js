class KeyPressListener {
  constructor(keyCode, callback) {
    let keySafe = true; // we use this as a flag.
    // Once the key is pressed we turn it to false so it can't
    // repeatedly call the action a thousand times a second.
    // we just want it to happen once.

    this.keydownFunction = function (event) {
      if (event.code === keyCode) {
        if (keySafe) {
          keySafe = false;
          callback();
        }
      }
    };

    this.keyupFunction = function (event) {
      if (event.code === keyCode) {
        keySafe = true;
      }
    };

    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  unbind() {
    //   Once the user has clicked on the button for the modal,
    // this stops listening for that click.
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
