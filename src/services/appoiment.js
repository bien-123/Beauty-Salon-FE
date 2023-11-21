import { API_APPOIMENT_PAGE } from './apis';
import axios from 'axios';

const AppoimentServer = {
    async addAppoiment(body) {
        try {
            const res = await axios.post(`${API_APPOIMENT_PAGE}/add`, body);
            return res?.data;
        } catch (err) {
            throw new Error(err);
        }
    },

    async searchAppoiment(query) {
        try {
            const res = await axios.get(`${API_APPOIMENT_PAGE}/search${query}`);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },

    async updateAppoiment(id, formData) {
        try {
            const res = await axios.put(`${API_APPOIMENT_PAGE}/update/${id}`, formData);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },

    async deleteAppoiment(id) {
        try {
            const res = await axios.delete(`${API_APPOIMENT_PAGE}/delete/${id}`);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },
};

export default AppoimentServer;
