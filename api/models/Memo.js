const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Memo = new Schema({
    createDate: {
        type: Date
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    memoHashtags: {
        type: String
    },
    relatedEvos: {
        type: Array
    }
    // TODO: author.name, author.nick, author.email <- nested Schema?
}, {
    collection: 'memo'
});


module.exports = mongoose.model('Memo', Memo)