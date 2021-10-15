const sql = require("./db.js");

module.exports.signUp = (info, callback) => {
    
    console.log(info);
    
    var query = "INSERT INTO users (firstname, lastname, email, password, phone) VALUES ('"+info.firstname+"', '"+info.lastname+"', '"+info.email+"', '"+info.password+"', '"+info.phone+"')";
    console.log(query);
    sql.query(query, function (err, result) {
        callback(err, result);
    }); 
}

module.exports.logIn = (info, callback) => {
    console.log(info);
    
    var query = "SELECT * from users WHERE password='"+info.password+"' && email='"+info.email+"'";
    console.log(query);
    sql.query(query, function (err, result) {
      callback(err, result);
    });
}



