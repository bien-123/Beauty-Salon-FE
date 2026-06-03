import { API_DEPARTMENT_PAGE } from './apis';
import axios from 'axios';

const DepartmentServer = {
    async getDepartment() {
        const res = axios.get(API_DEPARTMENT_PAGE);
        return res;
    },

    async addDepartment(formData) {
        try {
            const res = await axios.post(`${API_DEPARTMENT_PAGE}/add`, formData);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    },

    async updateDepartment(id, formData) {
        try {
            const res = await axios.put(`${API_DEPARTMENT_PAGE}/update/${id}`, formData);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    },

    async deleteDepartment(id) {
        try {
            const res = await axios.delete(`${API_DEPARTMENT_PAGE}/delete/${id}`);
            return res;
        } catch (err) {
            throw new Error(err);
        }
    },
};

export default DepartmentServer;
