class RevealText {
  constructor(config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 70; // 70ms

    this.timeout = null;
    this.isDone = false;
  }

  revealOneCharacter(list) {
    const element = list.splice(0, 1)[0]; // modifies the original array.
    element.span.classList.add("revealed");
    // [
    //   {span: <span>, delayAfter: 70}
    //   {span: <span>, delayAfter: 0}
    // ]

    // BECOMES

    // [
    //   {span: <span>}
    // ]

    if (list.length > 0) {
      this.timeout = setTimeout(() => {
        // recursively passing in our mutated list
        this.revealOneCharacter(list);
      }, element.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  skipAllText() {
    // trying to show all the text if the user hits enter.
    clearInterval(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll("span").forEach((char) => {
      char.classList.add("revealed");
    });
  }

  init() {
    let characters = [];
    this.text.split("").forEach((character) => {
      // create each span and add to DOM
      let span = document.createElement("span");
      span.textContent = character;
      this.element.appendChild(span);

      //   add this span to the internal array
      characters.push({
        span,
        delayAfter: character === " " ? 0 : this.speed, // skip over spaces to move faster
        // [
        //   {span: <span>, delayAfter: 70}
        //   {span: <span>, delayAfter: 0}
        // ]
      });
    });

    this.revealOneCharacter(characters);
  }
}
