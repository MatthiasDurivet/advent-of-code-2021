import { Combination, Permutation, PowerSet } from 'js-combinatorics'

const sortNumbersAscending = (a, b) => a - b
const sortNumbersDescending = (a, b) => b - a
const sumNumbers = (a, b) => a + b
const logAndReturn = value => {
    console.log('value: ', value)
    return value
}
const range = r => [...Array(r).keys()]

const permutations = (iterable, optionalElements) => {
    return [...new Permutation(iterable, optionalElements)]
}

const combinations = (iterable, optionalElements) => {
    return [...new Combination(iterable, optionalElements)]
}

const powerset = iterable => {
    return [...new PowerSet(iterable)]
}

// use with reduce {}
const groupBy = (total, value) => {
    if (total[value]) return { ...total, [value]: total[value] + 1 }
    else return { ...total, [value]: 1 }
}

export {
    sortNumbersAscending,
    sortNumbersDescending,
    sumNumbers,
    logAndReturn,
    range,
    permutations,
    combinations,
    powerset,
    groupBy,
}