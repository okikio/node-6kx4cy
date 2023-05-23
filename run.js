import esbuild from 'esbuild-wasm';
await esbuild.initialize({
  wasmURL: '/node_modules/esbuild-wasm/esbuild.wasm',
});
await esbuild.build({
  target: ['esnext'],
  format: 'esm',
  bundle: true,
  minify: false,
  treeShaking: false,
  platform: 'browser',
  color: true,
  globalName: 'BundledCode',
  logLevel: 'info',
  sourcemap: false,

  stdin: {
    // Ensure input is a string
    contents: `\
// Click Build for the Bundled, Minified & Compressed package size
export { isAfter } from 'date-fns';`,
    loader: 'ts',
    sourcefile: `/input.ts`,
  },

  metafile: true,
  loader: {
    '.png': 'file',
    '.jpeg': 'file',
    '.ttf': 'file',
    '.svg': 'text',
    '.html': 'text',
    '.scss': 'css',
  },
  define: {
    __NODE__: `false`,
    'process.env.NODE_ENV': `"production"`,
  },
  outfile: 'out-wasm.js',
});
