import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true, // очищает dist перед сборкой
  minify: false // выставь true, если нужна минификация
});
