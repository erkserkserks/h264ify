// Register inject.js to be run on Youtube pages.
// This way of registration is used instead of registering in manifest.json
// because this way is supported by Chrome 109, the final version of Chrome
// released for Windows 7 and 8.
// See https://stackoverflow.com/a/72607832
chrome.runtime.onInstalled.addListener(async () => {
  const scripts = [{
    id: 'inject',
    js: ['src/inject/inject.js'],
    matches: [
      "*://*.youtube.com/*",
      "*://*.youtube-nocookie.com/*",
      "*://*.youtu.be/*"
    ],
    allFrames: true,
    runAt: 'document_start',
    world: 'MAIN',
  }];
  const ids = scripts.map(s => s.id);
  await chrome.scripting.unregisterContentScripts({ids}).catch(() => {});
  await chrome.scripting.registerContentScripts(scripts).catch(() => {});
});