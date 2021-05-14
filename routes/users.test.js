var app = require('../app');
var request =  require('supertest');


//Inscription client (Sign up)

test('inscriptions client - body correct', async (done) => {
    await request(app).post('/users/signup')
    .send({ firstName: 'Pierre', pseudo: 'pim', email: 'pierre@gmail.com' })
    .expect(200)
    .expect({ result: true, user: { pseudo: 'pim', firstName: 'Pierre', email: 'pierre@gmail.com'} });
    done();
});

test('inscriptions client - body incorrect', async (done) => {
    await request(app).post('/users/signup')
    .send({ firstName: 'Pierre', email: 'pierre@gmail.com' })
    .expect(200)
    .expect({ result: false });
    done();
});

//Connexion client (sign in)

test('Connexion client - body correct', async (done) => {
    await request(app).post('/users/signin')
    .send({ password: '12345', email: 'pierre@gmail.com' })
    .expect(200)
    .expect({ result: true, user: { pseudo: 'pim', firstName: 'Pierre',lastName: 'ferrand', email: 'pierre@gmail.com'} });
    done();
});

test('Connexion client - body incorrect', async (done) => {
    await request(app).post('/users/signin')
    .send({ email: 'pierre@gmail.com' })
    .expect(200)
    .expect({ result: false });
    done();
});

// Accés compte personnel 

test('Accés compte personnel  - query correct', async (done) => {
    await request(app).get('/users/myaccount')
    .query({ token: '123456' })
    .expect(200)
    .expect({ result: true, user :{ pseudo: 'pim', firstName: 'Pierre',lastName: 'ferrand', email: 'pierre@gmail.com'} });
    done();
});


//Modification compte personnel

test('Modification compte personnel - body correct', async (done) => {
    await request(app).put('/users/myaccount')
    .send({ firstName: 'Charles', email:' charles@gmail.com'})
    .expect(200)
    .expect({ result: true, user :{ pseudo: 'pim', firstName: 'Charles',lastName: 'ferrand', email: 'charles@gmail.com'} });
    done();
});

test('Modification compte personnel - body incorrect', async (done) => {
    await request(app).put('/users/myaccount')
    .send({  email:' charles@gmail.com'})
    .expect(200)
    .expect({ result: false });
    done();
});