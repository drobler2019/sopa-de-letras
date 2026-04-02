import { EventManager } from "../events/EventManager.js";

let firstElement = null;
let wordSearch = null;
const values = {};

const getParagraphElement = (element) => {
  if (element.nodeName === "TD") {
    const { firstElementChild: p } = element;
    return {
      trElement: p.closest("tr"),
      tdElement: p.closest("td"),
      paragraph: p,
    };
  }
  return {
    trElement: element.closest("tr"),
    tdElement: element.closest("td"),
    paragraph: element,
  };
};

const selectFirstCell = (event) => (firstElement = event.target);

const getTdElement = (query) => {
  const td = wordSearch.querySelector(query);
  td.classList.add("selected");
};

const selectRow = () => {
  if (values.rowFirst === values.rowLast) {
    if (values.columnFirst < values.columnLast) {
      let count = values.columnFirst;
      while (count <= values.columnLast) {
        const query = `tr:nth-child(${values.rowLast}) td:nth-child(${count})`;
        getTdElement(query);
        count++;
      }
    } else {
      let count = values.columnFirst;
      while (count >= values.columnLast) {
        const query = `tr:nth-child(${values.rowLast}) td:nth-child(${count})`;
        getTdElement(query);
        count--;
      }
    }
  }
};

const selectColumn = () => {
  if (values.columnFirst === values.columnLast) {
    if (values.rowFirst < values.rowLast) {
      let count = values.rowFirst;
      while (count <= values.rowLast) {
        const query = `tr:nth-child(${count}) td:nth-child(${values.columnLast})`;
        getTdElement(query);
        count++;
      }
    } else {
      let count = values.rowFirst;
      while (count >= values.rowLast) {
        const query = `tr:nth-child(${count}) td:nth-child(${values.columnLast})`;
        getTdElement(query);
        count--;
      }
    }
  }
};

const addStylesDiagonalFalling = (attribute, diagonal) => {
  let count = values.rowFirst;
  while (count <= values.rowLast) {
    const query = `tr:nth-child(${count}) td[${attribute}='${diagonal}']`;
    getTdElement(query);
    count++;
  }
};

const addStylesDiagonalAscendant = (attribute, diagonal) => {
  let count = values.rowFirst;
  while (count >= values.rowLast) {
    const query = `tr:nth-child(${count}) td[${attribute}='${diagonal}']`;
    getTdElement(query);
    count--;
  }
};

const selectDiagonal = () => {
  if (values.rowFirst < values.rowLast) {
    if (values.diagonalLeftFirst === values.diagonalLeftLast) {
      addStylesDiagonalFalling("diagonalleft", values.diagonalLeftLast);
    } else if (values.diagonalRightFirst === values.diagonalRightLast) {
      addStylesDiagonalFalling("diagonalright", values.diagonalRightLast);
    }
  } else {
    if (values.diagonalLeftFirst === values.diagonalLeftLast) {
      addStylesDiagonalAscendant("diagonalleft", values.diagonalLeftLast);
    } else if (values.diagonalRightFirst === values.diagonalRightLast) {
      addStylesDiagonalAscendant("diagonalright", values.diagonalRightLast);
    }
  }
};

const select = (event) => {
  const { trElement: trFirst, tdElement: tdFirst } =
    getParagraphElement(firstElement);

  const { trElement: trLast, tdElement: tdLast } = getParagraphElement(
    event.target,
  );

  values.rowFirst = Number.parseInt(trFirst.getAttribute("row"));
  values.rowLast = Number.parseInt(trLast.getAttribute("row"));
  values.columnFirst = Number.parseInt(tdFirst.getAttribute("column"));
  values.columnLast = Number.parseInt(tdLast.getAttribute("column"));
  values.diagonalLeftFirst = Number.parseInt(tdFirst.getAttribute("diagonalleft"));
  values.diagonalRightFirst = Number.parseInt(tdFirst.getAttribute("diagonalright"));
  values.diagonalLeftLast = Number.parseInt(tdLast.getAttribute("diagonalleft"));
  values.diagonalRightLast = Number.parseInt(tdLast.getAttribute("diagonalright"));

  selectRow();
  selectColumn();
  selectDiagonal();
};

export const selectCells = (table) => {
  wordSearch = table;
  const event = new EventManager(
    [table, table],
    ["mousedown", "mouseup"],
    [selectFirstCell, select],
  );
};
