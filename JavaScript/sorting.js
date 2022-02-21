/**
 * This script contains a few sorting algorithms with their time and space
 * complexity classes.
 */

/**
 * Implementation of an insertion sort algorithm. Insertion sort is a simple
 * sorting algorithm that works similar to the way you sort your cards in your
 * hands. The array is virtually split into a sorted and unsorted part. Values
 * from the unsorted part are picked and placed at the correct position in the
 * sorted part.
 *
 * Time: O(n^2), Space: O(1)
 *
 * @param array The array to sort.
 */
const insertionSort = array => {

    // Start the sorting skipping the first element
    for (let unsorted = 1; unsorted < array.length; unsorted++) {
        let current_value = array[unsorted],
            sorted = unsorted - 1;

        // Move the sorted area if necessary
        while (sorted >= 0 && array[sorted] > current_value) {
            array[sorted + 1] = array[sorted];
            sorted -= 1;
        }
        array[sorted + 1] = current_value;
    }
    return array;
}

/**
 * Implementation of the mergeSort algorithm.  Merge Sort is a Divide and
 * Conquer algorithm. It divides the input array into two halves, calls itself
 * for the two halves, and then merges the two sorted halves.
 *
 * Time: O(n log(n)) Space: O(n)
 * @param array The array to sort
 */
const mergeSort = array => {
    // Base case
    if (array.length <= 1) return array;

    // Recursive case: splice of first half and recurse.
    const left = array.splice(0, array.length / 2);
    return merge(mergeSort(left), mergeSort(array));
}

/**
 * Merges two arrays.
 *
 * @param left The left array to merge.
 * @param right The right array to merge.
 */
const merge = (left, right) => {
    let sorted = [];

    // Shift out numbers and push them into sorted
    while (left.length && right.length) {
        let value = left[0] < right[0] ? left.shift() : right.shift();
        sorted.push(value);
    }

    // Spread the remaining and return.
    return [...sorted, ...left, ...right];
}

/**
 * Implementation of the bubbleSort algorithm. It compares each adjacent pair
 * and check if the elements are in order. If they are not, it swaps both
 * elements. It keep doing this until all elements are sorted.
 *
 * Time: O(n^2) Space: O(1)
 *
 * @param array
 */
const bubbleSort = array => {
    let isSwapped = true;

    while (isSwapped) {
        isSwapped = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[i + 1]) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                isSwapped = true;
            }
        }
    }
    return array;
}

/**
 * Evaluates a sorting function and measures its execution time.
 *
 * @param array The array to sort
 * @param funct The function to use
 */
const evaluate = (array, funct) => {
    let clone = [... array],
        start = performance.now(),
        result = funct(clone),
        duration = performance.now() - start;

    console.log(`${funct.name} in ${duration} ms.`)
}


const main = n => {
    // Generate an array of length n with entries in between 0 and 100
    let array = [];

    for (let i = 0; i < n; i++) {
        array.push(Math.round(Math.random() * 100))
    }

    evaluate(array, bubbleSort)
    evaluate(array, insertionSort)
    evaluate(array, mergeSort)
}

main(10000)