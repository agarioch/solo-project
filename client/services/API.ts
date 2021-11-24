// const BASE_URL = process.env.REACT_APP_DB;
const BASE_URL = 'http://10.10.22.217:4000';

async function fetchRequest(path: string, options: RequestInit | undefined) {
  try {
    const res = await fetch(BASE_URL + path, options);
    if (res.ok) {
      return res.status !== 204 ? res.json() : res;
    } else {
      return Promise.reject();
    }
  } catch (err) {
    return console.error(err);
  }
}

function getData() {
  return fetchRequest('/', { method: 'GET' });
}

function addData(body: {}) {
  return fetchRequest('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

const Services = {
  getData,
  addData,
};

export default Services;
