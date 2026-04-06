const addHorizontalLetters = (array, words) => {
  let positions = Array.from({ length: array.length }, (_, number) => number);
  const newArray = words.map((word, index) => {
    if (index % 2 === 0) {
      const result = words
        .at(index)
        .split("")
        .map((_, i) => word.at(-(i + 1)));
      return result;
    }
    return word.split("");
  });
  for (let p = 0; p < newArray.length; p++) {
    let positionRow = Math.floor(Math.random() * array.length);
    if (positions.includes(positionRow)) {
      const row = array.at(positionRow);
      newArray.at(p).forEach((w, index) => (row.at(index).letter = w));
      positions = positions.filter((v) => v != positionRow);
    } else {
      p--;
    }
  }
};

export const addLetters = (array, words) => {
  addHorizontalLetters(array, words);
};
