const backend = require('../backend');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('T9 predictor API', () => {
  it('should return 400 when numbers are empty', (done) => {
    chai
      .request(backend)
      .post('/predict')
      .send({ numbers: '' })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.text).to.equal('Missing numbers!');
        done();
      });
  });

  it('should return "a, b, c" when numbers are 1 and only real words is false', (done) => {
    chai
      .request(backend)
      .post('/predict')
      .send({ numbers: '2' })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body)
          .to.be.an('object')
          .that.deep.equals({ words: ['a', 'b', 'c'] });
        done();
      });
  });

  it('should include "apple" when numbers are 2775 and only real words is true', (done) => {
    chai
      .request(backend)
      .post('/predict')
      .send({ numbers: '2775', onlyRealWords: true })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.words).to.be.an('array');
        expect(response.body.words).to.include('apple');
        done();
      });
  });

  it('should predict "apple" when numbers are 277 and only real words is true', (done) => {
    chai
      .request(backend)
      .post('/predict')
      .send({ numbers: '277', onlyRealWords: true })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body.words).to.be.an('array');
        expect(response.body.words).to.include('apple');
        done();
      });
  });
});
