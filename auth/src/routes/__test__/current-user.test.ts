import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  // const authResponse = await request(app)
  //   .post('/api/users/signup')
  //   .send({ email: 'test@test.com', password: 'password' })
  //   .expect(201);
  // const cookie = authResponse.get('Set-Cookie');

  // the global signin function is a helper func that replaces the above code block
  const cookie = await global.signup();

  // In Jest, we need to manually set cookie to the request ourselves, which is normally handled
  // automatically in Postman or in browser
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('fails if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentUser')
    .send()
    .expect(401);
  // expect(response.body.currentUser).toEqual(null);
});
