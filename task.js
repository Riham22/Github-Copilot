'use strict';

/**
 * Swap two elements in an array (in-place).
 * @param {number[]} arr - array to modify
 * @param {number} i - index of first element
 * @param {number} j - index of second element
 */
function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

/**
 * Partition the subarray arr[left..right] using Lomuto partition scheme.
 * Picks arr[right] as pivot, moves elements <= pivot to the left,
 * and returns the final pivot index.
 *
 * @param {number[]} arr
 * @param {number} left
 * @param {number} right
 * @returns {number} pivotIndex
 */
function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left; // place for the next element <= pivot
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            swap(arr, i, j);
            i++;
        }
    }
    swap(arr, i, right);
    return i;
}

/**
 * In-place QuickSort (Lomuto partition). Sorts the given array of integers.
 * If called without left/right it sorts the whole array.
 *
 * @param {number[]} arr - array of integers to sort (modified in-place)
 * @param {number} [left=0] - left index of subarray
 * @param {number} [right=arr.length-1] - right index of subarray
 * @returns {number[]} the same array reference, sorted
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (!Array.isArray(arr)) {
        throw new TypeError('quickSort expects an array of numbers');
    }

    // Base case: nothing to sort
    if (arr.length <= 1 || left >= right) {
        return arr;
    }

    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
    return arr;
}

// Expose quickSort for debugging in console
window.quickSort = quickSort;

/* --- UI handling --- */

(function () {
    function parseInput(str) {
        if (!str) return [];
        const parts = str.split(',').map(s => s.trim()).filter(s => s.length > 0);
        return parts.map(s => {
            const n = Number(s);
            if (!Number.isFinite(n)) {
                throw new Error(`Invalid number: "${s}"`);
            }
            return n;
        });
    }

    function showMessage(el, text, isError = false) {
        el.textContent = text;
        el.style.color = isError ? 'red' : 'black';
    }

    document.addEventListener('DOMContentLoaded', function () {
        const input = document.getElementById('inputArray');
        const btn = document.getElementById('sortBtn');
        const result = document.getElementById('result');

        btn.addEventListener('click', function () {
            try {
                const arr = parseInput(input.value);
                if (arr.length === 0) {
                    showMessage(result, 'Please enter one or more numbers separated by commas.', true);
                    return;
                }
                quickSort(arr);
                showMessage(result, 'Sorted: ' + arr.join(', '), false);
            } catch (err) {
                showMessage(result, 'Error: ' + err.message, true);
            }
        });
    });
})();