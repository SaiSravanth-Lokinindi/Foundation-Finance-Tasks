let arr = [-1, 0, 2, -9, 0, 5, -2, -3, 0, 6];

/* 

Idea is to have 2 pointers for keeping track of zero elemts and swap non-zero elements with zeros from start or back.
*/

function sortZeros(arr1) {
  // Make a pointer for swapping 0s with other numbers
  let n = 0;

  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === 0) {
      let temp = arr[n];
      arr[n] = arr[i];
      arr[i] = temp;
      n++; // Increment n when zero is swapped into the correct position
    }
  }

  return arr1;
}

console.log(sortZeros(arr));

/* 
Time complexity - O(n) ==> Since, we're traversing the array just once
Space complexity - O(1) ==> No extra space is created/used
*/
