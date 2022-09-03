var array_length;
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getBubbleSortedArray(array){
  let temp = 0
  let animations = []
   for(let i=0 ; i<array.length;i++){
    for(let j=i;j<array.length;j++){
      
        if(array[j]<array[i]){
            
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            animations.push([i,array[i]]);
            animations.push([j,array[j]]);
        }
    }
   }
   return animations;
}

function heap_root(input, i,animations) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < array_length && input[left] > input[max]) {
      max = left;
  }

  if (right < array_length && input[right] > input[max])     {
      max = right;
  }

  if (max !== i) {
      swap(input, i, max,animations);
      heap_root(input, max,animations);
  }
}

function swap(input, index_A, index_B,animations) {
  var temp = input[index_A];
  input[index_A] = input[index_B];
  input[index_B] = temp;
  animations.push([index_A,input[index_A]]);
  animations.push([index_B,input[index_B]]);
}

export function heapSort(input) {
  let animations = []
  array_length = input.length;

  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
      heap_root(input, i,animations);
    }

  for (i = input.length - 1; i > 0; i--) {
      swap(input, 0, i,animations);
      array_length--;
      heap_root(input, 0,animations);
  }
  return animations;
}

function swapInquick(arr, i, j,animations) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  // animations.push([i,j]);
  // animations.push([i,j]);
  animations.push([i,arr[i]]);
  animations.push([j,arr[j]]);
}
function partition(arr, low, high,animations) {
  
  // pivot
  let pivot = arr[high];

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = (low - 1);

  for (let j = low; j <= high - 1; j++) {

      // If current element is smaller 
      // than the pivot
      if (arr[j] < pivot) {

          // Increment index of 
          // smaller element
          i++;
          swapInquick(arr, i, j,animations);
      }
  }
  swapInquick(arr, i + 1, high,animations);
  return (i + 1);
}

export function quickSort(arr, low, high,animations) {
  if (low < high) {

      // pi is partitioning index, arr[p]
      // is now at right place 
      let pi = partition(arr, low, high,animations);

      // Separately sort elements before
      // partition and after partition
      quickSort(arr, low, pi - 1,animations);
      quickSort(arr, pi + 1, high,animations);
  }
  return animations;
}

export function insertion_Sort(nums) {
  let animations = []
  for (let i = 1; i < nums.length; i++) {
    let j = i - 1
    let temp = nums[i]
    animations.push([i,temp])
    while (j >= 0 && nums[j] > temp) {
      
      nums[j + 1] = nums[j]
      animations.push([j,nums[j]])
      animations.push([j+1,nums[j+1]])
      j--
    }
    nums[j+1] = temp
  }
  return animations
}