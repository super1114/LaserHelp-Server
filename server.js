const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
// const Question = require("./server/models/questions.model");

const app = express();

app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// const formData = require('express-form-data');
// app.use(formData.parse());
app.post('/api/submit_question', async (req, res) => {
  // console.log(req.files)
  // Question.Request(req.body, req.files, function(err, result) {
  //   if(result.length==0) return res.json({status:false});
  //   else return res.json({status:true, result:result});
  // });

  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
        
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let avatar = req.files.file;
          
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          avatar.mv('./server/uploads/' + avatar.name);
          // console.log(avatar);
          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: avatar.name,
                  mimetype: avatar.mimetype,
                  size: avatar.size
              }
          });        
      }
  } catch (err) {
      res.status(500).send(err);
  }  
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});



require("./server/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
