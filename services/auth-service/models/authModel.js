const axios = require('axios');

const authModel = {
    findByUsername: async (username) => {
        try {
            const PENGGUNA_SERVICE_URL = process.env.PENGGUNA_SERVICE_URL || 'http://localhost:3002';

            const response = await axios.post(`${PENGGUNA_SERVICE_URL}/internal/get-user`, {
                username: username
            }, {
                headers: { Authorization: `Bearer ${process.env.INTERNAL_SERVICE_TOKEN}`}
            });

            return response.data.data;
        } catch (err) {
            return null;
        }
    }
};

module.exports = authModel;