import { getDiagonalValues } from "../util/Diagonal.js";

export class WordSearch extends HTMLElement {
  constructor(size = 10, words) {
    super();
    this.size = size;
    this.words = words;
    this.array = getDiagonalValues(this.size);
    this.table = document.createElement("table");
    this.createRows();
    this.append(this.table);
  }

  createCells(r) {
    const cells = [];
    for (let c = 0; c < this.size; c++) {
      const td = document.createElement("td");
      const p = document.createElement("p");
      p.textContent = "test";
      td.append(p);
      const numColumn = c + 1;
      const obj = this.array.at(r).at(c);
      td.setAttribute("column", numColumn);
      td.setAttribute("diagonalLeft", obj.left);
      td.setAttribute("diagonalright", obj.right);
      cells.push(td);
    }
    return cells;
  }

  createRows() {
    for (let r = 0; r < this.size; r++) {
      const tr = document.createElement("tr");
      const numRow = r + 1;
      tr.setAttribute("row", numRow);
      tr.append(...this.createCells(r));
      this.table.append(tr);
    }
  }
}

customElements.define("word-search", WordSearch);
