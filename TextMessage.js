class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null; // this is the text box that we append to DOM
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = `
        <p class="TextMessage_p">${this.text}</p>
        <button class="TextMessage_button">Next</button>
    `;

    // finding the button within the div.
    // adding event listener to only that button
    this.element.querySelector("button").addEventListener("click", () => {
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      console.log("ENTER");
      this.actionListener.unbind();
      this.done();
    });
  }

  done() {
    this.element.remove();
    this.onComplete(); // this is the resolver that is passed in
  }

  init(container) {
    this.createElement();
    // index has a box called game-container that we pass here.
    container.appendChild(this.element);
  }
}
