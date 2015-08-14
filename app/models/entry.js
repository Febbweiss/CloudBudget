var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    ObjectId    = Schema.Types.ObjectId;
    
var DEBIT   = 'D',
    BILL    = 'B';
    
var EntrySchema = new Schema({
    account_id: {type: ObjectId, ref: 'Category', required: true},
    category: {type: ObjectId, ref: 'Account', required: false},
    sub_category: {type: ObjectId, required: false},
    label: {type: String, required:false},
    type: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true}, 
    created_at:  {type: Date, default: Date.now}
});

var Entry = mongoose.model('Entry', EntrySchema);
module.exports = Entry;