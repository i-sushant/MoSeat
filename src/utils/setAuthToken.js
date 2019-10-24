import axios from "../axios-base";

const setAuthToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;
