//counter utilities

//add a counter to the list of counters
const addCounter = (list) = > {
  return [...list, 0];
}

//remove a counter at a specified index
//from a list of counters
const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index+1)
  ];
}

//increment a counter at a certain index
const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
}

//decrement a counter at a certain index
const decrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] - 1,
    ...list.slice(index + 1)
  ];
}