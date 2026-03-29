import { selectCells } from "./components/SelectCells.js";
import { WordSearch } from "./components/wordSearch.js";

(() => {
  const sopa = new WordSearch();
  const main = document.querySelector("main");
  selectCells(sopa);
  main.append(sopa);
})();
