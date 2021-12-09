class AttemptPuzzle {
  constructor({ map, onComplete }) {
    this.onComplete = onComplete;
    this.element = null;
    this.password = 485224;
    this.userGuess = [];
    this.image = "images/maps/Terminal1.png";
    this.text = `. . . ENTER PASSWORD NOW ⚩`;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Terminal");
    this.element.innerHTML = `
        <p class="Terminal_p">Chamber opened..........
          SCP096 roaming the halls..........
          containment confirmed unlocked..........
          security called to the scene..........
          rebooting all systems..........
          possibly red ice contamination on lock system..........
          attempting to reboot failed..........
          new password requested from Agent with clearance:
        </p>
        <p class="Terminal_n"></p>
        <img src="${this.image}" alt=""/>
    `;

    this.revealingText = new RevealText({
      element: this.element.querySelector(".Terminal_p"),
      text: this.text,
    });

    document.addEventListener("keydown", (e) => {
      if (Number(e.key) && this.userGuess.length < 6) {
        this.userGuess.push(e.key);

        let pinCode = document.querySelector("p.Terminal_n");
        pinCode.remove();

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
    const finalUserGuess = Number(this.userGuess.join(""));
    if (finalUserGuess === this.password) {
      this.playVideo("win");
    } else {
      this.playVideo("lose");
    }
  }

  playVideo(outcome) {
    const choice = outcome === "win" ? "win" : "lose";

    this.element.classList.remove("Terminal");
    this.element.classList.add("Video_box");
    this.element.innerHTML = `
    <video width="358" autoplay="autoplay">
      <source src="video/${choice}.mp4"type="video/mp4">
    </video>
    `;
    this.onComplete();
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    this.revealingText.init();
  }
}

``;
