var FreeAgentTransactionHelper = function(rulesUrl) {
  var ensureExactlyOne = function(selectedElements) {
    if (selectedElements.length == 0) {
      throw new Error('No elements found for selector.');
    } else if (selectedElements.length > 1) {
      throw new Error('Multiple elements found for selector.');
    };
  };

  var selectOption = function(selector, value) {
    ensureExactlyOne($(selector));
    var options = $('option', selector);
    var selectedOption = options.filter(function() {
      return ($(this).text() == value);
    });
    ensureExactlyOne(selectedOption);
    selectedOption.prop('selected', true);
  };

  var highlight = function(selector) {
    var elements = $(selector);
    ensureExactlyOne(elements);
    elements.css('border-color', 'red');
  };

  var handleManualVAT = function(value) {
    var manualSalesTaxGroup = $('form#bank_account_entry span.sales_tax .manual');
    if (value == 'Amount...') {
      manualSalesTaxGroup.show();
      var manualSalesTaxSelector = '#purchase_sales_tax_amount:first-of-type';
      manualSalesTaxGroup.find(manualSalesTaxSelector).val('???');
      highlight(manualSalesTaxSelector);
    } else {
      manualSalesTaxGroup.hide();
    }
  }

  var setVAT = function(value) {
    var selector = '#purchase_sales_tax_rate';
    selectOption(selector, value);
    handleManualVAT(value);
    highlight(selector);
  };

  var setEcStatus = function(value) {
    var ecStatusOptions = {
      'UK/Non-EC': '#ec_status_non_ec',
      'EC Goods': '#ec_status_goods',
      'EC Services': '#ec_status_services'
    };

    var ecStatusSelector = ecStatusOptions[value];
    var ecStatusCheckbox = $(ecStatusSelector);
    ensureExactlyOne(ecStatusCheckbox);
    ecStatusCheckbox.prop('checked', true);
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

  var displayAttachmentMessage = function(shouldHaveAttachment) {
    var messageContainer = $('<span>');
    if (shouldHaveAttachment) {
      $(messageContainer).text('Now upload an attachment!');
      $(messageContainer).css('color', '#f00');
    } else {
      $(messageContainer).text('No attachment required');
    }

    var attachmentFormLegend = $('#attachment_form legend');
    ensureExactlyOne(attachmentFormLegend);
    attachmentFormLegend.append(' - ', messageContainer);
    highlight(messageContainer);
  }

  var tryToExplainTransaction = function() {
    var unexplainedTransactionText = $('.transaction.unexplained').text();
    if (unexplainedTransactionText) {
      processRules(rulesUrl, unexplainedTransactionText);
      $('.transaction.unexplained').removeClass('unexplained');
    }
  }

  var displayNoMatchMessage = function() {
    var pageTitle = $('#main_title_innards h1');
    var noMatchMessage = $('<span>No matching rules found</span>');
    noMatchMessage.css('color', '#f00');
    pageTitle.append(' - ', noMatchMessage);
    highlight(noMatchMessage);
  }

  var processRules = function(rulesURL, unexplainedTransactionText) {
    $.getJSON(rulesURL, function(rules) {
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

      try {
        setVAT(rule.vat);
        setEcStatus(rule.ecStatus);
        setCategory(rule.category);
        setDescription(rule.description);
        displayAttachmentMessage(rule.shouldHaveAttachment);
      } catch(e) {
        console.log(e.stack);
        alert([e, 'See console for details.'].join(' '));
      }

      return true;
    };
    return false;
  }

  tryToExplainTransaction();
};
