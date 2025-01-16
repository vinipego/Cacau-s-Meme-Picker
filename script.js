import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");
const vitorThemeBtn = document.querySelector("#theme-vitor");
const leticiaThemeBtn = document.querySelector("#theme-leticia");

vitorThemeBtn.addEventListener("click", (e) => {
  vitorThemeBtn.disabled = true;
  leticiaThemeBtn.disabled = false;
  // add classes with new colors
  document
    .querySelector(".header-wrapper")
    .classList.add("header-wrapper-vitor-theme");
  document.querySelector(".logo").classList.add("logo-vitor-theme");
  document.querySelector(".fieldset").classList.add("fieldset-vitor-theme");
  document
    .querySelector(".cacau-span")
    .classList.add("legend-span-vitor-theme");
  document
    .querySelector(".emotion-span")
    .classList.add("legend-span-vitor-theme");
  document.querySelector(".radio").classList.add("radio-vitor-theme");
  document
    .querySelector(".get-image-btn")
    .classList.add("get-image-btn-vitor-theme");
  document.querySelector(".meme-modal").classList.add("meme-modal-vitor-theme");
  document
    .querySelector(".app-wrapper")
    .classList.add("app-wrapper-vitor-theme");
});

leticiaThemeBtn.addEventListener("click", (e) => {
  vitorThemeBtn.disabled = false;
  leticiaThemeBtn.disabled = true;

  // remove classes with new colors
  document
    .querySelector(".header-wrapper")
    .classList.remove("header-wrapper-vitor-theme");
  document.querySelector(".logo").classList.remove("logo-vitor-theme");
  document.querySelector(".fieldset").classList.remove("fieldset-vitor-theme");
  document
    .querySelector(".cacau-span")
    .classList.remove("legend-span-vitor-theme");
  document
    .querySelector(".emotion-span")
    .classList.remove("legend-span-vitor-theme");
  document.querySelector(".radio").classList.remove("radio-vitor-theme");
  document
    .querySelector(".get-image-btn")
    .classList.remove("get-image-btn-vitor-theme");
  document
    .querySelector(".meme-modal")
    .classList.remove("meme-modal-vitor-theme");
  document
    .querySelector(".app-wrapper")
    .classList.remove("app-wrapper-vitor-theme");
});

emotionRadios.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", closeModal);

getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
  memeModal.style.display = "none";
}

document.addEventListener("click", (e) => {
  if (
    memeModal.style.display === "flex" &&
    !e.target.closest("#meme-modal") &&
    !e.target.closest("#get-image-btn")
  ) {
    console.log("clicked");
    closeModal();
  }
});

function renderCat() {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./img/${catObject.image}"
        alt="${catObject.alt}"
        >
        `;
  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNumber];
  }
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
