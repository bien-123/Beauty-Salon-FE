import { API_SERVICES_PAGE } from './apis';
import axios from 'axios';

const ServicesServer = {
    async getServices() {
        const res = axios.get(API_SERVICES_PAGE);
        return res;
    },
};

export default ServicesServer;
