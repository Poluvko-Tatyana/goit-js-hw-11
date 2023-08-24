import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";

import { search } from "./js/search";
import { createMarkup } from "./js/markup";

import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const input = form.elements.searchQuery;

let lightbox = new SimpleLightbox('.gallery a');

let searchQuery = "";
const PER_PAGE = 40;
let page = 1;

function callback (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { 
      observer.unobserve(entry.target)
      onClickButn();
    };
  });
};

const observer = new IntersectionObserver(callback);

form.addEventListener("submit", onSubmit)

function onSubmit (evt) {
  evt.preventDefault();

searchQuery = input.value.trim();
 if (!searchQuery) return;
  getImg(searchQuery);
};


async function getImg(searchQuery) {
  try {
    page = 1;
    const { hits: arrayOfImgs, totalHits } = await search(searchQuery, PER_PAGE, page);

    if (arrayOfImgs.length === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    };

    Notify.info(`Hooray! We found ${totalHits} images.`);

    clearGallery();

    const markup = createMarkup(arrayOfImgs);

    renderGallery(markup);

    lightbox.refresh();

    const galleryLastItem = gallery.lastElementChild;
    observer.observe(galleryLastItem);

  }
  catch (error) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }
};  

function renderGallery(markup = ""){
  gallery.insertAdjacentHTML("beforeend", markup);
};

function clearGallery() {
  gallery.innerHTML = "";
};

async function onClickButn() { 
  try { 
 page += 1;
    const { hits, totalHits } = await search(searchQuery, PER_PAGE, page);
    
    const markup = createMarkup(hits);

    renderGallery(markup);

    lightbox.refresh();
    
    if (page * PER_PAGE >= totalHits) {
      return Notify.failure("We're sorry, but you've reached the end of search results.");
    }

    const galleryLastItem = gallery.lastElementChild;
    observer.observe(galleryLastItem);
  }
  catch (error) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
};