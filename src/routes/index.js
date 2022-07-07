
/**
 * Returns a Promise which resolves with a value in form of a tuple.
 * @param promiseFn A Promise to resolve as a tuple.
 * @returns Promise A Promise which resolves to a tuple of [error, ...results]
 */
export function tuple (promise) {
  return promise
    .then((...results) => [null, ...results])
    .catch(error => [error])
}

/**
 * Returns a function which creates a tuple-ful Promise.
 * @param fn A function to create a tuple from.
 * @returns A function which creates a tuple from `fn`.
 */
export function tuplify (fn) {
  return function tupleFn (...args) {
    return tuple(fn(...args))
  }
}

const tupleFetch = tuplify(fetch);

export async function get ({params}) {
  // const exchangeRate = 5;

  const endpoint = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,BRL'
  const [error, exchangeRate] = await tupleFetch(endpoint);

  if (error) {
    return {
      status: 500,
      body: {
        message: 'Failed to fetch api'
      }
    }
  }

  const json = await exchangeRate.json();

  return {
    status: 200,
    body: {
      exchangeRate: json.rates.BRL
    }
  }
}
