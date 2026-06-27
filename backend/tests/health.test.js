const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

process.env.PORT = '5000';
process.env.MONGODB_URI = 'mongodb://localhost:27017/teem01_test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRES_IN = '1d';

const app = require('../src/app');

test('GET /api/health returns server status', async () => {
  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.message, 'Backend server is running');
});
