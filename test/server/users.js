var should          = require('should'), 
    request         = require('supertest'),
    app             = require('../../server.js'),
    mongoose        = require('mongoose'),
    User            = mongoose.model('User'),
    Db              = require('./db.js'),
    sinon           = require('sinon'),
    EventEmitter    = require('../../app/events/listeners'),
    globalServer, token, hacker_token, account_id, user_id;

describe('API /users', function() {
    
    before(function(done) {
        globalServer = app.listen();
        token = Db.get_user_token();
        hacker_token = Db.get_hacker_token();
        account_id = Db.ACCOUNT_ID;
        user_id = Db.USER_ID;
        Db.init(done);
    });
    
    after( function() {
        globalServer.close(); 
    });
    
    describe('* Login', function() {
        
        it('should log successfully', function(done) {
            request(globalServer)
                .post('/api/users/login')
                .send({
                    username: 'test',
                    password: 's3cr3t'
                })
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end( function(error, result) {
                    should.not.exist(error);
                    
                    var user = result.body;
                    should.exist(user);
                    user.username.should.be.equal('test');
                    should.exist(user.token);
                    done();
                });
        });
    
        it('should fail login', function(done) {
            request(globalServer)
                .post('/api/users/login')
                .send({
                    username: 'test',
                    password: 'secret'
                })
                .set('Accept', 'application/json')
                .expect(401, done);
        });
        
        it('should logout', function(done) {
           request(globalServer)
            .delete('/api/users/login')
            .expect(200, done);
        });
    });
    
    describe('* Registration', function() {
       
       it('should fail without any params', function(done) {
           request(globalServer)
            .post('/api/users')
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, result) {
                var errors = result.body;
                should.exist(errors);
                errors.should.be.instanceof(Array).and.have.lengthOf(2);
                done();
            });
       });
       
       it('should fail without a password', function(done) {
           request(globalServer)
            .post('/api/users')
            .send( { username: 'registration'})
            .expect(400, done);
       });
       
       it('should fail without an username', function(done) {
           request(globalServer)
            .post('/api/users')
            .send({password: 'secret'})
            .set('Accept', 'application/json')
            .expect(400, done);
       });
       
       it('should fail on duplicate account', function(done) {
           request(globalServer)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'secret'
            })
            .set('Accept', 'application/json')
            .expect(409, done);
       });
       
       it('should register successfully', function(done) {
           request(globalServer)
            .post('/api/users')
            .send({
                username: 'registration',
                password: 'secret'
            })
            .set('Accept', 'application/json')
            .expect(201)
            .end(function(error, result) {
                
                should.not.exist(error);
                var user = result.body;
                should.exist(user);
                user.username.should.be.equal('registration');
                should.exist(user.token);
                User.getAuthenticated('registration', 'secret', function(error, user) {
                    should.not.exist(error);
                    should.exist(user);
                    done();
                });
            });
       });
       
    });
    
    describe('* Deregistration', function() {
        it('should fail to delete user account without security token', function(done) {
            request(globalServer)
                .delete('/api/users')
                .expect(401, done);
        });
        
        it('should fail to delete user account with fake security token', function(done) {
            request(globalServer)
                .delete('/api/users')
                .set('Authorization', 'JWT fake_token')
                .expect(401, done);
        });
        
        it('should delete user with accounts and entries', function(done) {
            var eventEmitter= EventEmitter.eventEmitter,
                spy_accounts = sinon.spy(),
                spy_entries = sinon.spy();
            
            eventEmitter.on(EventEmitter.events.ACCOUNTS_DELETE_BY_USER_ID_EVT, spy_accounts);
            eventEmitter.on(EventEmitter.events.ENTRIES_DELETE_BY_ACCOUNT_EVT, spy_entries)
            
            request(globalServer)
                .delete('/api/users')
                .set('Authorization', 'JWT ' + token)
                .expect(204)
                .end(function(error, result) {
                    User.findOne({username: 'test'}, function(error, user) {
                        should.not.exist(error);
                        should.not.exist(user);

                        sinon.assert.calledWith(spy_accounts, user_id);
                        spy_entries.called.should.equal.true;
                        spy_entries.args[0][0].id.should.be.equal(account_id);
                        done();
                    });
                });
        });

        it('should delete user without account', function(done) {
            var eventEmitter= EventEmitter.eventEmitter,
                spy_accounts = sinon.spy(),
                spy_entries = sinon.spy();
            
            eventEmitter.on(EventEmitter.events.ACCOUNTS_DELETE_BY_USER_ID_EVT, spy_accounts);
            eventEmitter.on(EventEmitter.events.ENTRIES_DELETE_BY_ACCOUNT_EVT, spy_entries)
            
            request(globalServer)
                .delete('/api/users')
                .set('Authorization', 'JWT ' + hacker_token)
                .expect(204)
                .end(function(error, result) {
                    User.findOne({username: 'hacker'}, function(error, user) {
                        should.not.exist(error);
                        should.not.exist(user);

                        spy_accounts.called.should.equal.true;
                        spy_entries.called.should.equal.false;
                        
                        done();
                    });
                });
        });
    });
});