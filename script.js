let bottleImg = createCurserImg("./assets/imgs/bottle-trans.png");
let bookImg = createCurserImg("./assets/imgs/book.png");
function createCurserImg(asset) {
  let img = document.createElement("img");
  img.src = asset;
  img.classList.add("curser-img");
  return img;
}

class CursorImg {
  constructor() {
    let cursorFollower = document.createElement("div");
    cursorFollower.classList.add("cursor-img-container");
    document.body.appendChild(cursorFollower);
    this._cursorFollower = cursorFollower;
    addEventListener("mousemove", (event) => {
      let x = event.pageX;
      let y = event.pageY;
      cursorFollower.style.top = y + -20 + "px";
      cursorFollower.style.left = x + -20 + "px";
    });
  }
  updateAction(action) {
    switch (action) {
      case "water":
        this.selectNewCursorImg(bottleImg);
        break;
      case "read":
        this.selectNewCursorImg(bookImg);
        break;
      default:
        this.removeSelectedCursorImg();
        break;
    }
  }
  removeSelectedCursorImg() {
    this._cursorFollower.innerHTML = "";
  }
  selectNewCursorImg(newImg) {
    this.removeSelectedCursorImg();
    this._cursorFollower.appendChild(newImg);
  }
}

class Toad {
  constructor() {
    this._toad = document.getElementById("toadDivWrapper");
    this._animating;
    this.animation;
  }
  resetAnimation() {}
  feedAnimation() {
    this.resetAnimation();
  }
  educateAnimation() {
    this.resetAnimation();
  }

  interact(action) {
    console.log(action);
    switch (action) {
      case "water":
        this.feedAnimation();
        break;
      case "read":
        this.educateAnimation();
        break;
      default:
        break;
    }
  }
  toadonHoverDisplay() {
    // let hovImg = document.getElementById("toadImgHover");
    // hovImg.style.display = "inline";
    // this._toad.style.display = "none";
  }
  toadcurrentStateDisplay() {
    // let hovImg = document.getElementById("toadImgHover");
    // hovImg.style.display = "none";
    // this._toad.style.display = "inline";
  }
}

class ToadGame {
  constructor() {
    this._action = "";
    this.toad = new Toad();
    this.actionObservers = [];
  }
  addObserver(observer) {
    this.actionObservers.push(observer);
  }
  notifyObservers() {
    this.actionObservers.forEach((observer) => {
      observer.updateAction(this._action);
    });
  }
  updateAction(act) {
    this._action = act;
    this.notifyObservers();
  }
  interactWithToad() {
    this.toad.interact(this._action);
    this.updateAction("");
  }
}

let game = new ToadGame();
let cursorFollower = new CursorImg();
game.addObserver(cursorFollower);

//Game pieces

//buttons
let waterBtn = document.getElementById("waterBtn");
let readBtn = document.getElementById("readBtn");
let cancelBtn = document.getElementById("cancelBtn");
let toadBtn = document.getElementById("toadDivWrapper");
waterBtn.addEventListener("click", () => game.updateAction("water"));
readBtn.addEventListener("click", () => game.updateAction("read"));
cancelBtn.addEventListener("click", () => game.updateAction(""));
toadBtn.addEventListener("click", () => game.interactWithToad());
