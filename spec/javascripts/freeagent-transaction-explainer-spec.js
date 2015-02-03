describe('freeagent-transaction-explainer', function() {
  beforeEach(function() {
    var fixture = $('<div>').attr('id', 'fixture').css('display', 'none')
                  .append($('<div>').addClass('transaction unexplained').text('Pact Coffee'))
                  .append($('<select id="purchase_sales_tax_rate"><option>0%</option></select>'))
                  .append($('<input id="ec_status_non_ec"/>'))
                  .append($('<p id="ec_status_options"/>'))
                  .append($('<select id="spending_category"><option>Sundries</option></select>'))
                  .append($('<input id="description"/>'))
                  .append($('<div>').attr('id', 'attachment_form')
                    .append($('<h2>').text('Attachment')));

    $(document.body).append(fixture);
  });

  it('displays a message when no attachment is required', function() {
    var rules = [{ "textToMatch": "Pact Coffee", "description": "Pact Coffee London", "vat": "0%", "category": "Sundries", "shouldHaveAttachment": false, "ecStatus": "Non-EC" }];
    $.getJSON = function(url, callback) {
      callback(rules);
      return {fail: function() {}};
    };

    FreeAgentTransactionHelper('dummy-rules-url');

    var attachmentHeading = $('#attachment_form h2');
    expect(attachmentHeading.text()).toMatch(/No attachment required/);
  });
});
