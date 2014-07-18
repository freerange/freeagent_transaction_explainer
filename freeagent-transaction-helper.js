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
    { 'textToMatch': 'CAMPFIRE', 'description': '37 Signals - Campfire', 'vat': '0', 'category': 'Computer Software', 'shouldHaveAttachment': true, 'ecStatus': 'Non-EC' },
    { 'textToMatch': 'GITHUB.COM', 'description': 'GitHub - Monthly subscription', 'vat': '0', 'category': 'Computer Software', 'shouldHaveAttachment': true, 'ecStatus': 'Non-EC' },
    { 'textToMatch': 'LINODE.COM', 'description': 'Linode - Monthly subscription - Linode 2048', 'vat': '0', 'category': 'Web Hosting', 'shouldHaveAttachment': true, 'ecStatus': 'Non-EC' },
    { 'textToMatch': 'Non-Sterling Transaction Fee', 'description': 'Non Sterling Transaction Fee', 'vat': '0', 'category': 'Bank/Finance Charges', 'shouldHaveAttachment': false, 'ecStatus': 'Non-EC' },
    { 'textToMatch': 'Pact Coffee', 'description': 'Pact Coffee London', 'vat': '0', 'category': 'Sundries', 'shouldHaveAttachment': false, 'ecStatus': 'Non-EC' },
    { 'textToMatch': 'TOTAL CHARGES TO', 'description': 'HSBC - Monthly account maintenance fee', 'vat': '0', 'category': 'Bank/Finance Charges', 'shouldHaveAttachment': false, 'ecStatus': 'Non-EC' },
    { 'textToMatch': 'SVCSAPPS_G', 'description': 'Google Apps for Business', 'vat': '0', 'category': 'Computer Software', 'shouldHaveAttachment': true, 'ecStatus': 'EC Services' },
    { 'textToMatch': 'HARMONIA.IO', 'description': 'Harmonia - Monthly subscription', 'vat': '0', 'category': 'Computer Software', 'shouldHaveAttachment': true, 'ecStatus': 'Non-EC' },
    { 'textToMatch': 'SKY DIGITAL', 'description': 'Sky Digital - Broadband', 'vat': '20', 'category': 'Internet & Telephone', 'shouldHaveAttachment': true, 'ecStatus': 'Non-EC' }
  ]

  var tryToExplainTransaction = function() {
    var unexplainedTransactionText = $('.transaction.unexplained').text();

    if (unexplainedTransactionText) {
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
    } else {
      console.log('Ignoring previously explained transactions');
    };
  }

  tryToExplainTransaction();
})();
