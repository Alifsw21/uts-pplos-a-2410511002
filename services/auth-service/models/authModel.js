const { db } = require('../config/appConfig');

const authModel = {
    findByUsername: async (username) => {
        const [rows] = await db.execute(`SELECT * FROM pengguna WHERE username = ?`, [username]);
        return rows[0];
    }
};

module.exports = authModel;