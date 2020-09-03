//Data Model for Adding a new Asset in database

const mongoose = require("mongoose");

const gpsdataSchema = new mongoose.Schema(
    {
    
        notenumber: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        lastupdate: {
            type: Date,
            default : Date.now(),
            required: false
        }
    }

);

const gpsdata = mongoose.model("gpsdata", gpsdataSchema);

module.exports = gpsdata;
