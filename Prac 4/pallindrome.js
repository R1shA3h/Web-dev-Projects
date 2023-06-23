function reverseNumber(num) {
    let reversed = 0;
    while (num !== 0) {
      reversed = reversed * 10 + num % 10;
      num = Math.floor(num / 10);
    }
    return reversed;
}

function isPalindrome(num) {
  const reversedNum = reverseNumber(num);
  return num === reversedNum;
}
const number = 12321;
if (isPalindrome(number)) {
  console.log(`${number} is a palindrome.`);
} else {
  console.log(`${number} is not a palindrome.`);
}
