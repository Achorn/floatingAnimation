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
    this.display = document.createElement("div");
    this.display.classList.add("health-display");
    document.body.appendChild(this.display);
    //title
    let title = document.createElement("h2");
    title.innerHTML = "health";

    this.display.appendChild(title);

    this.dataDisplay = document.createElement("div");

    this.display.appendChild(this.dataDisplay);
    this.updateDisplay();
  }
  updateDisplay() {
    this.dataDisplay.innerHTML = "";
    this.dataDisplay.appendChild(this.createData("water", this._state.health));
    this.dataDisplay.appendChild(
      this.createData("education", this._state.education)
    );
  }
  createData(title, stat) {
    let dataContainer = document.createElement("div");
    dataContainer.classList.add("data-display");
    let titleDiv = document.createElement("p");
    titleDiv.innerHTML = title;
    dataContainer.appendChild(titleDiv);
    //update eductation
    let bar = this.createBarGraph(stat);
    dataContainer.appendChild(bar);
    return dataContainer;
  }
  createBarGraph(stat) {
    let barContainer = document.createElement("div");
    barContainer.classList.add("bar-container");
    let barPercentage = document.createElement("div");
    barPercentage.classList.add("bar-percentage");
    barContainer.appendChild(barPercentage);
    let percentage = this.calculatePercentage(stat);
    barPercentage.style.width = percentage + "%";
    barPercentage.style.backgroundColor = "green";
    barPercentage.style.backgroundColor = this.getBarColor(percentage);
    return barContainer;
  }
  calculatePercentage(stat) {
    const timeDifferenceMS = Date.now() - stat;
    const timeDifferenceSecs = Math.floor(timeDifferenceMS / 1000);
    // const timeDifferenceHours = Math.floor(timeDifferenceMS / 3600000);
    // 36 hours till depleated
    if (timeDifferenceSecs > 600) return 0;
    return (100 * (600 - timeDifferenceSecs)) / 600;
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
let waterBtn = document.getElementById("waterBtn");
let readBtn = document.getElementById("readBtn");
let cancelBtn = document.getElementById("cancelBtn");
let toadBtn = document.getElementById("toadDivWrapper");

waterBtn.addEventListener("click", () => game.updateAction("health"));
readBtn.addEventListener("click", () => game.updateAction("education"));
cancelBtn.addEventListener("click", () => game.updateAction(""));
toadBtn.addEventListener("click", () => game.interactWithToad());
