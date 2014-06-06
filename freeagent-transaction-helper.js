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

  var rules = [
    ['CAMPFIRE', '37 Signals - Campfire', '0', 'Computer Software', true, 'Non-EC'],
    ['GITHUB.COM', 'GitHub - Monthly subscription', '0', 'Computer Software', true, 'Non-EC'],
    ['LINODE.COM', 'Linode - Monthly subscription - Linode 2048', '0', 'Web Hosting', true, 'Non-EC'],
    ['Non-Sterling Transaction Fee', 'Non Sterling Transaction Fee', '0', 'Bank/Finance Charges', false, 'Non-EC'],
    ['PACT COFFEE', 'Pact Coffee London', '0', 'Sundries', false, 'Non-EC'],
    ['TOTAL CHARGES TO', 'HSBC - Monthly account maintenance fee', '0', 'Bank/Finance Charges', false, 'Non-EC'],
    ['SVCSAPPS_G', 'Google Apps for Business', '0', 'Computer Software', true, 'EC Services'],
    ['HARMONIA.IO', 'Harmonia - Monthly subscription', '0', 'Computer Software', true, 'Non-EC']
  ]

  var tryToExplainTransaction = function() {
    var unexplainedTransactionText = $('.transaction.unexplained').text();

    if (unexplainedTransactionText) {
      $(rules).each(function(index, rule) {
        var textToMatch = rule[0];
        var description = rule[1];
        var vat = rule[2];
        var category = rule[3];
        var shouldHaveAttachment = rule[4];
        var ecStatus = rule[5];

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
    } else {
      console.log('Ignoring previously explained transactions');
    };
  }

  tryToExplainTransaction();
})();
