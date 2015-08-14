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

EntrySchema.index({account_id: 1, date: -1, type: 1});
EntrySchema.index({account_id: 1, date: -1, category: 1, sub_category: 1});

var Entry = mongoose.model('Entry', EntrySchema);
module.exports = Entry;