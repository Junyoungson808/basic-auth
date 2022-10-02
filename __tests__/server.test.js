'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/auth/models');
const request = supertest(app); 


beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('API Server Test', () => {
  test('allows a user to create new user', async () => {
    let response = await request.post('/signup').send({
      username: 'test',
      password: 'test',
    });

    // console.log('Response Body', response.body);
    // expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('test');
    // expect(response.body.password).toBeTruthy();
    // expect(response.body.password).not.toEqual('test');
  });
});
