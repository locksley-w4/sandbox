/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// var addTwoNumbers = function (l1, l2) {
//   console.log(l1);
//   let num1 = +l1.reverse().join("");
//   let num2 = +l2.reverse().join("");
//   let num3 = num1 + num2;
//   let l3 = `${num3}`.split("").reverse();
//   return l3;
// };

// var sortArray = function (nums) {
//   let sorted = [];
//   for (let i = nums.length; i > 0; i--) {
//     let subarr = !!sorted.length ? sorted.slice(0, i) : nums.slice(0, i);
//     for (let j = 0; j < subarr.length; j++) {
//       let [a, b] = [subarr[j], subarr[j + 1]];
//       if (b === undefined) break;
//       if (a > b) [subarr[j], subarr[j + 1]] = [b, a];
//       else if (a < b) [subarr[j], subarr[j + 1]] = [a, b];
//     }
//     sorted.splice(0, subarr.length, ...subarr);
//     console.log(subarr, sorted);
//     // console.log(subarr, sorted);
//   }
//   return sorted;
// };
var sortArray = function (nums) {
  let sorted = [...nums];
  do {
    hasSwapped = false
    for (let j = 0; j < sorted.length; j++) {
      let [a, b] = [sorted[j], sorted[j + 1]];
      if (b === undefined) break;
      if (a > b) {
        [sorted[j], sorted[j + 1]] = [b, a];
        hasSwapped = true;
      }
    }
  } while (hasSwapped);
  return sorted;
};
function quickSort(nums) {
  if (nums.length <= 1) return nums;

  const pivot = nums[nums.length - 1];
  const leftSide = [];
  const rightSide = [];

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > pivot) {
      rightSide.push(nums[i]);
    } else {
      leftSide.push(nums[i]);
    }
  }

  return [...quickSort(leftSide), pivot, ...quickSort(rightSide)];
}
// console.log(sortArray([5, 2, 3, 1]));

function merge(left, right) {
  const sorted = [];
  while(left.length && right.length) {
    if(left[0] < right[0]) {
      sorted.push(left.shift())
    } else {
      sorted.push(right.shift())
    }
  }
  return [...sorted, ...left, ...right]
}
function mergeSort(arr) {
  if(arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  return merge(left, right)
}
// console.log(merge([1,5,9], [3,4,10]));
