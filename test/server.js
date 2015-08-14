var should = require('should'), 
    request = require('supertest'),
    app  = require('../server.js'),
    globalServer;

describe('Static resources', function(){
    
    before(function () {
        globalServer = app.listen();
    });

    after(function () {
        globalServer.close();
    });
    
    it('should send index.html', function(done){
            request(globalServer)
            .get('/')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(200, done);
    })
})