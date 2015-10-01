var mongoose        = require('mongoose'),
    ObjectId        = mongoose.Types.ObjectId,
    Account         = mongoose.model('Account'),
    Entry           = mongoose.model('Entry'),
    Handler         = require('../helpers/handler'),
    categories      = require('../models/categories');
    
var load_categories = function(language, callback) {
    var catz = {};
    categories.forEach(function(category) {
        var selected_category = category[language],
            key = category.en.categorygroup.toLowerCase().replace(/ /g, '_'),
            cat = catz[key] || {key: key, label: selected_category.categorygroup, sub_categories: []};
            
            if( !selected_category.category ) {
                cat.sub_categories.push({label: selected_category.subcategory, key: selected_category.subcategory.toLowerCase().replace(/ /g, '_')});
            }
            
            catz[key] = cat;
    });
    
    callback(null, catz);
};

var check_account = function(request, response, callback) {
    Account.findById(request.params.account_id, function(errors, account) {
        if( errors ) {
            return Handler.errorHandler(errors, 404, response);
        }
        
        if( !account ) {
            return response.status(404).json({message: 'Unknown account'});
        }
        
        if( !account.user_id.equals(request.user.id) ) {
            return response.status(401).end();
        }
        
        return callback(null, account);
    });
};

var delete_account = function(account, callback) {
    Entry.find({account_id: account.id}).remove(function(errors) {
        if( errors ) {
            if( callback ) {
                return callback(errors);
            }
            
            return;
        }
        
        account.remove(function(errors) {
            if( errors ) {
                if( callback ) {
                return callback(errors);
            }
                return;
            }
            
            if( callback ) {
                return callback();
            }
        });
    });
};

var get_balance = function(account_id, callback) {
    Entry.aggregate()
        .match({account_id: new ObjectId(account_id)})
        .group({_id : null, balance: { $sum: '$amount' }})
        .exec(callback);
};

var list_entries = function(account_id, entry, callback ) {
    get_balance(account_id, function(errors, data) {
        if( errors ) {
            return callback(errors);
        }
        
        Entry
            .find({account_id: account_id})
            .sort({date: -1})
            .exec(function(errors, entries) {
                if( errors ) {
                    return callback(errors);
                }
                return callback( null, {
                    entry: entry,
                    entries: entries,
                    balance: data[0].balance
                });
        });
    });
}
module.exports = {
    create : function(request, response) {
        var user = request.user,
            account = new Account({
                name: request.body.name,
                reference: request.body.reference,
                user_id: user.id
            });
        
        load_categories(user.language, function(error, result) {
            for( var key in result ) {
               account.categories.push( result[key] );
            }
            
            account.save(function(errors) {
                if( errors ) {
                    return Handler.errorHandler(errors, 400, response);
                }
                
                return response.status(201).json(account);
            });
        });
    },
    
    retrieve_accounts : function(request, response) {
        Account
            .find({user_id: request.user.id})
            .select({categories: 0})
            .sort({name: 1})
            .exec(function(errors, accounts) {
                if( errors ) {
                    Handler.errorHandler(errors, 400, response);
                }
                return response.json(accounts);
        });
    },
    
    modify : function(request, response) {
        return check_account(request, response, function(error, account) {
            account.name = request.body.name;
            account.reference = request.body.reference;
            
            account.save(function(errors) {
               if( errors ) {
                   return Handler.errorHandler(errors, 400, response);
               }
               
               return response.json(account);
            });
        });
    },
    
    delete : function(request, response) {
        return check_account(request, response, function(error, account) {
            return delete_account(account, function(errors) {
                if( errors ) {
                    return Handler.errorHandler(errors, 500, response);
                }
                
                return response.status(204).end();
                
            });
        });
    },
    
    delete_account : delete_account,
    
    get : function(request, response) {
       return check_account(request, response, function(error, account) {
            return response.json(account);
        });
    },
    
    add_entry : function(request, response) {
        return check_account(request, response, function(error, account) {
            var data = request.body,
                entry = new Entry({
                account_id: account.id,
                category: data.category ? new ObjectId(data.category) : undefined,
                sub_category: data.sub_category ? new ObjectId(data.sub_category) : undefined,
                label: data.label,
                amount: data.amount,
                date: new Date(data.date),
                type: data.amount >= 0 ? 'DEPOSIT' : 'BILL'
            });
            
            entry.save(function(errors) {
                if( errors ) {
                    return Handler.errorHandler(errors, 400, response);
                }
                list_entries(account.id, entry, function(errors, data) {
                    if( errors ) {
                        return Handler.errorHandler(errors, 500, response);
                    }
                    return response.status(201).json(data);                    
                });
            });
        });
    },
    
    modify_entry : function(request, response) {
        return check_account(request, response, function(error, account) {
            Entry.findById(request.params.entry_id, function(errors, entry) {
                if( errors ) {
                    return Handler.errorHandler(errors, 404, response);
                }
                
                if( !entry ) {
                    return response.status(404).end();
                }
                
                if( !entry.account_id.equals( account.id ) ) {
                    return response.status(401).end();
                }
                
                var data = request.body;
                
                entry.category = data.category ? new ObjectId(data.category) : undefined;
                entry.sub_category = data.sub_category ? new ObjectId(data.sub_category) : undefined;
                entry.label = data.label;
                entry.amount = data.amount;
                entry.date = new Date(data.date);
                entry.type = data.amount >= 0 ? 'DEPOSIT' : 'BILL';
                
                entry.save(function(errors) {
                    if( errors ) {
                        return Handler.errorHandler(errors, 400, response );
                    }
                    
                    list_entries(account.id, entry, function(errors, data) {
                        if( errors ) {
                            return Handler.errorHandler(errors, 500, response);
                        }
                        return response.status(200).json(data);                    
                    });
                });
            });    
        });
    },
    
    delete_entry : function(request, response) {
      return check_account(request, response, function(errors, account) {
           Entry.findById(request.params.entry_id, function(errors, entry) {
                if( errors ) {
                    return Handler.errorHandler(errors, 404, response);
                }
                
                if( !entry ) {
                    return response.status(404).end();
                }
                
                if( !entry.account_id.equals( account.id ) ) {
                    return response.status(401).end();
                }
                
                entry.remove(function(errors) {
                    if( errors ) {
                        return Handler.errorHandler(errors, 500, response);
                    }
                    list_entries(account.id, entry, function(errors, data) {
                        if( errors ) {
                            return Handler.errorHandler(errors, 500, response);
                        }
                        return response.status(200).json(data);                    
                    });
                });
           });
      });
    },
    
    list_entries : function(request, response) {
        return check_account(request, response, function(errors, account) {
            list_entries(account.id, null, function(errors, entries) {
                    if( errors ) {
                        return Handler.errorHandler(errors, 500, response);
                    }
                    
                    return response.json(entries);
                });
        });
    }
}