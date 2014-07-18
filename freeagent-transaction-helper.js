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
    var unexplainedTransactionText = $('.transaction.unexplained').text();

    if (unexplainedTransactionText) {
      $.getJSON(chrome.extension.getURL('/rules.json'), function(rules) {
        $(rules).each(function(index, rule) {
          var textToMatch = rule['textToMatch'];
          var description = rule['description'];
          var vat = rule['vat'];
          var category = rule['category'];
          var shouldHaveAttachment = rule['shouldHaveAttachment'];
          var ecStatus = rule['ecStatus'];

          console.log('Testing: ' + textToMatch);
          if (unexplainedTransactionText.match(textToMatch)) {
            console.log('Found: ' + description);

            setVAT(vat);
            setEcStatus(ecStatus);
            setCategory(category);
            setDescription(description);
            if (shouldHaveAttachment) {
              promptForAnAttachment();
            };

            return false; // We don't need to continue having found a match
          };
        });
      });
    } else {
      console.log('Ignoring previously explained transactions');
    };
  }

  tryToExplainTransaction();
})();
