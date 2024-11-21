import { GuessLang } from './index';

let guessLang = new GuessLang()

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
