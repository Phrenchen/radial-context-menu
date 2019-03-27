const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Evo = new Schema({
    createDate: {
        type: Date
    },
    createDate: {
        type: Date
    },
    parentMemo: {
        type: string
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
}, {
    collection: 'evo'
});


module.exports = mongoose.model('Evo', Evo)