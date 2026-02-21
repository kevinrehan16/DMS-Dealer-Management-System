// utils/axiosHelpers.js

import axios from 'axios';

/**
 * Generic Axios GET request with retry on network error
 * @param {string} url - API endpoint
 * @param {object} options - Axios config (headers, params, etc.)
 * @param {number} retries - number of retries
 * @param {number} delay - delay between retries in ms
 */
export const fetchWithRetry = async (url, options = {}, retries = 3, delay = 1000, typeName) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url, options);
      return response;
    } catch (err) {
      if (attempt === retries || err.code !== "ERR_NETWORK") {
        throw err; // last attempt or other error
      }
      console.warn(`Network error, fetch ${typeName} retrying attempt ${attempt} in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
};