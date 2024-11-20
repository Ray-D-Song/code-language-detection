import { describe, it, expect } from 'vitest';
import '@vitest/web-worker'
import { ModelResult } from '../lib';

declare global {
  var modelJsonLoaderFunc: () => Promise<any>;
  var weightsLoaderFunc: () => Promise<any>;
}

describe('GuessLangWorker Tests', () => {
  const worker = new Worker(new URL('../lib/worker.ts', import.meta.url));

  it('should detect TypeScript code', async () => {
    const code = `
      interface User {
        id: number;
        name: string;
      }
      
      function getUser(id: number): Promise<User> {
        return fetch(\`/api/users/\${id}\`).then(res => res.json());
      }
    `;

    worker.postMessage({
      id: 0,
      content: code,
    });

    const result = await new Promise<ModelResult[]>((resolve, reject) => {
      worker.onmessage = (e) => resolve(e.data.result);
      worker.onerror = (e) => reject(e.error);
    });

    expect(result[0].languageId).to.equal('ts');
  });

  it('should detect Python code', async () => {
    const code = `
def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []
    `;

    worker.postMessage({
      id: 0,
      content: code,
    });

    const result = await new Promise<ModelResult[]>((resolve, reject) => {
      worker.onmessage = (e) => resolve(e.data.result);
      worker.onerror = (e) => reject(e.error);
    });

    expect(result[0].languageId).to.equal('py');
  });
}); 
