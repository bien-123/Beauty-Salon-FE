import axios from 'axios';

const BOT_TOKEN = '8897298885:AAGczXSYJ-TkXzRElwTPd23dSYfFQHth2ZI';
const CHAT_ID = '-1002223344733';

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
