/* eslint-disable @typescript-eslint/no-var-requires */
const { appendFileSync } = require('fs');
const args = process.argv.slice(2)[0];
const nameFile = args.replace('--name=', '');
const exportFileName = "export * from './" + nameFile + "';";

appendFileSync(
  './src/infra/database/entities/index.ts',
  exportFileName + '\n',
  'utf-8',
);
