// eslint-disable-next-line node-core/require-common-first
import { buildType } from '../../common/index.mjs';
import assert from 'node:assert';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// binding.node
{
  const bindingPath = require.resolve(`./build/${buildType}/binding.node`);
  const { default: binding, 'module.exports': exports } = await import(bindingPath);
  assert.strictEqual(binding, exports);
  assert.strictEqual(binding.hello(), 'world');

  const bindingRequire = require(bindingPath);
  assert.strictEqual(binding, bindingRequire);
  assert.strictEqual(binding.hello, bindingRequire.hello);

  // Test multiple loading of the same addon.
  // ESM cache can not be removed.
  delete require.cache[bindingPath];
  const { default: rebinding } = await import(bindingPath);
  assert.strictEqual(rebinding.hello(), 'world');
  assert.strictEqual(binding.hello, rebinding.hello);
}

// binding-export-default.node
{
  const bindingPath = require.resolve(`./build/${buildType}/binding-export-default.node`);
  const ns = await import(bindingPath);

  // As same as ESM-import-CJS, the default export is the value of `module.exports`.
  assert.strictEqual(ns.default, ns['module.exports']);
  assert.strictEqual(ns.default.default(), 'hello world');

  const bindingRequire = require(bindingPath);
  assert.strictEqual(ns.default, bindingRequire);
}

// binding-export-primitive.node
{
  const bindingPath = require.resolve(`./build/${buildType}/binding-export-primitive.node`);
  const ns = await import(bindingPath);

  // As same as ESM-import-CJS, the default export is the value of `module.exports`.
  assert.strictEqual(ns.default, ns['module.exports']);
  assert.strictEqual(ns.default, 'hello world');
}
