export function createMarkup(arrayImgs = []){
    return arrayImgs.map(
        ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
   `<div class="photo-card">
   <a class = "gallery_link" href="${largeImageURL}"
   <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery_image" height = "300" width = "300"/>
   <div class="info">
     <p class="info-item">
       <b>Likes:${likes} </b>
     </p>
     <p class="info-item">
       <b>Views:${views}</b>
     </p>
     <p class="info-item">
       <b>Comments:${comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads:${downloads}</b>
     </p>
   </div>
 </div>` ).join("")
}