class AttemptPuzzle {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
    this.element = null;
    this.password = 749489;
    this.userGuess = [];
    this.image = "images/maps/Terminal1.png";
    this.text = `
    Chamber opened..........
    SCP096 roaming the halls..........
    containment confirmed unlocked..........
    security called to the scene..........
    rebooting all systems..........
    possibly red ice contamination on lock system..........
    attempting to reboot failed..........
    new password requested from Agent with clearance:
    . . . ENTER PASSWORD NOW ⚩
    `;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Terminal");
    this.element.innerHTML = `
        <p class="Terminal_p"></p>
        <p class="Terminal_n"></p>
        <img src="${this.image}" alt=""/>
    `;

    this.revealingText = new RevealText({
      element: this.element.querySelector(".Terminal_p"),
      text: this.text,
      speed: 0.1,
    });

    document.addEventListener("keydown", (e) => {
      if (Number(e.key) && this.userGuess.length <= 3) {
        this.userGuess.push(e.key);

        let dave = document.querySelector("p.Terminal_n");
        dave.remove();

        const newGuess = document.createElement("p");
        newGuess.classList.add("Terminal_n");

        this.element.appendChild(newGuess);

        newGuess.textContent = this.userGuess.join("");

        // this.element.querySelector("p").textContent += this.userGuess;
      }
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.checkGuess();
    });

    this.actionListener = new KeyPressListener("Backspace", () => {
      if (this.userGuess.length > 0) {
        this.userGuess.pop();
      }
    });
  }

  checkGuess() {
    //   something here
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
    container.appendChild(this.element);
    this.revealingText.init();
  }
}
