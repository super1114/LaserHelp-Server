const sql = require("./db.js");

module.exports.signUp = (info, callback) => {
    const bcrypt = require('bcrypt');
    const salt = 10;
    const hash = bcrypt.hashSync(info.password, salt);
    console.log("signup", info.password,salt,hash);
    
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
    sql.query(query, function (err, result) {
        console.log(result[0].password);
        bcrypt.compare(info.password, result[0].password, function(err, res) {
            if(res) callback(null, result);
            else callback(true, []);    
        });
        
        // if (!result || !bcrypt.compare(info.password, result.password)) {
        //     callback(true, []);
        // } else {
        //     callback(null, result)   
        // }
    });
}



