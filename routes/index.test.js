var app = require('../app');
var request =  require('supertest');

//recherche
test('recherche expériences - query correct', async (done) => {
    await request(app).get('/search')
    .query({ region: 'Alsace', category: 'gastronomie' })
    .expect(200)
    .expect({ result: true, experiences: [{ name: 'vinot varlot' }] });
    done();
});

test('recherche expériences - query incorrect', async (done) => {
    await request(app).get('/search')
    .query({ })
    .expect(200)
    .expect({ result: false });
    done();
});

//liste de voyages suggerés
test('liste roadtrips - query correct', async (done) => {
    await request(app).get('/roadtrips')
    .query({ category: 'gastronomie', averageTime: '3 days', region: 'Alsace' })
    .expect(200)
    .expect({ result: true, experiences: [{ name: 'vinot varlot' }] });
    done();
});

test('liste roadtrips - query incorrect', async(done) => {
    await request(app).get('/roadtrips')
    .query({ category: 'gastronomie' })
    .expect(200)
    .expect({ result: false });
    done();
})

//partager un voyage
test('partage de voyage - body correct', async(done) => {
    await request(app).post('/sharetrip')
    .send({ experiences: ['12345', '23456', '34567'], name: 'mon voyage en Alsace', commentaire: "c'était top", photos: ['photourl1, photourl2'], userID: '123456'})
    .expect(200)
    .expect({ result: true, roadtripID: '1234567' });
    done();
})

test('partage de voyage - body incorrect', async(done) => {
    await request(app).post('/sharetrip')
    .send({ name: 'mon voyage en Alsace', comments: ["c'était top", 'on y mange bien'], photos: ['photourl1, photourl2'], userID: '123456'})
    .expect(200)
    .expect({ result: false });
    done();
})

//ajout expérience au roadplanner
test('ajout au roadplanner - body correct', async(done) => {
    await request(app).put('/myroadplanner')
    .send({ experienceID: '12345' })
    .expect(200)
    .expect({ result: true, experiences: [ '12345' ] });
    done();
})

//ajout expérience au roadplanner
test('ajout au roadplanner - body incorrect', async(done) => {
    await request(app).put('/myroadplanner')
    .send({ })
    .expect(200)
    .expect({ result: false });
    done();
})
