import './style.css';
import { format } from 'date-fns';
import { getLocation, getCityText, getLongLat } from './location';
import {
  searchSMHI,
  getTodayWeather,
  getWeatherIcon,
  getParaData,
} from './weather';

const city = document.getElementById('city');
const loc = document.getElementById('loc');
const dataDiv = document.getElementById('data');

function cardCreator() {
  const containerDiv = document.createElement('div');
  const headerDiv = document.createElement('div');
  const contentDiv = document.createElement('div');
  containerDiv.classList.add('card', 'container');
  dataDiv.appendChild(containerDiv);
  headerDiv.classList.add('card', 'header');
  contentDiv.classList.add('card', 'content');
  containerDiv.appendChild(headerDiv);
  containerDiv.appendChild(contentDiv);
  return containerDiv;
}

function symbolToCard(div, weatherData) {
  const today = getTodayWeather(weatherData);
  console.log(today[0]);
  const dateWithHour = format(new Date(today[0].validTime), "MM/dd 'kl' HH");
  const parametersTemp = today[0].parameters.find(item => item.name === 't');
  const tempVal = parametersTemp.values[0];
  const img = document.createElement('img');
  div.appendChild(img);
  img.src = getWeatherIcon(today[0]);
}

function paraSorter(para) {
  return {
    t: 'Temperature: ',
    wd: 'Wind direction: ',
    ws: 'Wind speed: ',
    pcat: 'Precipitation: ',
    pmean: 'Precipitation intensity: ',
  }[para];
}

function suffixSorter(para) {
  return {
    t: ' °C',
    ws: ' m/s',
  }[para];
}

function dataToCard(div, weatherData) {
  const today = getTodayWeather(weatherData);
  console.log(today[0]);
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info');
  div.appendChild(infoDiv);
  const getParams = ['t', 'wd', 'ws', 'pcat', 'pmean'];
  getParams.forEach(para => {
    const divRow = document.createElement('div');
    divRow.classList.add('row');
    const paraPrefix = document.createElement('div');
    paraPrefix.innerText = paraSorter(para);
    divRow.appendChild(paraPrefix);
    const divValue = document.createElement('div');
    const value = getParaData(para, today[0]);
    divValue.innerText = ` ${value} `;
    divRow.appendChild(divValue);
    if (suffixSorter(para) !== undefined) {
      const divSuffix = document.createElement('div');
      divSuffix.innerText = suffixSorter(para);
      divRow.appendChild(divSuffix);
    }
    infoDiv.appendChild(divRow);
  });
}

function fillCard(div, weatherData) {
  symbolToCard(div, weatherData);
  dataToCard(div, weatherData);
}

function createToday(cityText, weatherData) {
  const cardDiv = cardCreator();
  const header = cardDiv.querySelector('.header');
  const cityTextSplit = cityText.split(', ');
  header.innerText = `${cityTextSplit[0]}, ${
    cityTextSplit[cityTextSplit.length - 1]
  }`;
  const content = cardDiv.querySelector('.content');
  fillCard(content, weatherData);
}

async function handleSearch() {
  // change to locationsearch/locationdata
  const dataFromSearch = await getLocation();
  const longLat = getLongLat(dataFromSearch);
  const weatherData = await searchSMHI(longLat[0], longLat[1]);
  createToday(getCityText(dataFromSearch), weatherData);
  // updateCityHeader(dataFromSearch);
  // const longLat = getLongLat(dataFromSearch);
  // console.log(longLat);
  // const dataFromSMHI = await searchSMHI(longLat[0], longLat[1]);
  // const today = getDataForToday(dataFromSMHI);
  // today.forEach(todayItem => {
  //   displayPara(todayItem);
  // });
}

// cardCreator();

const btn = document.getElementById('btn');
btn.addEventListener('click', handleSearch);
