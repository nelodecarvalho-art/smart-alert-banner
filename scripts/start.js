import { spawn } from 'child_process';

// Ensure server binds to all interfaces so Railway can reach it
const env = { ...process.env, HOST: '0.0.0.0' };

const serve = spawn(
  './node_modules/.bin/react-router-serve',
  ['./build/server/index.js'],
  { stdio: 'inherit', env }
);

process.on('SIGTERM', () => serve.kill('SIGTERM'));
process.on('SIGINT', () => serve.kill('SIGINT'));
serve.on('exit', (code) => process.exit(code ?? 0));
