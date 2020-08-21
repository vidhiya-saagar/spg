const fetch = require('node-fetch');

const fetchPost = async (url = '', data = {}) => {
  console.log('POST', url);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const fetchGet = async (url = '', data = {}) => {
  console.log('GET', url);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

module.exports = { fetchPost, fetchGet };
