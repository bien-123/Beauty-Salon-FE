import { API_STAFF_PAGE } from './apis';
import axios from './axios';

const StaffServer = {
    async login(maNV, password) {
        const res = await axios.post(`${API_STAFF_PAGE}/login`, { maNV: maNV, password: password });
        return res?.data;
    },

    async addStaff(body) {
        try {
            const res = await axios.post(`${API_STAFF_PAGE}/add`, body);
            return res?.data;
        } catch (err) {
            throw new Error(err);
        }
    },

    async searchStaff(query) {
        try {
            const res = await axios.get(`${API_STAFF_PAGE}/search${query}`);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },

    async searchAccount(query) {
        try {
            const res = await axios.get(`${API_STAFF_PAGE}/searchAccount${query}`);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },

    async updateAccount(maNV, formData) {
        try {
            const res = await axios.put(`${API_STAFF_PAGE}/updatePassword/${maNV}`, formData);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },

    async updateStaff(id, formData) {
        try {
            const res = await axios.put(`${API_STAFF_PAGE}/update/${id}`, formData);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },

    async deleteStaff(id) {
        try {
            const res = await axios.delete(`${API_STAFF_PAGE}/delete/${id}`);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },
};

export default StaffServer;
