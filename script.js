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
document.getElementById("toadSvg").addEventListener("click", () => {
  cursorFollower.removeSelectedCursorImg();
});
// class ToadGame {
//   constructor() {
//     // this._hunger = 100;
//     // this._education = 100;
//   // }
// }

// new ToadGame();
