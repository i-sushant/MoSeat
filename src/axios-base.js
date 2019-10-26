import axios from 'axios'
//const developmentUrl = 'http://localhost:3002/';
const productionUrl = 'http://peaceful-waters-64481.herokuapp.com/'
const instance = axios.create({
    baseURL: productionUrl 
})
export default instance