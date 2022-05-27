const { build } = require('esbuild');

build({
  entryPoints: ['./src/index.ts'],
  minify: true,
  platform: 'node',
  bundle: true,
  target: 'node16',
  outfile: 'dist/index.js',
})
  .then((value) => {
    console.info('Build finished, Execute npm start to run the build server');
    if (value.warnings.length) {
      console.warn(value.warnings);
    }
  })
  .catch((err) => {
    console.error('Build failed', err);
    process.exit(1);
  });
