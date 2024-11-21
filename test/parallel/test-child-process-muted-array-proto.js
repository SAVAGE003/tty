'use strict';

const common = require('../common');
const assert = require('node:assert');
const { spawn } = require('node:child_process');

// The UNIX version of this test is enough.
if (common.isWindows) {
  common.skip('This test is enough for Unix-like systems');
  return;
}

// Refs: https://github.com/nodejs/node/issues/55932
Object.defineProperty(Array.prototype, '0', {
  set() {
    console.log(123);
  },
  get() {
    return 123;
  }
}, { configurable: true, writable: true });

const cp = spawn('ls');

// Can't use common.mustCall() here because array prototype is mutated.
cp.on('error', (err) => {
  assert.strictEqual(err.code, 'EINVAL');
});
