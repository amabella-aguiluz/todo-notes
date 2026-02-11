// test/app.test.js
import request from 'supertest';
import app from '../server.js'; // your Express app
import User from '../models/user.model.js';
import Note from '../models/notes.model.js';

let token;
let userId;
let noteId;

// Clean up tables before each test
beforeEach(async () => {
  await Note.destroy({ where: {} });
  await User.destroy({ where: {} });
});

// Clean up tables after all tests
afterAll(async () => {
  await Note.destroy({ where: {} });
  await User.destroy({ where: {} });
});

describe('User Routes', () => {
  test('Register user with missing fields → 400', async () => {
    const res = await request(app).post('/register').send({ email: 'test@test.com' });
    expect(res.statusCode).toBe(400);
  });

  test('Register user with password mismatch → 400', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@test.com', password: '123456', passwordConfirm: '654321' });
    expect(res.statusCode).toBe(400);
  });

  test('Register user successfully → 201', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@test.com', password: '123456', passwordConfirm: '123456' });
    expect(res.statusCode).toBe(201);
    expect(res.body.userId).toBeDefined();
    userId = res.body.userId;
  });

  test('Register duplicate email → 400', async () => {
    const res = await request(app)
      .post('/register')
      .send({ email: 'test@test.com', password: '123456', passwordConfirm: '123456' });
    expect(res.statusCode).toBe(400);
  });

  test('Login with missing fields → 400', async () => {
    const res = await request(app).post('/login').send({ email: 'test@test.com' });
    expect(res.statusCode).toBe(400);
  });

  test('Login with invalid password → 401', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
  });

  test('Login successfully → 200', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test('Forgot password with missing email → 400', async () => {
    const res = await request(app).post('/forgot-password').send({});
    expect(res.statusCode).toBe(400);
  });

  test('Forgot password with valid email → 200', async () => {
    const res = await request(app)
      .post('/forgot-password')
      .send({ email: 'test@test.com' });
    expect(res.statusCode).toBe(200);
  });

  test('Reset password with missing fields → 400', async () => {
    const res = await request(app).post('/reset-password').send({});
    expect(res.statusCode).toBe(400);
  });

  test('Reset password with valid fields → 200', async () => {
    const res = await request(app)
      .post('/reset-password')
      .send({ email: 'test@test.com', newPassword: '654321', newPasswordConfirm: '654321' });
    expect(res.statusCode).toBe(200);
  });
});

describe('Notes Routes', () => {
  test('Access protected route without token → 401', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(401);
  });

  test('Get notes when user has none → returns empty array', async () => {
    const res = await request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('Create note with empty title/description → 400', async () => {
    const res = await request(app)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '', description: '' });
    expect(res.statusCode).toBe(400);
  });

  test('Create note successfully → 201', async () => {
    const res = await request(app)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Note', description: 'Hello World' });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    noteId = res.body.id;
  });

  test('Update note → 200', async () => {
    const res = await request(app)
      .put(`/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Note' });
    expect(res.statusCode).toBe(200);
  });

  test('Update note of another user → 403', async () => {
    // Create second user
    const userRes = await request(app)
      .post('/register')
      .send({ email: 'other@test.com', password: '123456', passwordConfirm: '123456' });
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'other@test.com', password: '123456' });
    const otherToken = loginRes.body.token;

    const res = await request(app)
      .put(`/${noteId}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ title: 'Hacked' });
    expect(res.statusCode).toBe(403);
  });

  test('Delete note → 200', async () => {
    const res = await request(app)
      .delete(`/${noteId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  test('Delete note of another user → 403', async () => {
    // Note has been deleted, so recreate
    const createRes = await request(app)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Another Note', description: 'Test' });
    const newNoteId = createRes.body.id;

    // Other user token
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'other@test.com', password: '123456' });
    const otherToken = loginRes.body.token;

    const res = await request(app)
      .delete(`/${newNoteId}`)
      .set('Authorization', `Bearer ${otherToken}`);
    expect(res.statusCode).toBe(403);
  });
});
