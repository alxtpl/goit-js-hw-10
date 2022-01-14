import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const listNode = document.querySelector('.country-list');
const infoNode = document.querySelector('.country-info');

const inputNode = document.querySelector('#search-box');
inputNode.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY));

function clearNode() {
    listNode.innerHTML = '';
    infoNode.innerHTML = '';
}

function getCountry() {
    const inputValue = inputNode.value;
    fetchCountries(inputValue)
        .then(data => {
            if (data.length > 10) {
                clearNode();
                Notify.info('Too many matches found. Please enter a more specific name.');
            } else {
                clearNode();

                if (data.length >= 2 && data.length <= 10) {
                    const markup = data.map(item => {
                        return `<li class="item"><img src="${item.flags.svg}" alt=""><p>${item.name.official}</p></li>`;
                    });
                    listNode.insertAdjacentHTML('afterbegin', markup.join(''));
                } else {
                    const markupSecond = data.map(item => {
                        clearNode();

                        return `<ul>
    <li>
        <img src="${item.flags.svg}" alt="">
        <p class="counntry-header">${item.name.official}</p>
    </li>
    <li>
        <p class="country-key">Capital:</p>
        <p class="coutry-value">${item.capital}</p>
    </li>
    <li>
        <p class="country-key">Population:</p>
        <p class="coutry-value">${item.population}</p>
    </li>
    <li>
        <p class="country-key">Languages:</p>
        <p class="coutry-value">${Object.values(item.languages)}</p>
    </li>
</ul>`;
                    });
                    infoNode.insertAdjacentHTML('afterbegin', markupSecond.join(''));
                }
            }

            // listNode.innerHTML = data.map(item => item.name.official).join('');
        })
        .catch(() => {
            clearNode();
            Notify.failure('Oops, there is no country with that name');
        });
}