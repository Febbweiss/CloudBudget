var should      = require('should'), 
    request     = require('supertest'),
    app         = require('../server.js'),
    Db          = require('./db.js'),
    globalServer, token, hacker_token, account_id;

describe('API /accounts', function() {
    
     before( function(done) {
        globalServer = app.listen();
        token = Db.get_user_token();
        hacker_token = Db.get_hacker_token();
        account_id = Db.ACCOUNT_ID;
        Db.init(done);
    });
    
    after( function() {
        globalServer.close(); 
    });

    describe('* Creation', function() {
       it('should create an account', function(done) {
           request(globalServer)
                .post('/api/accounts')
                .send({
                    name: 'Home',
                    reference: '1234567890'
                })
                .set('Authorization', 'JWT ' + token)
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/)
                .end( function(error, result) {
                    should.not.exist(error);
                    var account = result.body;
                    should.exist(account);
                    account.name.should.be.equal('Home');
                    account.reference.should.be.equal('1234567890');
                    done();
                });
       });
       
       it('should fail to create account without params', function(done) {
           request(globalServer)
                .post('/api/accounts')
                .set('Authorization', 'JWT ' + token)
                .set('Accept', 'application/json')
                .expect(400)
                .expect('Content-Type', /json/)
                .end( function(error, result) {
                    var errors = result.body;
                    should.exist(errors);
                    errors.should.be.instanceof(Array).and.have.lengthOf(1);
                    var error = errors[0];
                    error.field.should.be.equal('name');
                    done();
                });
       });
       
       it('should fail to create account without valid token', function(done) {
          request(globalServer)
                .post('/api/accounts')
                .send({
                    name: 'Home',
                    reference: '1234567890'
                })
                .set('Authorization', 'JWT fake')
                .expect(401, done);
       });
       
       it('should fail to create account without token', function(done) {
          request(globalServer)
                .post('/api/accounts')
                .send({
                    name: 'Home',
                    reference: '1234567890'
                })
                .expect(401, done);
       });
    });
    
    describe('* Deletion', function() {
        it('should delete the given account', function(done) {
             request(globalServer)
                .post('/api/accounts')
                .send({
                    name: 'Todelete',
                    reference: '0987654321'
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var account_to_delete_id = result.body._id;
                    
                    request(globalServer)
                        .delete('/api/accounts/' + account_to_delete_id)
                        .set('Authorization', 'JWT ' + token)
                        .set('Accept', 'application/json')
                        .expect(204, done);
                });
        });
        
        it('should fail to delete unknown account', function(done) {
            request(globalServer)
                .delete('/api/accounts/4fc67871349bb7bf6a000002')
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
        });
        
        it('should fail to delete invalid account', function(done) {
            request(globalServer)
                .delete('/api/accounts/1')
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
        });
        
        it('should fail to delete account for another user', function(done) {
             request(globalServer)
                .post('/api/accounts')
                .send({
                    name: 'Todelete',
                    reference: '0987654321'
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var account_to_delete_id = result.body._id;
                    request(globalServer)
                        .delete('/api/accounts/' + account_to_delete_id)
                        .set('Authorization', 'JWT ' + hacker_token)
                        .expect(401, done);
                });
        });
    });

    describe('* Retrieve', function() {
        it('should retrieve the given account', function(done) {
            request(globalServer)
                .get('/api/accounts/' + account_id)
                .set('Authorization', 'JWT ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end( function(error, result) {
                    should.not.exist(error);
                    
                    var account = result.body;
                    should.exist(account);
                    account.name.should.be.equal('Default');
                    account.reference.should.be.equal('1234567890');
                    done();
                })
        });
        
        it('should fail to retrieve an unknown account', function(done) {
            request(globalServer)
                .get('/api/accounts/4fc67871349bb7bf6a000002')
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
        });
        
         it('should fail to retrieve an invalid account', function(done) {
            request(globalServer)
                .get('/api/accounts/1')
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
        });
        
        it('should fail to retrieve the account for another user', function(done) {
            request(globalServer)
                .get('/api/accounts/' + account_id)
                .set('Authorization', 'JWT ' + hacker_token)
                .expect(401, done);
        });
    });
    
    describe('* Modify', function() {
       it('should modify the given account', function(done) {
            request(globalServer)
                .put('/api/accounts/' + account_id)
                .send( {
                    name: 'Home 2',
                    reference: '0987654321'
                })
                .set('Authorization', 'JWT ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(error, result) {
                   should.not.exist(error);
                   
                   var account = result.body;
                   should.exist(account);
                   account.name.should.be.equal('Home 2');
                   account.reference.should.be.equal('0987654321');
                   
                   done(); 
            });
       });
       
       it('should fail to modify without arguments', function(done) {
           request(globalServer)
                .put('/api/accounts/' + account_id)
                .set('Authorization', 'JWT ' + token)
                .expect(400, done)
       });

       it('should fail to modify missing arguments', function(done) {
           request(globalServer)
                .put('/api/accounts/' + account_id)
                .send({reference: 'AZERTY'})
                .set('Authorization', 'JWT ' + token)
                .expect(400, done);
       });

       it('should fail to modify invalid account', function(done) {
            request(globalServer)
                .put('/api/accounts/1')
                .set('Authorization', 'JWT ' + token)
                .expect(404, done)
       });
       
       it('should fail to modify account for another user', function(done) {
           request(globalServer)
                .put('/api/accounts/' + account_id)
                .set('Authorization', 'JWT ' + hacker_token)
                .expect(401, done)
       });
    });
    
    describe('* Entries', function() {
       describe('* Creation', function() {
          it('should create an entry with minimal data (DEPOSIT)' , function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    amount: 1000,
                    date: new Date('2015-08-14')
                })
                .set('Authorization', 'JWT ' + token)
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(error, result) {
                    should.not.exist(error);
                    
                    var entry = result.body.entry;
                    should.exist(entry);
                    entry.amount.should.be.equal(1000);
                    new Date(entry.date).should.eql(new Date(2015, 7, 14));
                    entry.type.should.be.equal('DEPOSIT');
                    should.not.exist(entry.category);
                    should.not.exist(entry.sub_category);
                    
                    var entries = result.body.entries;
                    should.exist(entries);
                    entries.should.be.instanceof(Array).and.have.lengthOf(2);
                    new Date(entries[0].date).should.eql(new Date('2015-08-14'))
                    entries[0].type.should.be.equal('DEPOSIT');
                    entries[0].amount.should.be.equal(1000);
                    
                    should.exist(result.body.balance);
                    
                    done();
                });
          });
          it('should create an entry with minimal data (BILL)' , function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: -1000,
                    date: new Date('2015-08-15')
                })
                .set('Authorization', 'JWT ' + token)
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(error, result) {
                    should.not.exist(error);
                    
                    var entry = result.body.entry;
                    should.exist(entry);
                    entry.amount.should.be.equal(-1000);
                    new Date(entry.date).should.eql(new Date(2015, 7, 15));
                    entry.type.should.be.equal('BILL');
                    should.not.exist(entry.category);
                    should.not.exist(entry.sub_category);
                    
                    var entries = result.body.entries;
                    should.exist(entries);
                    entries.should.be.instanceof(Array).and.have.lengthOf(3);
                    new Date(entries[0].date).should.eql(new Date('2015-08-15'))
                    entries[0].type.should.be.equal('BILL');
                    entries[0].amount.should.be.equal(-1000);
                    
                    should.exist(result.body.balance);
                    
                    done();
                });
          });
          
          it('should fail to create entry without data', function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .set('Authorization', 'JWT ' + token)
                .expect(400, done);
          });
          
          it('should fail to create entry for not owned account', function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .set('Authorization', 'JWT ' + hacker_token)
                .send({
                    label: 'test',
                    amount: -1000,
                    date: new Date('2014-12-08')
                })
                .expect(401, done);
          });
          
          it('should fail to create entry for not valid account', function(done) {
              request(globalServer)
                .post('/api/accounts/1/entries')
                .send({
                    label: 'test',
                    amount: -1000,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
          });
          
          it('should fail to create entry for unknown account', function(done) {
              request(globalServer)
                .post('/api/accounts/' + token + '/entries')
                .send({
                    label: 'test',
                    amount: -1000,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
          });
       });
       
       describe('* Modify', function() {
          it('should modify the given entry', function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: 50,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var entry_id = result.body.entry._id;
                    request(globalServer)
                        .put('/api/accounts/' + account_id + '/entries/' + entry_id)
                        .send({
                            label: 'modified',
                            amount: 55,
                            date: new Date('2014-12-09')
                        })
                        .set('Authorization', 'JWT ' + token)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .end( function(errors, result) {
                            should.not.exist(errors);
                            
                            var entry = result.body.entry;
                            should.exist(entry);
                            entry.label.should.be.equal('modified');
                            entry.amount.should.be.equal(55);
                            new Date(entry.date).should.eql(new Date(2014,11,9));
                            
                            var entries = result.body.entries;
                            should.exist(entries);
                            entries.should.be.instanceof(Array);
                            
                            should.exist(result.body.balance);
                            
                            done(); 
                        });
                });
          });
          
          it('should fail to modify the given entry without data', function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: 50,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var entry_id = result.body.entry._id;
                    request(globalServer)
                        .put('/api/accounts/' + account_id + '/entries/' + entry_id)
                        .set('Authorization', 'JWT ' + token)
                        .expect(400, done);
                });
          });
          
          it('should fail to modify unknown entry', function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: 50,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    request(globalServer)
                        .put('/api/accounts/' + account_id + '/entries/' + token)
                        .send({
                            label: 'modified',
                            amount: 55,
                            date: new Date('2014-12-09')
                        })
                        .set('Authorization', 'JWT ' + token)
                        .expect(404, done);
                });
          });
          
          it('should fail to modify invalid entry', function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: 50,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var entry_id = result.body._id;
                    request(globalServer)
                        .put('/api/accounts/' + account_id + '/entries/1')
                        .send({
                            label: 'modified',
                            amount: 55,
                            date: new Date('2014-12-09')
                        })
                        .set('Authorization', 'JWT ' + token)
                        .expect(404, done);
                });
          });
          
          it('should fail to modify the given entry for unknown account', function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: 50,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var entry_id = result.body._id;
                    request(globalServer)
                        .put('/api/accounts/' + token + '/entries/' + entry_id)
                        .send({
                            label: 'modified',
                            amount: 55,
                            date: new Date('2014-12-09')
                        })
                        .set('Authorization', 'JWT ' + token)
                        .expect(404, done);
                });
          });
          
          it('should fail to modify the given entry for invalid account', function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: 50,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var entry_id = result.body._id;
                    request(globalServer)
                        .put('/api/accounts/1/entries/' + entry_id)
                        .send({
                            label: 'modified',
                            amount: 55,
                            date: new Date('2014-12-09')
                        })
                        .set('Authorization', 'JWT ' + token)
                        .expect(404, done);
                });
          });
          
          it('should fail to modify the given not owned entry', function(done) {
              request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: 50,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var entry_id = result.body._id;
                    request(globalServer)
                        .put('/api/accounts/' + account_id + '/entries/' + entry_id)
                        .send({
                            label: 'modified',
                            amount: 55,
                            date: new Date('2014-12-09')
                        })
                        .set('Authorization', 'JWT ' + hacker_token)
                        .expect(401, done);
                });
          });
       });
       
       describe('* Deletion', function() {
          it('should delete the given entry', function(done) {
             request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: 50,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var entry_id = result.body.entry._id;
                    request(globalServer)
                        .delete('/api/accounts/' + account_id + '/entries/' + entry_id)
                        .set('Authorization', 'JWT ' + token)
                        .expect(200)
                        .end(function(error, result) {
                            should.exist(result.body.balance);
                            done();
                        });
                });
          });
          
          it('should fail to delete an unknown entry', function(done) {
              request(globalServer)
                .delete('/api/accounts/' + account_id + '/entries/' + token)
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
          });
          
          it('should fail to delete an invalid entry', function(done) {
              request(globalServer)
                .delete('/api/accounts/' + account_id + '/entries/1')
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
          });
          
          it('should fail to delete the not owned given entry', function(done) {
             request(globalServer)
                .post('/api/accounts/' + account_id + '/entries')
                .send({
                    label: 'test',
                    amount: 50,
                    date: new Date('2014-12-08')
                })
                .set('Authorization', 'JWT ' + token)
                .end(function(error, result) {
                    var entry_id = result.body.entry._id;
                    request(globalServer)
                        .delete('/api/accounts/' + account_id + '/entries/' + entry_id)
                        .set('Authorization', 'JWT ' + hacker_token)
                        .expect(401, done);
                });
          });
       });
       
       describe('* Retrieve', function() {
          it('should retrieve all entries', function(done) {
              request(globalServer)
                .get('/api/accounts/' + account_id + '/entries')
                .set('Authorization', 'JWT ' + token)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(errors, result) {
                   should.not.exist(errors);
                   
                   var entries = result.body.entries;
                   should.exist(entries);
                   entries.should.be.instanceof(Array);
                   
                   var balance = result.body.balance;
                   should.exist(balance);
                   balance.should.be.instanceof(Number);
                   done(); 
                });
          });
          
          it('should fail to retrieve entries for unknown account', function(done) {
              request(globalServer)
                .get('/api/accounts/' + token + '/entries')
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
          });
          
          it('should fail to retrieve entries for invalid account', function(done) {
              request(globalServer)
                .get('/api/accounts/1/entries')
                .set('Authorization', 'JWT ' + token)
                .expect(404, done);
          });
          
          it('should fail to retrieve entries for the not owned given account', function(done) {
              request(globalServer)
                .get('/api/accounts/' + account_id + '/entries')
                .set('Authorization', 'JWT ' + hacker_token)
                .expect(401, done);
          });
       });
    });
});