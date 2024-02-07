const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate,
        unique: true
    },
});

module.exports = mongoose.model("Urls", urlSchema);