var app = require('../app');
var request =  require('supertest');

test('ajout expérience - gestion expériences - body correct', async (done) => {
    await request(app).post('/backoffice/manageexperiences')
    .send({name: 'Vinot VArlot', activity: 'Visite vignes', category: 'gastronomie'})
    .expect(200)
    .expect({ result: true});
    done();
});