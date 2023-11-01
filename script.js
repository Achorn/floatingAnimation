// let bottleImg = createCurserImg("./assets/imgs/bottle-trans.png");
// let bookImg = createCurserImg("./assets/imgs/book.png");
// function createCurserImg(asset) {
//   let img = document.createElement("img");
//   img.src = asset;
//   img.classList.add("curser-img");
//   return img;
// }

// class CursorFollower {
//   constructor() {
//     let cursorFollower = document.createElement("div");
//     cursorFollower.classList.add("cursor-img-container");
//     document.body.appendChild(cursorFollower);
//     this._cursorFollower = cursorFollower;
//     addEventListener("mousemove", (event) => {
//       let x = event.pageX;
//       let y = event.pageY;
//       cursorFollower.style.top = y + -20 + "px";
//       cursorFollower.style.left = x + -20 + "px";
//     });
//     this.observers = [];

//     // document.getElementById("waterBtn").addEventListener("click", () => {
//     //   this.selectNewCursorImg(bottleImg, "water");
//     // });
//     // document.getElementById("readBtn").addEventListener("click", () => {
//     //   this.selectNewCursorImg(bookImg, "book");
//     // });
//     // document.getElementById("cancelBtn").addEventListener("click", () => {
//     //   this.removeSelectedCursorImg();
//     // });
//     // document.getElementById("toadDivWrapper").addEventListener("click", () => {
//     //   this.removeSelectedCursorImg();
//     // });
//   }

//   removeSelectedCursorImg() {
//     this._cursorFollower.innerHTML = "";
//     this.notify("");
//   }

//   selectNewCursorImg(newImg, action) {
//     this.removeSelectedCursorImg();
//     this._cursorFollower.appendChild(newImg);
//     this.notify(action);
//   }
// }

class Toad {
  constructor() {
    this._toad = document.getElementById("toadDivWrapper");
    this._animating;
    this.animation;
  }
  resetAnimation() {
    console.log("resetting animation");
  }
  feedAnimation() {
    this.resetAnimation();
    console.log("water animatin");
  }
  educateAnimation() {
    this.resetAnimation();
    console.log("educate animating");
  }

  interact(action) {
    console.log(action);
    switch (action) {
      case "water":
        console.log("watering");
        break;
      case "read":
        console.log("reading");
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
    // let cursorFollower = new CursorFollower();
    this._action = "";
    this.toad = new Toad();
  }

  set action(act) {
    this._action = act;
  }
  interactWithToad() {
    this.toad.interact(this._action);
    this._action = "";
  }
}

let game = new ToadGame();

//Game pieces

//buttons
let waterBtn = document.getElementById("waterBtn");
let readBtn = document.getElementById("readBtn");
let cancelBtn = document.getElementById("cancelBtn");
let toadBtn = document.getElementById("toadDivWrapper");
waterBtn.addEventListener("click", () => {
  game.action = "water";
  // this.selectNewCursorImg(bottleImg, "water");
});
readBtn.addEventListener("click", () => {
  game.action = "read";
  // this.selectNewCursorImg(bookImg, "book");
});
cancelBtn.addEventListener("click", () => {
  game.action = "";
  // this.removeSelectedCursorImg();
});
toadBtn.addEventListener("click", () => {
  console.log("clicked");
  game.interactWithToad();
  // this.removeSelectedCursorImg();
});
