import { selectCells } from "./components/SelectCells.js";
import { WordSearch } from "./components/wordSearch.js";

(() => {
  const wordSearch = new WordSearch();
  const main = document.querySelector("main");
  const { firstElementChild: sopaLetras } = wordSearch;
  selectCells(sopaLetras);
  main.append(wordSearch);
})();
