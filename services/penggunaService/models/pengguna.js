const { db } = require('../config/appConfig');
const bcrypt = require('bcryptjs');

const user = {
    register: async (username, password, role, email) => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const [result] = await db.execute(`INSERT INTO pengguna (username, password, role, email) VALUES (?, ?, ?, ?)`, [username, hashPassword, role, email]);
        return result;
    },

    getPenggunaData: async(id) => {
        const [rows] = await db.execute(`SELECT id, username, email, role, fotoProfil, oauthProvider, tanggalDibuat FROM pengguna WHERE id = ?`, [id]);
        return rows[0];
    },

    updatePengguna: async (id, username, password, role, email) => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const sql = `UPDATE pengguna SET username = ?, password = ?, role = ?, email = ? WHERE id = ?`;
        const [result] = await db.query(sql, [username, hashPassword, role, email, id]);
        return result;
    },

    findOrCreatedOAuth: async (profile, provider) => {
        const { id, displayName, emails, photos } = profile;
        const email = emails[0].value;
        const foto = photos ? photos[0].value : null;

        const [rows] = await db.execute(`SELECT * FROM pengguna WHERE email = ?`, [email]);

        if (rows.length > 0) {
            return rows[0];
        }

        const [result] = await db.execute(
            `INSERT INTO pengguna (username, email, fotoProfil, oauthProvider, oauthId, role) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [displayName, email, foto, provider, id, 'pembeli']
        );

        const [newUser] = await db.execute(`SELECT * FROM pengguna WHERE id = ?`, [result.insertId]);
        return newUser[0];
    }
}

module.exports = user;