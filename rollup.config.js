import path from 'path';
import css from 'rollup-plugin-css-only';
import html from 'rollup-plugin-html';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/main.js',
    format: 'iife', // Formato para uso en el navegador
    sourcemap: true
  },
  plugins: [
    css({ output: 'dist/style.css' }),
    html({
      inject: {
        injectTo: 'head',
        // Aquí puedes inyectar el CSS y otros archivos si es necesario
        tag: '<link rel="stylesheet" href="style.css">'
      }
    }),
    typescript()
  ],
  watch: {
    clearScreen: false
  }
};
