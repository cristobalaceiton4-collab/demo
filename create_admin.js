// create_admin.js
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');


if (process.argv.length < 4) {
console.log('Uso: node create_admin.js <username> <password>');
process.exit(1);
}


const username = process.argv[2];
const password = process.argv[3];


const db = new sqlite3.Database('./database.sqlite');


(async () => {
try {
const hash = await bcrypt.hash(password, 10);
db.run(
'INSERT INTO users (username, password_hash) VALUES (?, ?)',
[username, hash],
function (err) {
if (err) {
console.error('Error creando usuario:', err.message);
process.exit(1);
}
console.log('Usuario creado con id', this.lastID);
db.close();
}
);
} catch (e) {
console.error(e);
db.close();
}
})();