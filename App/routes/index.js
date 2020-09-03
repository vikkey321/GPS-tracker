var express = require('express');
var router = express.Router();
const gpsdata = require("../models/gpsdata");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/addgpsdata", (req, res) => {
  console.log("Entering body");
  const { notenumber, latitude, longitude } = req.body; //Store request body
  let errors = [];
  //Check for validations
  if (!notenumber || !latitude || !longitude) {
    errors.push({ msg: "Please enter all fields" });
  }
  console.log(errors.length);
  //If error then render the same page with the entered data along with error message
  if (errors.length > 0) {
    res.json({ Message: errors });
  } else {
     const newgpsdata = new gpsdata({
        notenumber,
        latitude,
        longitude
        });

        newgpsdata
          .save()
          .then(newgpsdata => {
            res.json({ Message: "Data Inserted" });
          })

          // })
          .catch(err => console.log(err));
  }
});

router.post("/addgpsdata", (req, res) => {
  const { notenumber, latitude, longitude } = req.body; //Store request body
  let errors = [];
  //Check for validations
  if (!notenumber || !latitude || !longitude) {
    errors.push({ msg: "Please enter all fields" });
  }
  console.log(errors.length);
  //If error then render the same page with the entered data along with error message
  if (errors.length > 0) {
    res.json({ Message: errors });
  } else {
     const newgpsdata = new gpsdata({
        notenumber,
        latitude,
        longitude
        });

        newgpsdata
          .save()
          .then(newgpsdata => {
            res.json({ Message: "Data Inserted" });
          })

          // })
          .catch(err => console.log(err));
  }
});

router.get("/getdata/:notenumber", (req, res) => {
  var notenumber = req.params.notenumber;
  console.log(notenumber);

  gpsdata.find({ notenumber: notenumber }).exec((err, notenumber) => {
    console.log(notenumber);

    res.json(notenumber);
  });
});

module.exports = router;
