import { readFileSync, writeFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';

async function encode() {
  const binContent = readFileSync('./model/group1-shard1of1.bin');
  const base64 = Buffer.from(binContent).toString('base64');
  writeFileSync('./lib/bin.ts', `export default \`${base64}\``);
}

encode();