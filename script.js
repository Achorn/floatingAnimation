let bottleImg = createCurserImg("./assets/imgs/bottle-trans.png");
let bookImg = createCurserImg("./assets/imgs/book.png");

function createCurserImg(asset) {
  let img = document.createElement("img");
  img.src = asset;
  img.classList.add("curser-img");
  document.body.appendChild(img);
  return img;
}

addEventListener("mousemove", (event) => {
  let x = event.pageX;
  let y = event.pageY;
  let selectedImg = document.getElementsByClassName("selected-cursor-img")[0];
  if (selectedImg) {
    selectedImg.style.top = y + -20 + "px";
    selectedImg.style.left = x + -20 + "px";
  }
});

let waterBtn = document.getElementById("waterBtn");
waterBtn.addEventListener("click", (e) => {
  selectNewCursorImg(bottleImg, e);
});

let readBtn = document.getElementById("readBtn");
readBtn.addEventListener("click", (e) => {
  selectNewCursorImg(bookImg, e);
});

let cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", removeSelectedCursorImg);

let selectedCusorImg;
function selectNewCursorImg(newImg, e) {
  removeSelectedCursorImg();
  document.body.style.cursor = "none";
  selectedCusorImg = newImg;
  selectedCusorImg.classList.add("selected-cursor-img");

  let x = e.pageX;
  let y = e.pageY;
  selectedCusorImg.style.top = y + -20 + "px";
  selectedCusorImg.style.left = x + -20 + "px";
}

function removeSelectedCursorImg() {
  document.body.style.cursor = null;
  if (selectedCusorImg) {
    selectedCusorImg.classList.remove("selected-cursor-img");
  }
}

let toadHitBox = document.getElementById("toadSvg");

toadHitBox.addEventListener("click", () => {
  removeSelectedCursorImg();
});
