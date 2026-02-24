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

// utils/axiosHelpers.js
//! LAHAT NG NAKAPULA UNCOMMENT MO PARA MAGAMIT MO YUNG DYNAMIC NA ALL METHODS NOT JUST GET
//! import axios from "axios";

/**
 * Generic Axios request with retry on network error
 * @param {string} method - HTTP method (get, post, patch, put, delete)
 * @param {string} url - API endpoint
 * @param {object} data - request body (for POST, PATCH, PUT)
 * @param {object} options - Axios config (headers, params, etc.)
 * @param {number} retries - number of retries
 * @param {number} delay - delay between retries in ms
 * @param {string} typeName - label for logging
 */

//! export const requestWithRetry = async (
//!   method,
//!   url,
//!   data = {},
//!   options = {},
//!   retries = 3,
//!   delay = 1000,
//!   typeName = "request"
//! ) => {
//!   for (let attempt = 1; attempt <= retries; attempt++) {
//!     try {
//!       const response = await axios({
//!         method,
//!         url,
//!         data,
//!         ...options,
//!       });

//!       return response;

//!     } catch (err) {
//!       if (attempt === retries || err.code !== "ERR_NETWORK") {
//!         throw err;
//!       }

//!       console.warn(
//!         `Network error, ${typeName} retrying attempt ${attempt} in ${delay}ms...`
//!       );

//!       await new Promise((res) => setTimeout(res, delay));
//!     }
//!   }
//! };