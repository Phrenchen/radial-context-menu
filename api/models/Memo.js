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
    neighbours: {
        type: Array
    },
    thumbnail: {
        type: String
    },
    url: {
        type: String
    },
    creatorId: {
        type: String
    }
    // TODO: author.name, author.nick, author.email <- nested Schema?
}, {
    collection: 'memo'
});


module.exports = mongoose.model('Memo', Memo)