let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('Test api post clients: ', () => {
    it('should get list clients', (done) => {
        chai.request(url)
            .post('/entities/filter')
            .send({ startId: 1, endId: 5 })
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});