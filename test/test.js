let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var request = require('request');
var expect = require('chai').expect;
const shortner = require('../shortner');
const get_all_urls = [];

chai.use(chaiHttp);

describe('server', function () {

    describe('Test the index route', function () {
        it('should return a page with the title URL', function (done) {
            request.get({ url: 'http://localhost:5000' }, function (error, response, body) {
                expect(body).to.include('URL');
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    // describe('Test submitting a URL', function () {
    //     it('should return the shortened URL', function (done) {
    //         request.post('http://localhost:5000/shorten', {form: {url: 'http://www.google.co.uk'}}, function (error, response, body) {
    //             // let shortcode = shortner.shorten('http://www.google.co.uk');
    //             // get_all_urls.push('http://localhost:5000/'+ shortcode);
    //             // expect(body).to.include(shortcode);
    //             expect(response.statusCode).to.equal(200);
    //             done();
    //         });
    //     });
    // });


    describe('Test submitting a URL', function () {
        it('should return the shortened URL', function (done) {
            request.post('/shorten', {form: {url: 'http://www.google.co.uk'}}, function (error, response, body) {
                let shortcode = shortner.shorten('http://www.google.co.uk');
                get_all_urls.push('http://localhost:5000/'+ shortcode);
                expect(get_all_urls).to.have.members(['http://localhost:5000/'+ shortcode]);
                done();
            });
        });
    });
    

   
    describe('Test following a URL', function () {
        it('should redirect the user to the shortened URL', function (done) {
            request.get('/:shortcode', 'http://www.google.co.uk', function () {
                request.get({
                    url: 'http://localhost:5000/:1dTP',
                    followRedirect: false
                }, function (error, response, body) {
                    let shortcode = shortner.shorten('http://www.google.co.uk');
                    let URL = shortner.expand(shortcode);
                    expect(URL).to.equal('http://www.google.co.uk');
                    expect(response.statusCode).to.equal(302);
                    done();
                });
            });
        });
    });

    describe('Get all the url', () => {
        it('it should GET all the urls', (done) => {
          chai.request(server)
              .get('/url/all')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
        });
    });


    describe('DELETE a url', function() {
        it('should delete a url', function(done) {
          chai.request(server)
          .delete('/delete/url')
          .end(function(error, response) {
            response.should.have.status(200);
            response.body.should.be.a('array');  
            done();         
          });
        });
      });



});