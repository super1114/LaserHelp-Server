// const { Alert } = require("bootstrap");
const sql = require("./db.js");

module.exports.signUp = (info, callback) => {
    const bcrypt = require('bcrypt');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(info.password, salt);
    console.log("signup", info.password,salt,hash);
    
    
    // console.log(info);
    // console.log(info.confirm)
    if(info.confirm == info.password)
        {var query = "INSERT INTO users (firstname, lastname, email, password, phone, salt) VALUES ('"+info.firstname+"', '"+info.lastname+"', '"+info.email+"', '"+hash+"', '"+info.phone+"','"+salt+"')";
        sql.query(query, function (err, result) {
            callback(err, result);
        });
    }else {
            console.log("confirm!!!");
            var err="you have to confirm";
            var result= [];
            callback(err, result); 
        } 
}

module.exports.logIn = (info, callback) => {
    const bcrypt = require('bcrypt');
    
    var query = "SELECT * from users WHERE email='"+info.email+"'";
    // console.log(query);
    sql.query(query, function (err, result) {
        const hash = bcrypt.hashSync(info.password, result[0].salt);
        console.log("login",info.password,result[0].salt,hash);
        if (hash == result[0].password) {
            callback(err, result);
        } else {
            result= [];
            callback(err, result);
        }
    });
}



