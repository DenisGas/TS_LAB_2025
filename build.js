import * as esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/main.ts'], 
  outfile: 'dist/main.js',      
  bundle: true,                  
  platform: 'node',              
  format: 'esm',               
  sourcemap: true,
}).catch(() => process.exit(1));

console.log('Build done (esbuild).');