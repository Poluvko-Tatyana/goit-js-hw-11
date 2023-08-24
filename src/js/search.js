import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '39007654-4c0430d32326a82f4d20f66f9';


export const search = async (searchQuery, per_page = 40, page = 1) => {
  
const {data} = await axios.get(BASE_URL, {
  params:{
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    q: searchQuery,
    page,
    per_page: per_page,
  }
})

const {hits, totalHits} = data;
return {hits, totalHits};
};
    
  
