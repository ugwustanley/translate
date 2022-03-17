import  axios from 'axios';


const translateClient = axios.create({
  baseURL: 'http://localhost:3003/v1/',
  timeout: 1000,
  headers: {
    'Accept': 'application.json',
  }
});

export default translateClient;