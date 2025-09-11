import { fileURLToPath, URL } from 'node:url';

const aliases = {
  '@': fileURLToPath(new URL('../../src', import.meta.url)),
  '#helpers': fileURLToPath(new URL('../../src/shared/helpers', import.meta.url)),
  '#shared': fileURLToPath(new URL('../../src/shared', import.meta.url)),
  '#modules': fileURLToPath(new URL('../../src/modules', import.meta.url)),
  '#app': fileURLToPath(new URL('../../src/app', import.meta.url)),
};

export default aliases;
