const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Laserhelp'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
    console.log("git update");
});