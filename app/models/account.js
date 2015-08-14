var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    ObjectId    = Schema.Types.ObjectId;
    
var CategorySchema = new Schema({
    label: {type: String, required:true},
    key: {type: String, required: true, index: {unique: false} },
    sub_categories: [{
        label: {type: String, required:true},
        key: {type: String, required: true, index: {unique: false} },
    }]
});

var AccountSchema = new Schema({
   name: {type: String, required: true},
   reference: {type: String, required: false},
   categories: {type: [CategorySchema], required: true},
   user_id: {type: ObjectId, ref: 'User', required: true},
   created_at: {type: Date, default: Date.now} 
});

var Account = mongoose.model('Account', AccountSchema);
var Category = mongoose.model('Category', CategorySchema);

module.exports = Account;