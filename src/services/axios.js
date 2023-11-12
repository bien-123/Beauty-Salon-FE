import axios from 'axios';

const Axios = axios.create({
    baseURL: process.env.PUBLIC_API_ENDPOINT,
    timeout: 10000,
});

Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status >= 400 && status <= 500) {
                // Xử lý lỗi HTTP trong phạm vi 400 - 500
                return Promise.reject(new Error(`${status} API Bad status code`));
            }

            if (status === 403) {
                // Xử lý lỗi CORS
                return Promise.reject(new Error('Request blocked by CORS policy'));
            }
        }

        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            // Xử lý lỗi timeout
            return Promise.reject(new Error('Request timed out'));
        }

        if (error.code === 'ECONNREFUSED') {
            // Xử lý lỗi kết nối từ chối
            return Promise.reject(new Error('Connection refused'));
        }

        // Xử lý các trường hợp lỗi khác
        return Promise.reject(error);
    },
);

export default Axios;
