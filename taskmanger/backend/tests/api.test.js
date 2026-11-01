const request = require('supertest');
const app = require('../server');

describe('Task Management API - CI/CD Automated Test Suite', () => {
  // Test 1: Testing the GET /tasks endpoint returns status 200 (Required by Practical 12)
  test('GET /tasks returns 200', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 2 (Supplementary / Post-lab): Testing Health Check root endpoint GET /
  test('GET / returns health status 200 and online message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('online');
    expect(res.body).toHaveProperty('endpoints');
  });

  // Test 3 (Supplementary / Security verification): Testing 404 for undefined endpoints
  test('GET /non-existent-route returns 404 error', async () => {
    const res = await request(app).get('/api/invalid-route-for-ci-test');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

