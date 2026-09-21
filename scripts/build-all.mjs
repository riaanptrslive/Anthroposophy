import fs from 'node:fs';

// Sync clients on Windows can briefly lock a generated page between build passes.
// Retry only transient write failures, for at most 1.4 seconds per file.
const writeFile = fs.writeFileSync;
fs.writeFileSync = function (...args) {
  for (let attempt = 0; ; attempt++) {
    try { return writeFile.apply(fs, args); }
    catch (error) {
      if (process.platform !== 'win32' || attempt === 7 || !['EBUSY', 'EPERM', 'UNKNOWN'].includes(error.code)) throw error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50 * (attempt + 1));
    }
  }
};
try {
  await import('./build-lessons.mjs');
  await import('./build-biodynamics-companion.mjs');
  await import('./build-study-library.mjs');
  await import('./build-everyday-learning.mjs');
  await import('./build-chapter-curriculum.mjs');
  const {buildLinks} = await import('./link-constitution.mjs');
  buildLinks();
} finally {
  fs.writeFileSync = writeFile;
}
