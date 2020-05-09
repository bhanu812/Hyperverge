
  
process.env.NODE_ENV = 'test';

var mongoose = require('mongoose'),
chai = require('chai'),
chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
chai.config.includeStack = true;

var should = chai.should(),
assert = chai.assert,
expect = chai.expect;

var server = require('./app')

describe('test', function(){

  it('should return status 200 on homepage GET', function(done){
    chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    })
  });

  it('GET open seats', function(){
    chai.request(server)
    .get('/v1/api/ticket/open')
    .then(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
    })
  }); 	

  it('GET close seats', function(){
    chai.request(server)
    .get('/v1/api/ticket/closed')
    .then(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
    })
  }); 
})
