let bottleImg = createCurserImg("./assets/imgs/bottle-trans.png");
let bookImg = createCurserImg("./assets/imgs/book.png");
function createCurserImg(asset) {
  let img = document.createElement("img");
  img.src = asset;
  img.classList.add("curser-img");
  return img;
}

class CursorFollower {
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
    this.observers = [];

    document.getElementById("waterBtn").addEventListener("click", () => {
      this.selectNewCursorImg(bottleImg, "water");
    });
    document.getElementById("readBtn").addEventListener("click", () => {
      this.selectNewCursorImg(bookImg, "book");
    });
    document.getElementById("cancelBtn").addEventListener("click", () => {
      this.removeSelectedCursorImg();
    });
    document.getElementById("toadDivWrapper").addEventListener("click", () => {
      this.removeSelectedCursorImg();
    });
  }
  addObserver(obs) {
    this.observers.push(obs);
  }
  notify(data) {
    if (this.observers.length > 0) {
      this.observers.forEach((observer) => observer.update(data));
    }
  }
  removeSelectedCursorImg() {
    this._cursorFollower.innerHTML = "";
    this.notify("");
  }

  selectNewCursorImg(newImg, action) {
    this.removeSelectedCursorImg();
    this._cursorFollower.appendChild(newImg);
    this.notify(action);
  }
}

class Toad {
  constructor(toadState) {
    this._toadState = toadState;
    this._toad = document.getElementById("toadImg");
    this.loadToad();
    document
      .getElementById("toadDivWrapper")
      .addEventListener("mouseenter", () => {
        this.toadonHoverDisplay();
      });
    document
      .getElementById("toadDivWrapper")
      .addEventListener("mouseleave", () => {
        this.toadcurrentStateDisplay();
      });
  }

  get toadState() {
    return this._toadState;
  }
  loadToad() {
    return new Promise((resolve) => {
      this._toad.addEventListener("load", () => {
        resolve(this._toad);
      });
    });
  }
  interactWithToad(action) {
    switch (action) {
      case "water":
        console.log("watering");
        break;
      case "educate":
        console.log("watering");
        break;
      default:
        console.log("poking");
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
    this._toad = new Toad();
    let cursorFollower = new CursorFollower();
    cursorFollower.addObserver(this);
    this.action;
  }
  update(action) {
    this.action = action;
  }
}

new ToadGame();
