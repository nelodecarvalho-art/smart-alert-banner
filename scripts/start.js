import { spawn, spawnSync } from 'child_process';

const migrate = spawnSync('node', ['./node_modules/.bin/prisma', 'migrate', 'deploy'], {
  stdio: 'inherit',
  env: process.env,
});

if (migrate.status !== 0) {
  console.error('prisma migrate deploy failed, aborting start');
  process.exit(migrate.status ?? 1);
}

const env = { ...process.env, HOST: '0.0.0.0' };

const serve = spawn('./node_modules/.bin/react-router-serve', ['./build/server/index.js'], {
  stdio: 'inherit',
  env,
});

process.on('SIGTERM', () => serve.kill('SIGTERM'));
process.on('SIGINT', () => serve.kill('SIGINT'));
serve.on('exit', (code) => process.exit(code ?? 0));
