import { GuessLang } from './index';
// import { modelJsonLoaderFunc, weightsLoaderFunc } from '../__test__/test-utils';

let guessLang = new GuessLang()

/**
 * only for unit test
 * const guessLang = new GuessLang({
 *   modelJsonLoaderFunc,
 *   weightsLoaderFunc
 * })
 */

self.onmessage = async (e: MessageEvent) => {
    const { id, content } = e.data;
    
    try {
      const result = await guessLang.runModel(content);
      self.postMessage({ id, result });
    } catch (error) {
      self.postMessage({ 
        id, 
        error: error instanceof Error ? error.message : String(error)
      })
    }
};
