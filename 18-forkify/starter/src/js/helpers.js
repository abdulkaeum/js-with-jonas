import { TIMEOUT_SECONDS } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// a helper to perform an async fetch/post
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // the fetch will return a promis as per normal
    // we can then await the result of the promise
    // using Promise.race to see which promise (fetch or timeout) wins the race 1st
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    // convert the res obj from the returned fetch to json and this will return a promise then await on that
    const data = await res.json();

    // if false - grab the msg from the data - will be passed to the catch err handler
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // instead of returning a prmoise from this async fn, we need to return the data as the value
    // this will be the 'resolved' VALUE of the promise that the AJAX() returns - not the promise itself
    return data;
  } catch (err) {
    // pass the err down to model.js not here
    throw err;
  }
};
