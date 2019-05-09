const dist = 'dist';

export default {
  input: 'js/scramble.js',
  output: [
    {
      file: `${dist}/bundle.cjs.js`,
      format: 'cjs'
    },
    {
      file: `${dist}/bundle.esm.js`,
      format: 'esm'
    },
    {
      name: 'Scrambler',
      file: `${dist}/bundle.umd.js`,
      format: 'umd'
    }
  ]
}