var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    bcrypt      = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
    
var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    language: {type: String, required: true, default: 'en'},
    created_at: {type: Date, 'default': Date.now}
});

UserSchema.statics.getAuthenticated = function(username, password, callback) {
    this.findOne({ username: username }, function(error, user) {
        if (error) {
            console.error(error);
            return callback(error);
        }
        // make sure the user exists
        if (!user) {
            return callback(null, null, 404);
        }
        
        user.comparePassword(password, function(error, isMatch) {
            if (isMatch) {
                return callback(null, user);
            }
            
            return callback(null, null, 401);
        });

    });
};


UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
        if (error) {
            console.log(error);
            return next(error);
        }

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(error, hash) {
            if (error) {
                return next(error);
            }

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
        if (error) {
            return callback(error);
        }
        callback(null, isMatch);
    });
};

var User = mongoose.model('User', UserSchema);

User.schema.path('username').validate(function (username) {
  return username.length;
}, 'Username cannot be blank');

User.schema.path('password').validate(function(password) {
    return password.length;
}, 'Password cannot be blank');

User.schema.path('language').validate(function(language) {
    return /en|fr/i.test(language);
}, 'Unknown language ("en" or "fr" only)')

module.exports = User;