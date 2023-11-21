import { API_CLIENT_PAGE } from './apis';
import axios from 'axios';

const ClientServer = {
    async getClient() {
        const res = axios.get(API_CLIENT_PAGE);
        return res;
    },

    async searchClient(query) {
        try {
            const res = await axios.get(`${API_CLIENT_PAGE}/search${query}`);
            return res.data; // Trả về chỉ dữ liệu từ response, không phải toàn bộ response object
        } catch (error) {
            throw new Error(error); // Ném ra lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình gọi API
        }
    },

    async addClient(query) {
        try {
            const res = await axios.post(`${API_CLIENT_PAGE}/add`, query);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    },

    async updateClient(id, formData) {
        try {
            const res = await axios.put(`${API_CLIENT_PAGE}/update/${id}`, formData);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    },

    async deleteClient(query) {
        try {
            const res = await axios.delete(`${API_CLIENT_PAGE}/delete/${query}`);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },
};

export default ClientServer;
