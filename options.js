function save_options() {
  var rulesUrl = document.getElementById('rulesUrl').value;
  chrome.storage.sync.set({ rulesUrl: rulesUrl }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({ rulesUrl: '' }, function(items) {
    document.getElementById('rulesUrl').value = items.rulesUrl;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);
