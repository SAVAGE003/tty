'use strict';
require('../common');

const { spawnSync } = require('node:child_process');
const assert = require('node:assert');

const result = spawnSync(process.execPath, ['-e', `
  const port = await getPort();
`]);

assert.strictEqual(result.stderr.includes('Top-level await is not supported in CommonJS'), true);
