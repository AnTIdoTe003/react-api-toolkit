import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';


const pkg = JSON.parse(readFileSync(resolvePath(__dirname, 'package.json'), 'utf-8'));

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    }
  ],
  external: ['react', 'axios'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
    }),
  ]
};
