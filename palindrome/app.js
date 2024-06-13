"use strict";
function getLongestPalLength(str) {
  let frequency = {};

  if (!Array.isArray(str)) str = Array.from(str.trim(""));
  str.forEach((char) => {
    frequency[char] = Number.isNaN(frequency[char] + 1)
      ? 1
      : frequency[char] + 1;
  });

  let oddCount = getOddCount(frequency);
  let lengths = [];

  if (dist.odd.length <= 1) return str.length;
  return str.length - oddCount + 1;
}

function getOddCount(obj) {
  let oddCount = 0;
  for (const prop in obj) {
    let val = obj[prop];
    if (val % 2 !== 0) result.odd.push(prop);
  }
  return oddCount;
}

const checkBtn = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const resultLabel = document.getElementById("result");
checkBtn.addEventListener("click", isPalindrome);

function isPalindrome(ev) {
  let str = (textInput.value ?? "")

  str = str.toLowerCase();
  if (str.length <= 0) {
    alert("Please input a value");
    return;
  }
  str = filterStr(str);
  let strInitialLength = str.length;
  let subString = str.splice(0, Math.floor(strInitialLength / 2));
  if (strInitialLength % 2 !== 0) {
    str.shift();
  }
  let isPal = str.reverse().join("") === subString.join("");
  resultLabel.innerHTML = `${textInput.value} is${isPal ? " " : " not "}a palindrome`;
  return isPal;
}
function filterStr(str) {
  let filteringElems = `!"£$%^&*()_-+={}[]~#@';:/?.,><\\|\`   `.split("");
  str = str.split("");
  str = str.filter((char) => filteringElems.indexOf(char) === -1);
  return str;
}
