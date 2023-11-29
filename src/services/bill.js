import { API_BILL_PAGE } from './apis';
import axios from 'axios';

const BillServer = {
    async searchBill(query) {
        try {
            const res = await axios.get(`${API_BILL_PAGE}/search${query}`);
            return res.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async addBill(query) {
        try {
            const res = await axios.post(`${API_BILL_PAGE}/add`, query);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    },

    async updateBill(id, formData) {
        try {
            const res = await axios.put(`${API_BILL_PAGE}/update/${id}`, formData);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    },

    async deleteBill(id) {
        try {
            const res = await axios.delete(`${API_BILL_PAGE}/delete/${id}`);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default BillServer;
