const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../server.js')

chai.use(chaiHttp);

describe('Server', () => {
  it('should exist', () => {
    expect(app).to.exist;
  })

  describe('GET requests', () => {
    it('should respond back with all items and a 200 status code', (done) => {
      chai.request(app)
      .get('/api/items')
      .end((err, res) => {
        if(err) { return done(err) }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body.items).to.have.length(2);
        done()
      })
    })
  })

  describe('POST requests', () => {
    describe('POST /api/items', () => {

  it('should post a new item', (done) => {
    let item = {
      id: 12,
      item: 'chalk',
      whyItStays: 'so I can draw weird chalk towns on the driveway',
      cleanliness: 'dusty'
    }
    chai.request(app)
    .post('/api/items')
    .send(item)
    .end((err, res) => {
      if(err) { return done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      done();
    })
  })

  it('should return an error if no item', (done) => {
    let item = { thing: '123' }
    chai.request(app)
    .post('/api/items')
    .send(item)
    .end((err, res) => {
      expect(res).to.have.status(422);
      expect(res.text).to.equal('Did not receive correct body params');
      done();
    })
  })
})
  })
})
