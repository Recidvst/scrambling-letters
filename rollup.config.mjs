import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { eslint } from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify-es';

const folder = 'dist';

export default {
  input: 'js/scrambler.js',
  output: [
    {
      file: `${folder}/scrambler.cjs.js`,
      format: 'cjs'
    },
    {
      file: `${folder}/scrambler.esm.js`,
      format: 'esm'
    },
    {
      name: 'Scrambler',
      file: `${folder}/scrambler.umd.js`,
      format: 'umd'
    },
    {
      name: 'Scrambler',
      file: `${folder}/scrambler.iife.js`,
      format: 'iife'
    },
    {
      name: 'Scrambler',
      file: `${folder}/scrambler.min.js`,
      format: 'iife'
    }
  ],
  plugins: [
    resolve(),
    eslint({
      include: ["**/*.js", "**/*.ts"],
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}