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

const selectFirstCell = (target) => (firstElement = target);

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

const select = (target) => {
  const {
    trElement: trFirst,
    tdElement: tdFirst,
    paragraph: pFirst,
  } = getParagraphElement(firstElement);

  const {
    trElement: trLast,
    tdElement: tdLast,
    paragraph: pLast,
  } = getParagraphElement(target);

  values.rowFirst = Number.parseInt(trFirst.getAttribute("row"));
  values.rowLast = Number.parseInt(trLast.getAttribute("row"));
  values.columnFirst = Number.parseInt(tdFirst.getAttribute("column"));
  values.columnLast = Number.parseInt(tdLast.getAttribute("column"));

  selectRow();
  selectColumn();
};

export const selectCells = (table) => {
  wordSearch = table;
  table.addEventListener("mousedown", ({ target }) => selectFirstCell(target));
  table.addEventListener("mouseup", ({ target }) => select(target));
};
