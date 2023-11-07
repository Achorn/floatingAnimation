let bottleImg = createCurserImg("./assets/imgs/bottle-trans.png");
let bookImg = createCurserImg("./assets/imgs/book.png");
function createCurserImg(asset) {
  let img = document.createElement("img");
  img.src = asset;
  img.classList.add("curser-img");
  return img;
}
let toadImg = document.getElementById("toadImg");
function isTouchDevice() {
  return window.matchMedia("(any-hover: none)").matches;
}

//FUTURE LOADING

const loadImg = (img) =>
  new Promise((resolve) => {
    img.onload = () => {
      resolve({});
    };
  });

const googleFontsPromise = document.fonts.ready.then(function () {
  if (!document.fonts.check("12px Material-Icons")) {
    return Error;
  }
});
const delayPromise = new Promise((resolve) => setTimeout(resolve, 3000));
Promise.all([
  googleFontsPromise,
  delayPromise,
  toadImg.complete || loadImg(toadImg),
]).then(() => {
  document.getElementById("loading-container").style.display = "none";
  expandAndDisplay(document.getElementById("floatBoxContainer"), "flex");
  expandAndDisplay(document.getElementById("all-btn-holder"), "inline");
  expandAndDisplay(document.getElementById("health-display"), "inline");
});

function shrinkAndDlete(element) {
  element.classList.add("shrink");
  setTimeout(() => {
    element.remove();
  }, 500);
}
function expandAndDisplay(element, displayType) {
  element.classList.add("expand");
  element.style.display = displayType;
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
      case "health":
        this.selectNewCursorImg(bottleImg);
        break;
      case "education":
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
    this._toadImg = document.getElementById("toadImg");
    this._animating;
    this.animation;
    this.interval;
    this.restingImg = "./assets/imgs/toad-init-v2.png";
    this.happyOne = "./assets/imgs/emotes/toad-init-happy.png";
    this.happyTwo = "./assets/imgs/emotes/toad-init-happy-two.png";
  }
  resetAnimation() {}
  feedAnimation() {
    this.resetAnimation();
  }
  educateAnimation() {
    this.resetAnimation();
  }
  animateToad(img1, img2) {
    clearTimeout(this.interval);
    console.log("animating toad");
    this._toadImg.src = img1;
    let boo = true;
    let amount = 0;
    this.interval = setInterval(() => {
      if (amount == 2) {
        this._toadImg.src = this.restingImg;
        clearTimeout(this.interval);
        return;
      }
      amount++;
      if (boo) {
        console.log(boo);
        console.log("2");
        boo = false;
        this._toadImg.src = img2;
      } else {
        console.log("1");
        console.log(boo);
        boo = true;
        this._toadImg.src = img1;
      }
    }, 740);
  }

  interact(action) {
    switch (action) {
      case "health":
        this.animateToad(
          "./assets/imgs/emotes/toad-init-happy.png",
          "./assets/imgs/emotes/toad-init-happy-two.png"
        );
        break;
      case "education":
        this.animateToad(
          "./assets/imgs/emotes/toad-init-educate.png",
          "./assets/imgs/emotes/toad-init-educate2.png"
        );
        break;
      default:
        this.animateToad(
          "./assets/imgs/emotes/toad-hover-angry-one.png",
          "./assets/imgs/emotes/toad-init-angry-two.png"
        );
        break;
    }
  }
}

class ToadGame {
  constructor(toadState) {
    this._action = "";
    this.toad = new Toad();
    this.actionObservers = [];
    this._toadState = toadState || {
      health: Date.now(),
      education: Date.now(),
      age: Date.now(),
      education_points: 0,
      water_points: 0,
    };
    this.healthDisplay = new HealthDisplay(this._toadState);
    this.updateToadState();
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
    if (this._action) {
      let percentage = this.healthDisplay.calculatePercentage(
        this._toadState[this._action]
      );
      if (percentage > 70) {
        this.updateAction("");
      }
    }
    console.log("helloooo");
    this.toad.interact(this._action);
    this.updateToadState(this._action);
    this.updateAction("");
    this.healthDisplay.updateDisplay();
  }
  updateToadState(action) {
    if (action) {
      this._toadState[action] = Date.now();

      if (action == "health") {
        let curPoints = this._toadState.water_points || 0;
        this._toadState.water_points = curPoints + 1;
      }
      if (action == "education") {
        let curPoints = this._toadState.education_points || 0;
        this._toadState.education_points = curPoints + 1;
      }
    }
    localStorage.setItem("toad-state", JSON.stringify(this._toadState));
  }
}

class HealthDisplay {
  constructor(toadState) {
    this._state = toadState;
    this.fullSize = !isTouchDevice();
    this.initDisplay();
    this.interval = setInterval(() => {
      this.updateDisplay();
    }, 3000);
  }
  initDisplay() {
    this.display = document.getElementById("health-display");
    this.dataDisplay = document.getElementById("data-container");
    this.waterPerc = document.getElementById("water-percentage");
    this.barcontainers = document.getElementsByClassName("bar-container");
    this.eduPerc = document.getElementById("education-percentage");
    this.waterPerc.style.width = "0%";
    this.waterPerc.style.backgroundColor = "red";
    this.eduPerc.style.width = "0%";
    this.eduPerc.style.backgroundColor = "red";
    this.display.addEventListener("click", () => this.toggleSize());
    this.title = document.getElementById("health-display-title");
    this.fullSize ? this.makeBig() : this.makeSmall();
  }
  updateDisplay() {
    this.updateBarPercentage(this.waterPerc, this._state.health);
    this.updateBarPercentage(this.eduPerc, this._state.education);
  }

  updateBarPercentage(barPercentage, stat) {
    let percentage = this.calculatePercentage(stat);
    barPercentage.style.width = percentage + "%";
    barPercentage.style.backgroundColor = "green";
    barPercentage.style.backgroundColor = this.getBarColor(percentage);
  }
  calculatePercentage(stat) {
    const timeDifferenceMS = Date.now() - stat;
    // const timeDifferenceSecs = Math.floor(timeDifferenceMS / 1000);
    const timeDifferenceHours = Math.floor(timeDifferenceMS / 3600000);
    if (timeDifferenceHours > 36) return 0;
    return (100 * (36 - timeDifferenceHours)) / 36;
    // return Math.floor(Math.random() * +100);
  }
  getBarColor(number) {
    if (number > 75) return "green";
    if (number > 25) return "orange";
    return "red";
  }

  toggleSize() {
    this.fullSize ? this.makeSmall() : this.makeBig();
  }
  makeBig() {
    this.fullSize = true;
    this.display.classList.add("health-full");
    this.display.classList.remove("health-small");
    this.title.classList.remove("health-display-title-small");
    for (let bar of this.barcontainers) {
      bar.classList.add("bar-container-full");
      bar.classList.remove("bar-container-small");
    }
    for (let title of document.getElementsByClassName("bar-title")) {
      title.classList.remove("bar-title-small");
    }
  }
  makeSmall() {
    this.display.classList.remove("health-full");
    this.display.classList.add("health-small");
    this.title.classList.add("health-display-title-small");

    for (let bar of this.barcontainers) {
      bar.classList.remove("bar-container-full");
      bar.classList.add("bar-container-small");
    }
    for (let title of document.getElementsByClassName("bar-title")) {
      title.classList.add("bar-title-small");
    }
    this.fullSize = false;
  }
}

let localState = localStorage.getItem("toad-state");
if (localState) localState = JSON.parse(localState);
let game = new ToadGame(localState);
let cursorFollower = new CursorImg();
game.addObserver(cursorFollower);

//GAME PIECES
//web
let waterBtn = document.getElementById("waterBtn");
let readBtn = document.getElementById("readBtn");
let cancelBtn = document.getElementById("cancelBtn");
let toadBtn = document.getElementById("toadDivWrapper");

waterBtn.addEventListener("click", () => game.updateAction("health"));
readBtn.addEventListener("click", () => game.updateAction("education"));
cancelBtn.addEventListener("click", () => game.updateAction(""));
toadBtn.addEventListener("click", () => game.interactWithToad());

//mobile
let mobWaterBtn = document.getElementById("mob-water-btn");
let mobReadBtn = document.getElementById("mob-read-btn");

mobWaterBtn.addEventListener("click", () => {
  game.updateAction("health");
  game.interactWithToad();
});
mobReadBtn.addEventListener("click", () => {
  game.updateAction("education");
  game.interactWithToad();
});
