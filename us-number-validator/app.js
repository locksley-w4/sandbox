const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

checkBtn.onclick = () => {
  let value = userInput.value.trim();
  if (!value) {
    alert("Please provide a phone number");
    return;
  }
  let validNumRegEx = /^(\d*)(\s?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4})$/g;
  let countryCode = validNumRegEx.exec(value)?.[1];
  validNumRegEx.lastIndex = 0;
  let isValid = validNumRegEx.test(value);
  //     console.log(/\??\[?/g.exec("?["));
    // console.log(countryCode);
  //   console.log(isValid);
  if (+countryCode !== 1 && countryCode !== "") isValid = false;
  if (isValid) {
    resultsDiv.insertAdjacentHTML("beforeend", `Valid US number: ${value}<br>`);
    return;
  }
  if (!isValid) {
    resultsDiv.insertAdjacentHTML(
      "beforeend",
      `Invalid US number: ${value}<br>`
    );
  }
};

clearBtn.onclick = () => {
  resultsDiv.innerHTML = "";
};
