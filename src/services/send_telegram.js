import axios from 'axios';

const BOT_TOKEN = process.env.REACT_APP_BOT_TOKEN;
const CHAT_ID = process.env.REACT_APP_CHAT_ID;

const SendTelegram = {
    async sendTelegram(message) {
        try {
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            const response = await axios.post(url, {
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML',
            });

            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default SendTelegram;
