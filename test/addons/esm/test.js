// Flags: --experimental-addon-modules

// FIXME(legendecas): AddonTestConfiguration does not support '.mjs' extension.
// Eslint complains about ESM syntax in a file with '.js' in 'test/addons'.
'use strict';
const common = require('../../common');

import('./test-esm.mjs')
  .then(common.mustCall(), common.mustNotCall());
