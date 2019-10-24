import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://peaceful-waters-64481.herokuapp.com'
})
export default instance