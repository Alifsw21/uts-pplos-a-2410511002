const { db } = require('../config/appConfig');
const bcrypt = require('bcryptjs');

const user = {
    register: async (username, password, role) => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const [result] = await db.execute(`INSERT INTO pengguna (username, password, role) VALUES (?, ?, ?)`, [username, hashPassword, role]);
        return result;
    },

    getPenggunaData: async(id) => {
        const [rows] = await db.execute(`SELECT * FROM pengguna WHERE id = ?`, [id]);
        return rows[0];
    },

    updatePengguna: async (id, username, password, role) => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const sql = `UPDATE pengguna SET username = ?, password = ?, role = ? WHERE id = ?`;
        const [result] = await db.query(sql, [username, hashPassword, role, id]);
        return result;
    }
}

module.exports = user;