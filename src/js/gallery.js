import Notiflix from "notiflix";
import axios from "axios";
const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");
export const elements = {searchForm : searchForm, gallery:  gallery, loadMore: loadMore, searchBar: searchForm.querySelector('input[name="searchQuery"]')};
export const fetchImages = async (pageCount, searchBar) => {
    const options = {
    apiKey : "37003153-6b597311c9d0251ffdcb7327e", 
    q : searchBar.value.split(" ").join("+")    , 
    image_type : "photo",
    orientation : "horizontal", 
    safesearch : true, 
    per_page: "40", 
    page: pageCount,
    }
    const images = await axios.get(`https://pixabay.com/api/?key=${options["apiKey"]}&q=${options["q"]}&image_type=${options["image_type"]}&orientation=${options["orientation"]}&safesearch=${options["safesearch"]}&per_page=${options["per_page"]}&page=${options["page"]}`);
    return images
}
export const renderImage = (object) => {
    let elementToAdd = "";
    object.map(element => { elementToAdd += `<div class="photo-card">
        <img src="${element.previewURL}" alt="${element.tags}"/>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${element.likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${element.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${element.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${element.downloads}
          </p>
        </div>
      </div>`
    })
    return elementToAdd
}
export const catchError = () => {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}
const showQueueEnd = () => {
  Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
}
export const search = (insertMethod) => {
    loadMore.hidden = true;
    localStorage.setItem("pageCount", 1); 
    let pageCount = localStorage.getItem("pageCount");
    fetchImages(pageCount, elements["searchBar"]).then(
        (result) => {
            if (result.data.totalHits == 0){
                catchError();
                return
            }
            Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`)
            let markup = renderImage(result.data.hits);
            elements["gallery"].innerHTML = "";
            elements["gallery"].insertAdjacentHTML(insertMethod, markup);
            elements["loadMore"].hidden = false;
        })
        .catch(
            ()=>{
                catchError();
            }
        )
    }
    export const searchLoadMore = (insertMethod) => {
      loadMore.hidden = true;
      let oldPageCount = Number(localStorage.getItem("pageCount"));
      localStorage.setItem("pageCount", oldPageCount+1); 
      let pageCount = localStorage.getItem("pageCount");
      fetchImages(pageCount, elements["searchBar"]).then(
          (result) => {
              if (result.data.hits.length == 0){
                  showQueueEnd();
                  elements["gallery"].innerHTML = "";
                  localStorage.setItem("pageCount", oldPageCount);
                  return
              }
              Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`)
              let markup = renderImage(result.data.hits);
              elements["gallery"].insertAdjacentHTML(insertMethod, markup)
              elements["loadMore"].hidden = false;
          })
          .catch(
              ()=>{
                  catchError();
              }
          )
      }