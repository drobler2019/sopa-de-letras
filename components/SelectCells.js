let firstElement = null;

const getParagraphElement = (element) => {
  if (element.nodeName === "TD") {
    const { firstElementChild: p } = element;
    return { parent: p.closest("td"), p };
  }
  return { parent: element.closest("td"), element };
};

const selectFirstCell = (target) => (firstElement = target);

const selectRow = () => {}

const select = (target) => {
  const { parent: parentFirst, element: pFirst } =
    getParagraphElement(firstElement);

  const { parent: parentLast, element: pLast } = getParagraphElement(target);
};

export const selectCells = (table) => {
  table.addEventListener("mousedown", ({ target }) => selectFirstCell(target));
  table.addEventListener("mouseup", ({ target }) => select(target));
};
