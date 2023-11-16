import { API_APPOIMENT_PAGE } from './apis';
import axios from 'axios';

const AppoimentServer = {
    async addAppoiment(body) {
        const res = await axios.post(`${API_APPOIMENT_PAGE}/add`, body);
        return res?.data;
    },
};

export default AppoimentServer;
