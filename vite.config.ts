import { LibraryFormats } from 'vite';
import { defineConfig } from 'vite'

// build esm
export default defineConfig(() => {
  const BUILD_TARGET = process.env.BUILD_TARGET || 'esm&umd'

  if (BUILD_TARGET === 'worker') {
    return {
      build: {
        outDir: 'dist/worker',
        target: 'es6',
        assetsDir: '',
        lib: {
          name: 'guesslang-worker',
          entry: './lib/worker-wrapper.ts',
          formats: ['es'] satisfies LibraryFormats[]
        }
      },
      worker: {
        format: 'es' as const,
      },
    }
  }

  return {
    build: {
      outDir: 'dist/lib',
      target: 'es6',
      lib: {
        name: 'guesslang',
        entry: './lib/index.ts',
        formats: ['es', 'umd'] satisfies LibraryFormats[]
      }
    },
  }
})
