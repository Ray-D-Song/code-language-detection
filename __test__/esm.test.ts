import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GuessLang } from '../lib';
import { modelJsonLoaderFunc, weightsLoaderFunc } from './test-utils';

describe('ESM Format Tests', () => {
  let guessLang: GuessLang;

  beforeEach(() => {
    guessLang = new GuessLang({ 
      minContentSize: 0,
      modelJsonLoaderFunc,
      weightsLoaderFunc
    });
  });

  afterEach(() => {
    if (guessLang) {
      guessLang.dispose();
    }
  });

  it('should work with ESM imports', async () => {
    const code = `
      import { useState, useEffect } from 'react';

      export function Counter() {
        const [count, setCount] = useState(0);
        
        useEffect(() => {
          document.title = \`Count: \${count}\`;
        }, [count]);
      }
    `;

    const result = await guessLang.runModel(code);
    expect(result[0].languageId).to.equal('ts');
  });

}); 