const mongoose = require('mongoose');

const imageModel = mongoose.Schema({
    name : {type: String, required: true},
    image: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Image', imageModel);