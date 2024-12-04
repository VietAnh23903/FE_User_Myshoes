import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers['Ngrok-Skip-Browser-Warning'] = '1';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const handleResponse = async (promise) => {
    try {
        const response = await promise;
        console.log("receive response: ", response);
        return response.data.data;
    } catch (error) {
        console.log("error: ", error);
        throw error.response?.data || { message: 'An error occurred', error };
    }
};


const fetchAPI = {
    get: (url, params = {}, headers = {}) =>
        handleResponse(
            axiosInstance.get(url, {
                params,
                headers,
            })
        ),

    post: (url, data = {}, headers = {}) =>
        handleResponse(
            axiosInstance.post(url, data, {
                headers,
            })
        ),

    put: (url, data = {}, headers = {}) =>
        handleResponse(
            axiosInstance.put(url, data, {
                headers,
            })
        ),

    delete: (url, headers = {}) =>
        handleResponse(
            axiosInstance.delete(url, {
                headers,
            })
        ),
};

export default fetchAPI;


