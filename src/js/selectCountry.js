import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import NewsApiService from './apiService';

const refs = getRefs();
const newsApiService = new NewsApiService();

export default function selectCountry(e, list) {
    newsApiService.query = e.target.value;
    // list.innerHTML = '<option selected disabled>Choose country</option>';
    clearContainer();
    fetchHits();
}

function fetchHits() {
  newsApiService.fetchByCountries().then(events => {
    appendMarkup(events);
  });
}

function appendMarkup(events) { 
  refs.eventList.insertAdjacentHTML('beforeend', eventTLP(events));
}

function clearContainer() {
    refs.eventList.innerHTML = '';
}