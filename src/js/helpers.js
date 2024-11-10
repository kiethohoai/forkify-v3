import { TIMEOUT_SEC } from './config.js';

// TODO: timeout
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long! Timeout after ${s} ${s > 1 ? 'seconds' : 'second'}`,
        ),
      );
    }, s * 1000);
  });
};

// TODO: getJSON
export const getJSON = async function (url) {
  try {
    // Fetch & Get Data from API
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
