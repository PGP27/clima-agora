import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

export const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
});
