import { addLetters } from "../components/Letter.js";

const abecedario = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i),
);

export function getDiagonalValues(size, words) {
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
        obj.right = Math.abs(left);
        obj.column = index + 1;
        obj.row = 1;
        obj.letter = abecedario.at(
          Math.floor(Math.random() * abecedario.length),
        );
      });
    } else {
      for (let z = x; z < size; z++) {
        row = structuredClone(array.at(0)).slice(z);
        if (row) {
          while (row.length < size) {
            const value = row.at(-1).left - 1;
            row.push({ left: value });
          }
          const valueRight = row.toReversed().map(({ left }) => Math.abs(left));
          valueRight.forEach((value, index) => {
            const obj = row.at(index);
            obj.right = value;
            obj.column = index + 1;
            obj.row = z + 1;
            obj.letter = abecedario.at(
              Math.floor(Math.random() * abecedario.length),
            );
          });
          break;
        }
      }

      array.push(row);
    }
  }

  addLetters(array, words, size);
  return array;
}
