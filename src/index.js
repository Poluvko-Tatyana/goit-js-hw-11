import axios from 'axios';
import search from './js/searching-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const form =  document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');



form.addEventListener('submit', onsbmit);
async function onsbmit(evt) {
  evt.preventDefault();
 
}