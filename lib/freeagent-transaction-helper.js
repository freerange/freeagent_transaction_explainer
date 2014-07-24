(function() {
  var selectOption = function(selector, value) {
    var options = $('option', selector);
    options.filter(function() {
      return ($(this).text() == value);
    }).prop('selected', true);
  };

  var highlight = function(selector) {
    $(selector).effect('highlight', 1500);
  };

  var setVAT = function(value) {
    var selector = '#purchase_sales_tax_rate';
    selectOption(selector, value);
    highlight(selector);
  };

  var setEcStatus = function(value) {
    var ecStatusOptions = {
      'Non-EC': '#bank_account_entry_ec_status_',
      'EC Goods': '#bank_account_entry_ec_status_2',
      'EC Services': '#bank_account_entry_ec_status_1'
    };

    var ecStatusSelector = ecStatusOptions[value];
    $(ecStatusSelector).prop('checked', true);
    highlight('#ec_status_options');
  };

  var setCategory = function(value) {
    var selector = $('#spending_category');
    selectOption(selector, value);
    highlight(selector);
  };

  var setDescription = function(value) {
    var selector = '#description';
    var descriptionField = $(selector);
    descriptionField.val(value);
    highlight(selector);
  };

  var promptForAnAttachment = function() {
    var selector = '#attachment_form h2';
    $(selector).text('Now upload an attachment!');
    $(selector).css('color', '#f00');
    highlight(selector);
  }

  var tryToExplainTransaction = function() {
    if (window.rulesUrl) {
      processRules(window.rulesUrl);
    } else {
      chrome.storage.sync.get('rulesUrl', function(items) {
        processRules(items.rulesUrl);
      });
    };
  }

  var displayNoMatchMessage = function() {
    var pageTitle = $('#main_title_innards h1');
    var noMatchMessage = $('<span>No matching rules found</span>');
    noMatchMessage.css('color', '#f00');
    pageTitle.append(' - ', noMatchMessage);
    highlight(noMatchMessage);
  }

  var processRules = function(rulesURL) {
    $.getJSON(rulesURL, function(rules) {
      var unexplainedTransactionText = $('.transaction.unexplained').text();
      var matchFound = false;
      $(rules).each(function(index, rule) {
        matchFound = process(rule, unexplainedTransactionText);
        if (matchFound) { return false }; // We don't need to continue having found a match
      });
      if (!matchFound) { displayNoMatchMessage() }
    }).fail(function() {
      alert("No rules found.\n\nMake sure you've set the rules URL in the extension options to point to some valid JSON.")
    });
  };

  var process = function(rule, unexplainedTransactionText) {
    console.log('Testing: ' + rule.textToMatch);
    if (unexplainedTransactionText.match(rule.textToMatch)) {
      console.log('Found: ' + rule.description);

      setVAT(rule.vat);
      setEcStatus(rule.ecStatus);
      setCategory(rule.category);
      setDescription(rule.description);
      if (rule.shouldHaveAttachment) {
        promptForAnAttachment();
      };

      return true;
    };
    return false;
  }

  tryToExplainTransaction();
})();
