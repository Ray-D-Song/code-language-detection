'use strict';

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const GzipPlugin = require('./utils/gzip-plugin');
const { version } = require('./package.json');

module.exports = function (env, argv) {
  const mode = argv.mode || 'none';
  
  const commonConfig = {
    mode: mode,
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist', 'lib'),
      filename: 'guesslang.min.js',
      libraryTarget: 'umd',
      globalObject: 'this',
      umdNamedDefine: true,
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: {
            banner: false,
          },
          terserOptions: {
            ecma: 6,
            compress: mode === 'production',
            mangle: mode === 'production',
            output: {
              beautify: mode !== 'production',
              comments: false,
              ecma: 6,
            },
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              experimentalWatchApi: true,
            },
          },
          exclude: /\.d\.ts$/,
        },
        {
          test: /group1-shard1of1.bin$/,
          use: 'base64-inline-loader',
        },
        {
          test: /model.json$/,
          type: 'asset/source',
        },
      ],
    },
    plugins: [
      new GzipPlugin({
        header: `/*! guesslang.min.js v${version} */\n`,
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@tensorflow/tfjs': path.resolve(__dirname, 'node_modules', '@tensorflow', 'tfjs', 'dist', 'tf.es2017.js'),
      },
    },
    resolveLoader: {
      alias: {
        'base64-inline-loader': path.resolve(__dirname, 'utils', 'base64-inline-loader', 'index.js'),
      },
    },
    stats: {
      preset: 'errors-warnings',
      assets: true,
      colors: true,
      env: true,
      errorsCount: true,
      warningsCount: true,
      timings: true,
    },
  };

  const umdConfig = {
    ...commonConfig,
    entry: './lib/index.ts',
  };

  const esmConfig = {
    ...commonConfig,
    entry: './lib/index.ts',
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'dist', 'lib'),
      filename: 'guesslang.esm.js',
      library: {
        type: 'module',
      },
    },
  };

  const workerConfig = {
    ...commonConfig,
    entry: './lib/worker.ts',
    output: {
      ...commonConfig.output,
      filename: 'worker.min.js'
    }
  };

  const workerWrapperConfig = {
    ...commonConfig,
    entry: './lib/worker-wrapper.ts',
    output: {
      ...commonConfig.output,
      filename: 'worker-wrapper.min.js'
    }
  };

  return [umdConfig, esmConfig, workerConfig, workerWrapperConfig];
};
