export async function searchSMHI(long, lat) {
  const smhiRespons = await fetch(
    `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`,
    { mode: 'cors' },
  );
  const data = await smhiRespons.json();
  return data;
}
function importAll(r) {
  return r.keys().map(r);
}

importAll(require.context('./icons', false, /\.(png|jpe?g|svg)$/));
const imgJson = require('./imgs.json');

const img = JSON.parse(JSON.stringify(imgJson));

export function getTodayWeather(data) {
  const todayDate = new Date().setHours(0, 0, 0, 0);
  const arr = Array.from(data.timeSeries);
  const today = arr.filter(item => {
    if (new Date(item.validTime).setHours(0, 0, 0, 0) === todayDate) {
      return item;
    }
    return false;
  });
  return today;
}

export function getParaData(para, weatherData) {
  const arr = Array.from(weatherData.parameters);
  const value = arr.find(p => p.name === para);
  console.log(value);
  return value.values[0];
}

export function getWeatherIcon(time) {
  const weathersymbolIndex = time.parameters.find(
    para => para.name === 'Wsymb2',
  );
  // console.log(`weather symbol index: ${weathersymbolIndex.values[0]}`);
  return img[weathersymbolIndex.values[0]];
}

// function setWeatherSymbolHash() {
//   weatherSymbolMap.set(1, icons[0]);
//   weatherSymbolMap.set(2, icons[0]);
//   weatherSymbolMap.set(3, icons[7]);
//   weatherSymbolMap.set(4, icons[8]);
//   weatherSymbolMap.set(5, icons[9]);
//   weatherSymbolMap.set(6, icons[9]);
//   weatherSymbolMap.set(7, icons[9]);
//   weatherSymbolMap.set(8, icons[10]);
//   weatherSymbolMap.set(9, icons[11]);
//   weatherSymbolMap.set(10, icons[1]);
//   weatherSymbolMap.set(11, icons[2]);
//   weatherSymbolMap.set(12, icons[3]);
//   weatherSymbolMap.set(13, icons[3]);
//   weatherSymbolMap.set(14, icons[3]);
//   weatherSymbolMap.set(15, icons[4]);
//   weatherSymbolMap.set(16, icons[4]);
//   weatherSymbolMap.set(17, icons[5]);
//   weatherSymbolMap.set(18, icons[10]);
//   weatherSymbolMap.set(19, icons[11]);
//   weatherSymbolMap.set(20, icons[1]);
//   weatherSymbolMap.set(21, icons[6]);
//   weatherSymbolMap.set(22, icons[3]);
//   weatherSymbolMap.set(23, icons[3]);
//   weatherSymbolMap.set(24, icons[3]);
//   weatherSymbolMap.set(25, icons[4]);
//   weatherSymbolMap.set(26, icons[4]);
//   weatherSymbolMap.set(27, icons[5]);
// }
// setWeatherSymbolHash();
