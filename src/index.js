import axios from "axios";
import Notiflix from "notiflix";
const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more")
localStorage.setItem("pageCount", 1);
loadMore.hidden = true;
const fetchImages = async (pageCount) => {
    const options = {
    apiKey : "37003153-6b597311c9d0251ffdcb7327e", 
    q : searchForm.querySelector("input[name='searchQuery']").value.split(" ").join("+")    , 
    image_type : "photo",
    orientation : "horizontal", 
    safesearch : true, 
    per_page: "40", 
    page: pageCount,
    }
    const images = await axios.get(`https://pixabay.com/api/?key=${options["apiKey"]}&q=${options["q"]}&image_type=${options["image_type"]}&orientation=${options["orientation"]}&safesearch=${options["safesearch"]}&per_page=${options["per_page"]}&page=${options["page"]}`);
    return images
}
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    loadMore.hidden = true;
    localStorage.setItem("pageCount", 1); 
    let pageCount = localStorage.getItem("pageCount");
    fetchImages(pageCount).then(
        (result) => {
            Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`)
            let markup = "";
            result.data.hits.map(element => markup += `<div class="photo-card">
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
          </div>`);
          gallery.innerHTML = markup;
          loadMore.hidden = false;
        }
    ).catch(
        ()=>{
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    )
})
loadMore.addEventListener("click", ()=>{
    let pageCountBefore = Number(localStorage.getItem("pageCount"));
    localStorage.setItem("pageCount", pageCountBefore+1);
    let pageCount = localStorage.getItem("pageCount");
    fetchImages(pageCount).then(
        (result) => {
            Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`)
            let markup = "";
            result.data.hits.map(element => {markup += `<div class="photo-card">
            <img src="${element.previewURL}" alt="${element.tags}" loading="lazy" />
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
          </div>`});
          gallery.innerHTML = markup;
        }
    ).catch(
        ()=>{
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    )
})