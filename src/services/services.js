import { API_SERVICES_PAGE } from './apis';
import axios from 'axios';

const ServicesServer = {
    async getServices() {
        const res = axios.get(API_SERVICES_PAGE);
        return res;
    },
    async searchServices(query) {
        try {
            const res = await axios.get(`${API_SERVICES_PAGE}/search${query}`);
            return res.data; // Trả về chỉ dữ liệu từ response, không phải toàn bộ response object
        } catch (error) {
            throw new Error(error); // Ném ra lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình gọi API
        }
    },
};

export default ServicesServer;
