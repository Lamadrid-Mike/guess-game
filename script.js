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
    if (!fourCountriesIndex.includes(numberGenerator())) {
      fourCountriesIndex.push(numberGenerator());
    }
  }
};

const destructuring = (obj) => {
  const {
    flags: { png },
    name: { common },
  } = obj[0];
  displayImage.setAttribute("src", png);
  correctAnswer = common;
};

const displayOptions = (array, targetHtml) => {
  array.map((el) => {
    const html = `<button>${el.name.common}</button>`;
    targetHtml.insertAdjacentHTML("beforeend", html);
  });
};

async function getData() {
  let countries = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags"
  );
  let data = await countries.json();
  pickFourCountries();
  pushFourCountries(fourCountriesIndex, randomCountries, data);
  destructuring(randomCountries);
  displayOptions(randomCountries, countryName);
  console.log(randomCountries);
}
getData();
