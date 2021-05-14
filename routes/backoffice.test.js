var app = require('../app');
var request =  require('supertest');


//Gestion expérience ajout

test('ajout expérience - gestion expériences - body correct', async (done) => {
    await request(app).post('/backoffice/manageexperiences')
    .send({name: 'Vinot VArlot', activity: 'Visite vignes', category: 'gastronomie'})
    .expect(200)
    .expect({ result: true, experience:{name: 'Vinot VArlot', activity: 'Visite vignes', category: 'gastronomie'}});
    done();
});

//Gestion expérience modification

test('Modification expérience - gestion expériences - body correct', async (done) => {
    await request(app).put('/backoffice/manageexperiences')
    .send({ experienceID: '123', name: 'Vinot VArlot', activity: 'Visite vignes', category: 'gastronomie'})
    .expect(200)
    .expect({ result: true, experience:{experienceID: '123', name: 'Vinot VArlot', activity: 'Visite vignes', category: 'gastronomie'}});
    done();
});