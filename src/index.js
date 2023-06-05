import axios from "axios";
import Notiflix from "notiflix";
import { catchError, fetchImages } from "./js/gallery";
import { elements } from "./js/gallery";
import { search } from "./js/gallery";
import { renderImage } from "./js/gallery";
localStorage.setItem("pageCount", 1);
const {loadMore, searchForm, gallery} = elements
loadMore.hidden = true;
searchForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  search("afterbegin");
}
    )
  loadMore.addEventListener("click", ()=>{
    let pageCountBefore = Number(localStorage.getItem("pageCount"));
    localStorage.setItem("pageCount", pageCountBefore+1);
    search("beforeend");
        }
    )