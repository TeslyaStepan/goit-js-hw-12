'use strict';
import { fetchImages } from './js/pixabay-api';
import { renderImages, setupImageLoadHandlers } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const container = document.querySelector('.gallery');
let lightbox = null;

form.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const { textRow } = event.target.elements;

  if (textRow.value.trim() === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'The search field cannot be empty.',
      color: 'red',
    });
    return;
  }

  fetchImages(textRow.value)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'Caution',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          color: 'yellow',
        });
      } else {
        container.innerHTML = renderImages(data.hits);

        setupImageLoadHandlers(container);

        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.gallery .galleries a', {
            captionsData: 'alt',
            captionDelay: 250,
          });
        }
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });

  form.reset();
}
