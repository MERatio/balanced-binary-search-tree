function sortNumbers(numbers) {
  return numbers.sort((a, b) => a - b);
}

function areElementsNumber(arr) {
  return arr.every((el) => typeof el === 'number');
}

export { sortNumbers, areElementsNumber };
