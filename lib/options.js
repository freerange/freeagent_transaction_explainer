function save_options() {
  var rulesUrl = $('#rulesUrl').val();
  chrome.storage.sync.set({ rulesUrl: rulesUrl }, function() {
    var status = $('#status');
    status.text('Options saved.');
    setTimeout(function() {
      status.text('');
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({ rulesUrl: '' }, function(items) {
    $('#rulesUrl').val(items.rulesUrl);
  });
}

$(restore_options);

$('#save').click(save_options);
