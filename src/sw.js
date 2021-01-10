import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';

setupRouting();

const filesToCache = getFiles();

// filesToCache.push({ url: '/assets/favicon.png', revision: null });

setupPrecaching(filesToCache);
