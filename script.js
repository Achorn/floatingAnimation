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
  }
  removeSelectedCursorImg() {
    this._cursorFollower.innerHTML = "";
  }

  selectNewCursorImg(newImg) {
    this.removeSelectedCursorImg();
    this._cursorFollower.appendChild(newImg);
  }
}
let cursorFollower = new CursorFollower();

document.getElementById("waterBtn").addEventListener("click", () => {
  cursorFollower.selectNewCursorImg(bottleImg);
});
document.getElementById("readBtn").addEventListener("click", () => {
  cursorFollower.selectNewCursorImg(bookImg);
});
document.getElementById("cancelBtn").addEventListener("click", () => {
  cursorFollower.removeSelectedCursorImg();
});
document.getElementById("toadDivWrapper").addEventListener("click", () => {
  cursorFollower.removeSelectedCursorImg();
});
class ToadGame {
  constructor() {
    this._hunger = 100;
    this._education = 100;
    this._selectedAction = null;
  }
}

new ToadGame();

class Toad {
  constructor() {
    console.log("toad constructor");
    this._toad = document.getElementById("toadImg");
    this.loadToad();
    document
      .getElementById("toadDivWrapper")
      .addEventListener("mouseenter", () => {
        //show suprise expression
        console.log("in init hover");
        this.toadonHoverDisplay();
      });
    document
      .getElementById("toadDivWrapper")
      .addEventListener("mouseleave", () => {
        //revert to selected state
        this.toadcurrentStateDisplay();
      });
  }

  loadToad() {
    return new Promise((resolve) => {
      this._toad.addEventListener("load", () => {
        resolve(this._toad);
      });
    });
  }

  toadonHoverDisplay() {
    console.log("hovered");
    let hovImg = document.getElementById("toadImgHover");
    hovImg.style.display = "inline";
    this._toad.style.display = "none";
  }
  toadcurrentStateDisplay() {
    console.log("left");
    let hovImg = document.getElementById("toadImgHover");
    hovImg.style.display = "none";
    this._toad.style.display = "inline";
  }
  // toad state

  //takes care of toads state and animations?

  // toad on hover
}
let toad = new Toad();
