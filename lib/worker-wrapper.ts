import type { ModelResult } from './index';
import Worker from './worker?worker&inline';

interface CommonWorker {
  postMessage(message: any): void;
  terminate(): void;
}

interface BrowserWorker extends CommonWorker {
  onmessage: (e: MessageEvent) => void;
}

export class GuessLangWorker {
  private worker: BrowserWorker;
  private messageId = 0;
  private pendingMessages = new Map<number, {
    resolve: (result: ModelResult[]) => void;
    reject: (error: Error) => void;
  }>();

  constructor() {
    const worker = new Worker();
    worker.onmessage = this.handleMessage.bind(this);
    this.worker = worker as BrowserWorker;
  }

  async runModel(content: string): Promise<ModelResult[]> {
    const id = this.messageId++;
    
    return new Promise((resolve, reject) => {
      this.pendingMessages.set(id, { resolve, reject });
      this.worker.postMessage({ id, content });
    });
  }

  private handleMessage(e: MessageEvent | any) {
    const data = e.data || e;
    const { id, result, error } = data;
    
    const pending = this.pendingMessages.get(id);
    if (pending) {
      this.pendingMessages.delete(id);
      if (error) {
        pending.reject(new Error(error));
      } else {
        pending.resolve(result);
      }
    }
  }

  dispose() {
    this.worker.terminate();
    this.pendingMessages.clear();
  }
} 