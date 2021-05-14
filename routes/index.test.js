var app = require('../app');
var request =  require('supertest');

test('recherche expériences - query correct', async (done) => {
    await request(app).get('/search')
    .send({ region: 'Alsace', category: 'gastronomie' })
    .expect(200)
    .expect({ result: true, experiences: [{ name: 'vinot varlot' }] });
    done();
});

test('recherche expériences - query incorrect', async (done) => {
    await request(app).get('/search')
    .send({ })
    .expect(200)
    .expect({ result: false });
    done();
})