let displayImage = document.querySelector(".country-flag");
let countryName = document.querySelector(".country-names");
let showPoints = document.querySelector(".show-points");
let optionsBtn = document.querySelector(".country-names");
let startBtn = document.querySelector(".start-btn");
let userInfo = document.getElementById("user-name");
let userDiv = document.querySelector(".user-info");
let displayUsername = document.querySelector(".display-username");

let fourCountriesIndex = [];
let randomCountries = [];
let points = 3;
let isLogged = false;
let data;
let correctAnswer;
let userName;

const numberGenerator = () => {
  return Math.floor(Math.random() * 251);
};

const pushFourCountries = (countriesIndex, array, data) => {
  countriesIndex.forEach((index) => array.push(data[index]));
};

const pickFourCountries = () => {
  for (let i = 0; i < 4; i++) {
    if (fourCountriesIndex.includes(numberGenerator())) {
      console.log("error");
    } else {
      fourCountriesIndex.push(numberGenerator());
    }
  }
};

const answer = (obj) => {
  let {
    flags: { png },
    name: { common },
  } = obj[0];
  displayImage.setAttribute("src", png);
  correctAnswer = common;
  console.log(correctAnswer);
};

const displayOptions = (array, targetHtml) => {
  array.map((el) => {
    let country = el.name.common;
    let html = `<button value="${country}" class="option-btn">${country}</button>`;
    targetHtml.insertAdjacentHTML("beforeend", html);
  });
};

const displayGameOver = (targetHtml) => {
  let html = `<h1 class="country-names">GAME OVER</h1>`;
  targetHtml.insertAdjacentHTML("beforeend", html);
};

let shuffleArray = (array) => {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const displayPoints = (number) => {
  showPoints.innerHTML = `points:${number}`;
};

const fadeEffect = (htmlTarget) => {
  htmlTarget.classList.add("fade-effect");
  setTimeout(() => {
    htmlTarget.classList.remove("fade-effect");
  }, 2000);
};

const restart = () => {
  randomCountries = [];
  fourCountriesIndex = [];
  if (points > 0) {
    setTimeout(() => {
      pickFourCountries();
      pushFourCountries(fourCountriesIndex, randomCountries, data);
      answer(randomCountries);
      fadeEffect(displayImage);
      fadeEffect(countryName);
      while (countryName.hasChildNodes()) {
        countryName.removeChild(countryName.firstChild);
      }
      displayOptions(shuffleArray(randomCountries), countryName);
    }, 1000);
  }
  if (points === 0) {
    while (optionsBtn.hasChildNodes()) {
      optionsBtn.removeChild(optionsBtn.firstChild);
    }
    displayGameOver(optionsBtn);
  }
};

async function getData() {
  let countries = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags"
  );
  data = await countries.json();
  pickFourCountries();
  pushFourCountries(fourCountriesIndex, randomCountries, data);
  answer(randomCountries);
  displayOptions(shuffleArray(randomCountries), countryName);
  displayPoints(points);
}
getData();

countryName.addEventListener("click", function (e) {
  if (e.target.classList.contains("option-btn")) {
    let value = e.target.value;
    if (value === correctAnswer) {
      points++;
      e.target.classList.add("correct-answer");
    } else {
      points--;
      e.target.classList.add("incorrect-answer");
    }
    displayPoints(points);
    restart();
  }
});

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  userName = userInfo.value;
  userDiv.style.display = "none";
  displayImage.classList.remove("to-hide");
  optionsBtn.classList.remove("to-hide");
  displayUsername.innerHTML = userName;
});
