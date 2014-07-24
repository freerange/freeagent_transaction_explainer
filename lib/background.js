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
  chrome.tabs.executeScript(null, {file: "jquery-2.1.1.min.js"}, function() {
    chrome.tabs.executeScript(null, {file: "jquery-ui-1.11.0.min.js"}, function() {
      chrome.tabs.executeScript(null, {file: "freeagent-transaction-helper.js"}, function() {
        chrome.tabs.executeScript(null, {code: "FreeAgentTransactionHelper()"});
      });
    });
  });
});
