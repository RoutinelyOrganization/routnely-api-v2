#!/bin/sh

npm run cti create './src/adapters' -- -i '*spec.ts' -b &&
npm run cti create './src/configs' -- -i '*spec.ts' -b &&
npm run cti create './src/domain' -- -i '*spec.ts' -b &&
npm run cti create './src/factories' -- -i '*spec.ts' -b &&
npm run cti create './src/infra' -- -i '*spec.ts' -b &&
npm run cti create './src/presentation' -- -i '*spec.ts' -b &&
npm run cti create './src/shared' -- -i '*spec.ts' -b &&
npm run cti create './src/usecases' -- -i '*spec.ts' -b