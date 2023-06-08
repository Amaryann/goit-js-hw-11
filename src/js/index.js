import axios from "axios";
import Notiflix from "notiflix";
import { catchError, fetchImages } from "./gallery";
import { elements } from "./gallery";
import { search } from "./gallery";
import { searchLoadMore } from "./gallery";
import { renderImage } from "./gallery";
localStorage.setItem("pageCount", 1);
const {loadMore, searchForm, gallery} = elements
loadMore.hidden = true;
searchForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  search("afterbegin");
})
loadMore.addEventListener("click", ()=>{
    searchLoadMore("beforeend");
})