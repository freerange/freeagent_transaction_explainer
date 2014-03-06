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

  var setCategory = function(value) {
    var selector = $('#other_payment_type');
    selectOption(selector, value);
    highlight(selector);
  };

  var setDescription = function(value) {
    var selector = '#bank_account_entry_description';
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
    ['CAMPFIRE', '37 Signals - Campfire', '0', 'Computer Software', true],
    ['GITHUB.COM', 'GitHub - Monthly subscription', '0', 'Computer Software', true],
    ['LINODE.COM', 'Linode - Monthly subscription - Linode 2048', '0', 'Web Hosting', true],
    ['Non-Sterling Transaction Fee', 'Non Sterling Transaction Fee', '0', 'Bank/Finance Charges', false]
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

        console.log('Testing: ' + textToMatch);
        if (unexplainedTransactionText.match(textToMatch)) {
          console.log('Found: ' + description);

          setVAT(vat);
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
