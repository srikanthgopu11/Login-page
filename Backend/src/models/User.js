// backend/src/models/User.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static create(email, password, callback) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err);

            db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], function(err) {
                if (err) {
                    if (err.message.includes("UNIQUE constraint failed: users.email")) {
                        return callback(new Error("Email already registered."));
                    }
                    return callback(err);
                }
                callback(null, { id: this.lastID, email });
            });
        });
    }

    static findByEmail(email, callback) {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) return callback(err);
            callback(null, row);
        });
    }

    static comparePassword(password, hashedPassword, callback) {
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) return callback(err);
            callback(null, isMatch);
        });
    }
}

module.exports = User;