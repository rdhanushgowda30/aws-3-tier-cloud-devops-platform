const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');

test('health endpoint returns UP', async () => {
  const server = spawn(process.execPath, ['app.js'], {
    env: { ...process.env, PORT: '3100' },
    stdio: 'ignore'
  });

  try {
    let response;

    for (let i = 0; i < 30; i++) {
      try {
        response = await fetch('http://127.0.0.1:3100/health');
        break;
      } catch {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    assert.ok(response, 'Application did not start');
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'UP' });
  } finally {
    server.kill();
  }
});
