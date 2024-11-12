`use strict`;

import axios from 'axios';

const API_KEY = '46858966-ba511c0c272bf1bf47f1d2839';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
