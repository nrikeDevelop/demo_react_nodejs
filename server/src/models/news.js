const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    content: String,
    author: String,
    img: String,
    archiveDate: Date
});

module.exports = mongoose.model('news',NewsSchema);