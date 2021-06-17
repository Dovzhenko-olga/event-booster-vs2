import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import NewsApiService from './apiService';

const refs = getRefs();
const newsApiService = new NewsApiService();

export default function selectCountry(e, searchQuery, list) {
  if (e.target.nodeName === 'LI') {
    searchQuery.value = e.target.textContent;
    list.innerHTML = '';
    list.hidden = true;
    refs.dropBgColor.hidden = true;

    clearContainer();
    fetchHits();
  }
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