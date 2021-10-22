const sql = require("./db.js");
const bcrypt = require('bcrypt');
module.exports.signUp = (info, callback) => {
    const hash = bcrypt.hashSync(info.password, 10);
    var query = "INSERT INTO users (firstname, lastname, email, password, phone, expert) VALUES ('"+info.firstname+"', '"+info.lastname+"', '"+info.email+"', '"+hash+"', '"+info.phone+"', '0')";
    sql.query(query, function (err, result) {
        callback(err, result);
    });
     
}


function registerUserId(questionId, userId) {
    var query = "UPDATE requests SET user_id = "+userId+" WHERE id="+questionId;
    sql.query(query, function (err, result) {
        if (err) throw err;
        //console.log(result.affectedRows + " record(s) updated");
    });
}
module.exports.logIn = (info, callback) => {
    const questionId = info.questionId;
    var query = "SELECT * from users WHERE email='"+info.email+"'";
    sql.query(query, function (err, result) {
        if(result.length==0) { callback(true, []); }
        else {
            bcrypt.compare(info.password, result[0].password, function(err, res) {
                if(res){
                    registerUserId(questionId, result[0].id);
                    callback(null, result);
                } 
                else callback(true, []);
            });
        }
        
    });
}



