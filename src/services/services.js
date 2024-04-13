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

    async searchPagination(query) {
        try {
            const res = await axios.get(`${API_SERVICES_PAGE}/searchp${query}`);
            return res.data; // Trả về chỉ dữ liệu từ response, không phải toàn bộ response object
        } catch (error) {
            throw new Error(error); // Ném ra lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình gọi API
        }
    },

    async addServices(query) {
        try {
            const res = await axios.post(`${API_SERVICES_PAGE}/add`, query);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    },

    async updateServices(id, formData) {
        try {
            const res = await axios.put(`${API_SERVICES_PAGE}/update/${id}`, formData);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    },

    async deleteServices(query) {
        try {
            const res = await axios.delete(`${API_SERVICES_PAGE}/delete/${query}`);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },

    async getBill() {
        try {
            const res = await axios.get(`${API_SERVICES_PAGE}/searchbill`);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },
};

export default ServicesServer;
