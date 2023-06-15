let displayImage = document.querySelector(".country-flag");
let countryName = document.querySelector(".country-names");

let fourCountriesIndex = [];
let randomCountries = [];
let correctAnswer;

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
  const {
    flags: { png },
    name: { common },
  } = obj[0];
  displayImage.setAttribute("src", png);
  correctAnswer = common;
  console.log(correctAnswer);
};

const displayOptions = (array, targetHtml) => {
  console.log(randomCountries);
  array.map((el) => {
    let country = el.name.common;
    const html = `<button value="${country} "class="option-btn">${country}</button>`;
    targetHtml.insertAdjacentHTML("beforeend", html);
  });
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

async function getData() {
  let countries = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags"
  );
  let data = await countries.json();
  pickFourCountries();
  pushFourCountries(fourCountriesIndex, randomCountries, data);
  answer(randomCountries);
  displayOptions(shuffleArray(randomCountries), countryName);
}
getData();

countryName.addEventListener("click", function (e) {
  let value = e.target.value;
});
