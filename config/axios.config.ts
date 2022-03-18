import  axios from 'axios';


const translateClient = axios.create({
  baseURL: 'https://slang-decode-api.herokuapp.com/v1/',
  timeout: 1000,
  headers: {
    'Accept': 'application.json',
  }
});

export default translateClient;