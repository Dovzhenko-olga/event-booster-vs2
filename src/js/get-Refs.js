export default function getRefs() {
    return {
        inputSearchForm: document.querySelector('.js-search-form'),
        inputCountryForm: document.querySelector('.js-country-form'),
        eventList: document.querySelector('.js-event-list'),
        dropList: document.querySelector('.js-dropdown'),
        listOfCountry: document.querySelector('select'),
        dropBgColor: document.querySelector('.country-block '),
    };
}