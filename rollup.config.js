
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify-es';

const dist = 'dist';

export default {
  input: 'js/scrambler.js',
  output: [
    {
      file: `${dist}/scrambler.cjs.js`,
      format: 'cjs'
    },
    {
      file: `${dist}/scrambler.esm.js`,
      format: 'esm'
    },
    {
      name: 'Scrambler',
      file: `${dist}/scrambler.umd.js`,
      format: 'umd'
    },
    {
      name: 'Scrambler',
      file: `${dist}/scrambler.iife.js`,
      format: 'iife'
    },
    {
      name: 'Scrambler',
      file: `${dist}/scrambler.min.js`,
      format: 'iife'
    }
  ],
  plugins: [
    resolve(),
    eslint(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}