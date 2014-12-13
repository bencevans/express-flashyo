
var assert = require('assert');

var express = require('express');
var session = require('express-session');
var flashyo = require('./');
var supertest = require('supertest');

var app = express();
app.use(session({
  secret: '123'
}));
app.use(flashyo());

var agent = supertest.agent(app);

describe('express-flashyo', function() {


  describe('res.flash()', function() {

    describe('message', function(req, res) {
      it('should set locals', function(done) {
        app.get('/', function(req, res) {
          res.flash('Drink dat mocha');
          assert.deepEqual(res.locals.flashyo, [{ message: 'Drink dat mocha', level: undefined }]);
          done();
        });
        agent.get('/').end(function(){});
      });
    });

    describe('message, level', function() {
      it('should set locals', function(done) {
        app.get('/2', function(req, res) {
          res.flash('Drink dat mocha', 'warning');
          assert.deepEqual(res.locals.flashyo, [{ message: 'Drink dat mocha', level: 'warning' }]);
          done();
        });
        agent.get('/2').end(function(){});
      });
    });

  });

  describe('req.flash()', function() {

    describe('message', function(req, res) {
      it('should set locals', function(done) {
        app.get('/3', function(req, res) {
          req.flash('Drink dat mocha');
          assert.deepEqual(req.session.flashyo, [{ message: 'Drink dat mocha', level: undefined }]);
          res.redirect('/3/redirected');
        });
        app.get('/3/redirected', function(req, res) {
          assert.deepEqual(res.locals.flashyo, [{ message: 'Drink dat mocha' }]);
          done();
        });
        agent.get('/3').redirects(4).end(function(){});
      });
    });

    describe('message, level', function() {
      it('should set locals', function(done) {
        app.get('/4', function(req, res) {
          req.flash('Drink dat mocha', 'warning');
          assert.deepEqual(req.session.flashyo, [{ message: 'Drink dat mocha', level: 'warning' }]);
          res.redirect('/4/redirected');
        });
        app.get('/4/redirected', function(req, res) {
          assert.deepEqual(res.locals.flashyo, [{ message: 'Drink dat mocha', level: 'warning' }]);
          done();
        });
        agent.get('/4').redirects(4).end(function(){});
      });
    });

  });



});
