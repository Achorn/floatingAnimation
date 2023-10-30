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
document.getElementById("toadImg").addEventListener("click", () => {
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
    this._toad.addEventListener("mouseenter", () => {
      //show suprise expression
    });
    this._toad.addEventListener("mouseleave", () => {
      //revert to selected state
    });
  }

  loadToad() {
    return new Promise((resolve) => {
      this._toad.addEventListener("load", () => {
        resolve(this._toad);
      });
    });
  }
  // toad state

  //takes care of toads state and animations?

  // toad on hover
}
let toad = new Toad();
