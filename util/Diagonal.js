export function getDiagonalValues(size) {
  const array = [];
  let row = [];
  for (let x = 0; x < size; x++) {
    if (x === 0) {
      for (let y = x; y < size; y++) {
        const value = -Math.abs(y + 1);
        const obj = { left: value };
        row.push(obj);
      }
      array.push(row);
      row.toReversed().forEach(({ left }, index) => {
        const obj = array.at(x).at(index);
        obj.right = left;
      });
    } else {
      for (let z = x; z < size; z++) {
        row = structuredClone(array.at(0)).slice(z);
        if (row) {
          while (row.length < size) {
            const value = row.at(-1).left - 1;
            row.push({ left: value });
          }
          const valueRight = row.toReversed().map(({left}) => Math.abs(left));
          valueRight.forEach((value, index) => (row.at(index).right = value));
          break;
        }
      }

      array.push(row);
    }
  }
  return array;
}
