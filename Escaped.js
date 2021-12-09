class Escaped {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
    this.element = null;
  }

  playVideo() {
    this.element = document.createElement("div");
    this.element.classList.add("Video_box");
    this.element.innerHTML = `
    <video width="358" autoplay="autoplay">
      <source src="video/lose.mp4"type="video/mp4">
    </video>
    `;
    this.onComplete();
  }

  init(container) {
    this.playVideo();
    container.appendChild(this.element);
  }
}
