import { API_STAFF_PAGE } from './apis';
import axios from './axios';

const StaffServer = {
    async login(maNV, password) {
        const res = await axios.post(`${API_STAFF_PAGE}/login`, { maNV: maNV, password: password });
        return res?.data;
    },
};

export default StaffServer;
