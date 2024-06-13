const input = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputLabel = document.getElementById("output");

function convertToRoman() {
  let inputValue = input.value.trim();
  let decimal = +inputValue;
  let result;
  if (Number.isNaN(decimal) || inputValue === "") {
    outputLabel.innerHTML = "Please enter a valid number";
    return;
  }
  if (decimal < 1) {
    outputLabel.innerHTML = "Please enter a number greater than or equal to 1";
    return;
  }
  if (decimal > 3999) {
    outputLabel.innerHTML = "Please enter a number less than or equal to 3999";
    return;
  }
  if (!Number.isInteger(decimal)) {
    outputLabel.innerHTML = "Please enter a integer";
    return;
  }

  inputValue = inputValue.split("").reverse();
  let [unit, ten, hundred, thousand] = inputValue;
  let romanUnit = getRomanDigit(unit, "I", "V", "X");
  let romanTen = getRomanDigit(ten, "X", "L", "C");
  let romanHundred = getRomanDigit(hundred, "C", "D", "M");
  let romanThousand = getRomanDigit(thousand, "M", "", "");

  result = romanThousand + romanHundred + romanTen + romanUnit;

  outputLabel.innerHTML = result;
}
function getRomanDigit(decimal, degreeUnit, degreeFive, degreeTen) {
  let result;
  switch (+decimal) {
    case 1:
      result = `${degreeUnit}`;
      break;
    case 2:
      result = `${degreeUnit}${degreeUnit}`;
      break;
    case 3:
      result = `${degreeUnit}${degreeUnit}${degreeUnit}`;
      break;
    case 4:
      result = `${degreeUnit}${degreeFive}`;
      break;
    case 5:
      result = `${degreeFive}`;
      break;
    case 6:
      result = `${degreeFive}${degreeUnit}`;
      break;
    case 7:
      result = `${degreeFive}${degreeUnit}${degreeUnit}`;
      break;
    case 8:
      result = `${degreeFive}${degreeUnit}${degreeUnit}${degreeUnit}`;
      break;
    case 9:
      result = `${degreeUnit}${degreeTen}`;
      break;
    default:
      result = ``;
  }
  return result;
}
convertBtn.addEventListener("click", convertToRoman);
