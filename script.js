// let bottleImg = createCurserImg("./assets/imgs/bottle-trans.png");
// let bookImg = createCurserImg("./assets/imgs/book.png");

// function createCurserImg(asset) {
//   let img = document.createElement("img");
//   img.src = asset;
//   img.classList.add("curser-img");
//   return img;
// }

let cursorFollower = document.createElement("div");
cursorFollower.classList.add("cursor-img-container");
document.body.appendChild(cursorFollower);

addEventListener("mousemove", (event) => {
  let x = event.pageX;
  let y = event.pageY;
  cursorFollower.style.top = y + -20 + "px";
  cursorFollower.style.left = x + -20 + "px";
});

let waterBtn = document.getElementById("waterBtn");
waterBtn.addEventListener("click", (e) => {
  selectNewCursorImg(nalgeneCursor.img, e);
});

let readBtn = document.getElementById("readBtn");
readBtn.addEventListener("click", (e) => {
  selectNewCursorImg(bookCursor.img, e);
});

let cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", removeSelectedCursorImg);

let selectedCusorImg;
function selectNewCursorImg(newImg, e) {
  removeSelectedCursorImg();
  cursorFollower.appendChild(newImg);
}

function removeSelectedCursorImg() {
  cursorFollower.innerHTML = "";
}

let toadHitBox = document.getElementById("toadSvg");

toadHitBox.addEventListener("click", () => {
  removeSelectedCursorImg();
});

class CursorImg {
  constructor(src) {
    let newImg = document.createElement("img");
    newImg.src = src;
    newImg.classList.add("curser-img");
    this._img = newImg;
  }
  get img() {
    return this._img;
  }
}

let nalgeneCursor = new CursorImg("./assets/imgs/bottle-trans.png");
let bookCursor = new CursorImg("./assets/imgs/book.png");

class ToadGame {
  constructor() {
    console.log("contstructed?");
  }
}

new ToadGame();
