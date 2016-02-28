// Saves options to chrome.storage
function save_options() {
  var enable = document.getElementById('enable').checked;
  chrome.storage.local.set({
    enable: enable
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
    enable: true
  }, function(items) {
    document.getElementById('enable').checked = items.enable;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
