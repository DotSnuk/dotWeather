export async function getLocation() {
  const searchField = document.getElementById('search').value;
  const response = await fetch(
    `https://geocode.maps.co/search?q=${searchField}&api_key=${process.env.MAPS_API}`,
    { mode: 'cors' },
  );
  const data = await response.json();
  return data;
}

export function getCityText(data) {
  return data[0].display_name;
}

export function getLongLat(data) {
  const long = parseFloat(data[0].lon).toFixed(6);
  const lat = parseFloat(data[0].lat).toFixed(6);
  return [long, lat];
  // searchSMHI(long, lat);
}
