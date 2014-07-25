chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { schemes: ['https'], hostSuffix: 'freeagent.com', pathSuffix: '/bank_account_entries/new' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get('rulesUrl', function(items) {
    chrome.tabs.executeScript(null, {code: "FreeAgentTransactionHelper('" + items.rulesUrl + "');"});
  });
});
