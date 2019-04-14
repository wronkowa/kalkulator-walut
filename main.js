const wejscieKwotaHtml = document.querySelector('#do-przeliczenia');
const wyjscieWalutaHtml = document.getElementsByName('walutaWyjscie');
let wyjscieWaluta;
let wejscieKwota;
const wynikHtml = document.querySelector('.wynikSpan');
const today = wyswietlDate();
document.querySelector('.today').textContent = today;
const wysw = document.querySelectorAll('span.kurs');
const proxy = "https://cors-anywhere.herokuapp.com/";
const apiEuro = `${proxy}https://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json`;
const apiDolar = `${proxy}https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json`;
const apiFunt = `${proxy}https://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json`;

let api;

wyswietlenieKursu();

document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();
  if (wejscieKwotaHtml.value === "") return alert("wpisz kwotę do przeliczenia");
  else {
    wejscieKwota = wejscieKwotaHtml.value;
    console.log(`kwota do przeliczenia: ${wejscieKwota}`);
  }
  // sprWybranejWalutyWejscie();
  sprWybranejWalutyWyjscie();
  wyborApi(wyjscieWaluta);
  pobranieKursuWaluty(api, wejscieKwota);


})

// function sprWybranejWalutyWejscie() {
//   wejscieWalutaHtml.forEach(wejscie => {
//     if (wejscie.checked) {
//       wejscieWaluta = wejscie.value;
//       console.log(`wybrana waluta wejsciowa to: ${wejscieWaluta}`)
//     }
//   })
// }

function sprWybranejWalutyWyjscie() {
  wyjscieWalutaHtml.forEach(wyjscie => {
    if (wyjscie.checked) {
      wyjscieWaluta = wyjscie.value;
      // console.log(`wybrana waluta wyjsciowa to: ${wyjscieWaluta}`)
    }
  })

}

function pobranieAktualnejDaty() {
  const data = new Data();
  console.log(data);
}

function wyswietlDate() {

  const Today = new Date();
  let Month = Today.getMonth() + 1;
  let Day = Today.getDate();
  const Year = Today.getFullYear();
  if (Year <= 99) Year += 1900
  if (Month <= 9) Month = `0${Month}`;
  if (Day <= 9) Day = `0${Day}`;
  return Year + "-" + Month + "-" + Day;

}

function pobranieKursuWaluty(api, kwota) {

  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // console.log(data);
      const kurs = data.rates[0].mid;
      // console.log(kurs);
      const wynik = Math.round(((kwota / kurs) * 100)) / 100;
      wynikHtml.textContent = `${wejscieKwota}PLN to ${wynik}${wyjscieWaluta.toUpperCase()}`;
      // console.log(kurs);
    });
}
function wyswietlenieKursu() {
  const apiTab = [apiEuro, apiDolar, apiFunt];

  apiTab.forEach((api, index) => {
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        const kurs = data.rates[0].mid;
        wysw[index].textContent = kurs;
      })
  })

}

function wyborApi(waluta) {
  if (wyjscieWaluta === "eur") api = apiEuro;
  else if (wyjscieWaluta === "usd") api = apiDolar;
  else api = apiFunt;
  return api;
}