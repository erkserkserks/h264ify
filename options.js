// Saves options to chrome.storage
function save_options() {
  var enable = document.getElementById('enable').checked;
  var block_60fps = document.getElementById('block_60fps').checked;
  var battery_only = document.getElementById('battery_only').checked;
  chrome.storage.local.set({
    enable: enable,
    block_60fps: block_60fps,
    battery_only: battery_only,
  });
}

// Restores checkbox state using the options stored in chrome.storage.
function restore_options() {
  // Use default value enable = true and block_60fps = false
  chrome.storage.local.get({
    enable: true,
    block_60fps: false,
    battery_only: false,
  }, function(options) {
    document.getElementById('enable').checked = options.enable;
    document.getElementById('block_60fps').checked = options.block_60fps;
    document.getElementById('battery_only').checked = options.battery_only;
  });
}

// Restore saved options when extension is loaded
document.addEventListener('DOMContentLoaded', restore_options);

// Save options when checkboxes are clicked
var checkboxes = document.getElementsByClassName('checkbox');
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', save_options)
}

// l10n
for (let element of document.querySelectorAll('[data-l10n-id]')) {
  element.textContent = chrome.i18n.getMessage(element.dataset.l10nId);
}
