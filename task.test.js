const { quickSort } = require('./task');

describe('quickSort (in-place)', () => {
    test('empty array', () => {
        const a = [];
        expect(quickSort(a)).toEqual([]);
    });

    test('single element', () => {
        const a = [1];
        expect(quickSort(a)).toEqual([1]);
    });

    test('already sorted', () => {
        const a = [1, 2, 3, 4, 5];
        expect(quickSort(a)).toEqual([1, 2, 3, 4, 5]);
    });

    test('reverse order', () => {
        const a = [5, 4, 3, 2, 1];
        expect(quickSort(a)).toEqual([1, 2, 3, 4, 5]);
    });

    test('duplicates', () => {
        const a = [3, 1, 2, 3, 1];
        expect(quickSort(a)).toEqual([1, 1, 2, 3, 3]);
    });

    test('negative numbers and zero', () => {
        const a = [0, -1, 5, -3];
        expect(quickSort(a)).toEqual([-3, -1, 0, 5]);
    });

    test('sorts in-place and returns same reference', () => {
        const a = [3, 2, 1];
        const ret = quickSort(a);
        expect(ret).toBe(a);
        expect(a).toEqual([1, 2, 3]);
    });

    test('matches Array.prototype.sort numeric comparator for random data', () => {
        const size = 100;
        const a = Array.from({ length: size }, () => Math.floor(Math.random() * 201) - 100);
        const expected = a.slice().sort((x, y) => x - y);
        quickSort(a);
        expect(a).toEqual(expected);
    });
});