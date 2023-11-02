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
    switch (action) {
      case "health":
        this.feedAnimation();
        break;
      case "education":
        this.educateAnimation();
        break;
      default:
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
    };
    this.updateToadState();
    this.healthDisplay = new HealthDisplay(this._toadState);
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
    this.updateToadState(this._action);
    this.updateAction("");
    this.healthDisplay.updateDisplay();
  }
  updateToadState(action) {
    if (action) this._toadState[action] = Date.now();
    localStorage.setItem("toad-state", JSON.stringify(this._toadState));
  }
}

class HealthDisplay {
  constructor(toadState) {
    this._state = toadState;
    this.createDisplay();
    this.interval = setInterval(() => {
      this.updateDisplay();
    }, 3000);
  }
  createDisplay() {
    this.display = document.getElementById("health-display");
    document.body.appendChild(this.display);

    this.dataDisplay = document.getElementById("data-container");

    // this.display.appendChild(this.dataDisplay);
    this.dataDisplay.appendChild(this.createData("water", this._state.health));
    this.dataDisplay.appendChild(
      this.createData("education", this._state.education)
    );
  }
  updateDisplay() {
    this.updateBarPercentage(
      document.getElementById("water-percentage"),
      this._state.health
    );
    this.updateBarPercentage(
      document.getElementById("education-percentage"),
      this._state.education
    );
  }
  createData(title, stat) {
    let dataContainer = document.createElement("div");
    dataContainer.classList.add("data-display");
    let titleDiv = document.createElement("p");
    titleDiv.innerHTML = title;
    dataContainer.appendChild(titleDiv);
    //update eductation
    let bar = this.createBarGraph(title, stat);
    dataContainer.appendChild(bar);
    return dataContainer;
  }
  createBarGraph(title, stat) {
    let barContainer = document.createElement("div");
    barContainer.classList.add("bar-container");
    let barPercentage = document.createElement("div");
    barPercentage.classList.add("bar-percentage");
    barPercentage.id = title + "-percentage";

    barContainer.appendChild(barPercentage);
    this.updateBarPercentage(barPercentage, stat);
    return barContainer;
  }
  updateBarPercentage(barPercentage, stat) {
    let percentage = this.calculatePercentage(stat);
    barPercentage.style.width = percentage + "%";
    barPercentage.style.backgroundColor = "green";
    barPercentage.style.backgroundColor = this.getBarColor(percentage);
  }
  calculatePercentage(stat) {
    const timeDifferenceMS = Date.now() - stat;
    const timeDifferenceSecs = Math.floor(timeDifferenceMS / 1000);
    // const timeDifferenceHours = Math.floor(timeDifferenceMS / 3600000);
    // 36 hours till depleated
    if (timeDifferenceSecs > 60) return 0;
    return (100 * (60 - timeDifferenceSecs)) / 60;
    // return Math.floor(Math.random() * +100);
  }
  getBarColor(number) {
    if (number > 75) return "green";
    if (number > 25) return "orange";
    return "red";
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
