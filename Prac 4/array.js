let inputArray = [];

// Prompt the user to enter elements
while (true) {
  let userInput = prompt("Enter an element (press cancel to stop):");
  if (userInput === null) {
    break;
  }
  inputArray.push(userInput);
}
let uniqueArray = inputArray.filter(function (item, index) {
  return inputArray.indexOf(item) === index;
});

console.log(uniqueArray);
