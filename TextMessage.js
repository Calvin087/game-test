class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null; // this is the text box that we append to DOM
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    // we use the reveal class to add text content to this element.
    this.element.innerHTML = `
        <p class="TextMessage_p"></p>
        <button class="TextMessage_button">Next</button>
    `;

    // this starts the typewriter effect
    this.revealingText = new RevealText({
      element: this.element.querySelector(".TextMessage_p"),
      text: this.text,
    });
    // finding the button within the div.
    // adding event listener to only that button
    this.element.querySelector("button").addEventListener("click", () => {
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      console.log("ENTER");

      this.done();
    });
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
      // this is the resolver that is passed in and removes the text from screen
    } else {
      this.revealingText.skipAllText();
      // this skips all the typewriter effect and shows all
    }
  }

  init(container) {
    this.createElement();
    // index has a box called game-container that we pass here.
    container.appendChild(this.element);
    this.revealingText.init();
  }
}
