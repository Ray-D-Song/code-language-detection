import path from 'path';
import { readFileSync } from 'fs';

export async function modelJsonLoaderFunc() {
  const modelPath = path.join(__dirname, '..', 'model', 'model.json');
  console.log('modelPath', modelPath);
  return JSON.parse(readFileSync(modelPath, 'utf-8'));
}

export async function weightsLoaderFunc() {
  const weightsPath = path.join(__dirname, '..', 'model', 'group1-shard1of1.bin');
  return readFileSync(weightsPath).buffer;
} 