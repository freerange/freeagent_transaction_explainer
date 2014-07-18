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
    var rulesURL = 'https://rawgit.com/freerange/free_agent_transaction_explainer/master/rules.json';
    processRules(rulesURL);
  }

  var processRules = function(rulesURL) {
    $.getJSON(rulesURL, function(rules) {
      var unexplainedTransactionText = $('.transaction.unexplained').text();
      $(rules).each(function(index, rule) {
        return process(rule, unexplainedTransactionText);
      });
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

      return false; // We don't need to continue having found a match
    };
    return true;
  }

  tryToExplainTransaction();
})();
