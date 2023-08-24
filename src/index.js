import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";

import { fetchImgs } from "./js/search";
import { createMarkup } from "./js/markup";

import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const input = form.elements.searchQuery;
const buttonLoadMore = document.querySelector(".load-more");

let searchQuery = "";
const PER_PAGE = 40;
let page = 1;

function callback (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { 
      observer.unobserve(entry.target)
      onClickButton();
    };
  });
};
 console.log(callback)
const observer = new IntersectionObserver(callback);

let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener("submit", (event) => {
  event.preventDefault();

searchQuery = input.value.trim();
 if (!searchQuery) return;
  getImgParams(searchQuery);
});


async function getImgParams(searchQuery) {
  try {
    page = 1;
    const { hits: arrayOfImgs, totalHits } = await fetchImgs(searchQuery, PER_PAGE, page);

    if (arrayOfImgs.length === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    };

    Notify.info(`Hooray! We found ${totalHits} images.`);

    clearGallery();

    const markup = createMarkup(arrayOfImgs);
    console.log(markup)

    renderGallery(markup);

    lightbox.refresh();

    const galleryLastItem = gallery.lastElementChild;
    observer.observe(galleryLastItem);

  }
  catch (error) {
    Notify.failure("SSSSorry, there are no images matching your search query. Please try again.");
  }
};  

function renderGallery(markup = ""){
  gallery.insertAdjacentHTML("beforeend", markup);
};

function clearGallery() {
  gallery.innerHTML = "";
};

async function onClickButton() { 
  try { 
 page += 1;
    const { hits, totalHits } = await fetchImgs(searchQuery, PER_PAGE, page);
    
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