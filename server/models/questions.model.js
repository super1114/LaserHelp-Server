const sql = require("./db.js");

module.exports.Request = (info, upfile, callback) => {
    console.log("---------------------")
    console.log("upfile.file:", upfile.file);
    console.log("====================")
    var query = "INSERT INTO questions (question, loom, attached_file) VALUES ('"+info.question+"', '"+info.loom+"', '"+upfile.file.name+"')";
        sql.query(query, function (err, result) {
            callback(err, result);
    });
}
    
