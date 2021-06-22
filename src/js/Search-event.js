import debounce from 'lodash.debounce';
import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import countryList from '../tamplates/countryList.hbs';
import NewsApiService from './apiService';
import selectCountry from '/js/selectCountry.js';


const refs = getRefs();
const newsApiService = new NewsApiService();
refs.inputSearchForm.addEventListener('input', debounce(onInput, 2000));
refs.inputCountryForm.addEventListener('click', debounce(onInputCountry, 2000));

refs.dropList.addEventListener('change', e => 
    selectCountry(e, refs.dropList)
);

if (newsApiService.query == 0) {
    randomList();
}

function onInput(e) {
  e.preventDefault();  
  newsApiService.query = e.target.value;  
  newsApiService.resetPage();
  clearContainer();
  fetchHits();  
};

function randomList() {
    newsApiService.fetchRandom().then(events => {
        appendMarkup(events);
    
    });
}

function fetchHits() {    
    newsApiService.fetchArticles().then(events => {
        appendMarkup(events);
    });
}

function appendMarkup(events) { 
    refs.eventList.insertAdjacentHTML('beforeend', eventTLP(events));    
}
  
function clearContainer() {
    refs.eventList.innerHTML = '';
}

function onInputCountry(e) {
  e.preventDefault();
  dropListdMarkup();  
};

// function fetchByCountry() {
//     newsApiService.fetchCountries().then(venues => {
//         refs.dropList.hidden = false;
//         refs.dropBgColor.hidden = false;
//         const countryArray = venues.reduce((acc, venue) => {
//         acc.push(venue.country.name);
//         return acc
//     }, []);
//     // const uniqueCountry = countryArray.filter((country, index) => countryArray.indexOf(country) === index);
    
//     return refs.dropList.innerHTML = countryArray.map(elem => `<li class="drop-country">${elem}</li>`).join('');
//     });
// }
function dropListdMarkup() { 
    refs.dropList.insertAdjacentHTML('beforeend', countryList());
}

import countryListTpl from '../tamplates/country-list.hbs';
const countryListDouble = document.querySelector('.country-list');
const selectCountryBtn = document.getElementById('select-country-btn');
const countryBtnList = document.querySelectorAll('li');

dropdown(selectCountryBtn);

const countries = {
  US: 'USA',
  AD: 'Andorra',
  AI: 'Anguilla',
  AR: 'Argentina',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BB: 'Barbados',
  BE: 'Belgium',
  BM: 'Bermuda',
  BR: 'Brazil',
  BG: 'Bulgaria',
  CA: 'Canada',
  CL: 'Chile',
  CN: 'China',
  CO: 'Colombia',
  CR: 'Costa Rica',
  HR: 'Croatia',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EE: 'Estonia',
  FO: 'Faroe Islands',
  FI: 'Finland',
  FR: 'France',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GB: 'Great Britain',
  GR: 'Greece',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  IE: 'Ireland',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  KR: 'Korea, Republic of',
  LV: 'Latvia',
  LB: 'Lebanon',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MY: 'Malaysia',
  MT: 'Malta',
  MX: 'Mexico',
  MC: 'Monaco',
  ME: 'Montenegro',
  MA: 'Morocco',
  NL: 'Netherlands',
  AN: 'Netherlands Antilles',
  NZ: 'New Zealand',
  ND: 'Northern Ireland',
  NO: 'Norway',
  PE: 'Peru',
  PL: 'Poland',
  PT: 'Portugal',
  RO: 'Romania',
  RU: 'Russian Federation',
  LC: 'Saint Lucia',
  SA: 'Saudi Arabia',
  RS: 'Serbia',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  ZA: 'South Africa',
  ES: 'Spain',
  SE: 'Sweden',
  CH: 'Switzerland',
  TW: 'Taiwan',
  TH: 'Thailand',
  TT: 'Trinidad and Tobago',
  TR: 'Turkey',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  UY: 'Uruguay',
  VE: 'Venezuela',
}

countryListDouble.innerHTML = countryListTpl({countries});

function dropdown(element) {
  element.addEventListener('click', function () {
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
      countryListDouble.addEventListener('click', function (e) {
        closeTargetElm(e.target, element);
      });
    } else {
      countryListDouble.removeEventListener('click', function (e) {
        closeTargetElm(e.target, element);
      });
    }
  });
}

function closeTargetElm(target, element) {
  if (target !== element) {
    element.classList.remove('active');
    target
      .closest('ul')
      .querySelectorAll('li')
      .forEach(el => el.classList.remove('current'));
    target.classList.add('current');
    element.innerText = target.innerText;
  }
}

countryListDouble.addEventListener('click', onSearching);
function onSearching(e) {
  e.preventDefault();
  updateApiByEvent(e);
  fetchHits();
}
function updateApiByEvent(e) {
  if (
    e.target.classList.contains('country-button') &&
    e.target.dataset.countryCode
  ) {
    newsApiService.query = e.target.value;
  }
  
}