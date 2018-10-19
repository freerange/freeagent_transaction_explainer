## FreeAgent Transaction Explainer [![build status](https://secure.travis-ci.org/freerange/freeagent_transaction_explainer.png)](https://secure.travis-ci.org/freerange/freeagent_transaction_explainer)

A Chrome Extension which explains bank transactions in FreeAgent according to a set of customisable rules.

Note: This extension was developed by _Go Free Range Ltd_ which is not affiliated to _FreeAgent Central Ltd_ and we do not mean to imply that they endorse it in any way.

## Motivation

We use [FreeAgent](http://www.freeagent.com/) to do our book-keeping at [Free Range](http://gofreerange.com/). We have a number of recurring transactions (e.g. monthly subscription to GitHub) that we want to explain in the same way, and manually copying the values from the previously explained transaction is time consuming. Documenting those rules in executable code is much better.

## Installation

* [Install the extension](https://chrome.google.com/webstore/detail/freeagent-transaction-exp/lgpgdkoopbcppnipcnbodcobjmhagmim?hl=en-US&gl=GB) from the Chrome Web Store.

* Take a copy of rules.json from this repository, amend them as appropriate and host them somewhere publicly accessible (e.g. GitHub, GitHub Gist or AWS S3). The rules JSON should be an array of rule objects like this:

```javascript
{
  "textToMatch": "GITHUB.COM", // used to match the bank transaction description

  // if the rule matches then the following properties come into play:-

  "description": "GitHub - Monthly subscription", // used to set the explanation Description
  "category": "Computer Software", // used to set the Category

  "vat": "0", // used to set the VAT rate
  "ecStatus": "Non-EC", // used to set the EC Status

  "shouldHaveAttachment": true // used to decide whether to prompt the user to upload an attachment
}
```

* If you are a member of Go Free Range, you will want to use the `rules.json` file in the `master` branch of this repo which is available from this URL (via GitHub Pages): https://freerange.github.io/freeagent_transaction_explainer/rules.json

* Configure the extension with the URL of the rules you're hosting, by finding the extension under chrome://extensions, clicking on the "Details" button for the extension, clicking on the "Extension options" link, filling in the value in the "Rules URL" field, and clicking the "Save" button.

## Usage

* Visit an unexplained bank transaction on FreeAgent and click the FreeAgent icon that appears in the Chrome Omnibox.

* If you open the console in the Chrome developer tools then you should see each rule being checked for a match. If a match is found then you'll see the transaction being updated.

[Check out the 7 second movie demo](https://vimeo.com/102040575)

You can also trigger the extension to explain a transaction using the keyboard shortcut which by default is `Command+E` on a Mac or `Ctrl+E` on a PC. You can change the key combination by clicking the [Keyboard Shortcuts](chrome://extensions/configureCommands) link at the bottom of the [Chrome Extensions](chrome://extensions) page and setting the "Activate the extension" value for "FreeAgent Transaction Explainer".

## Development

* Clone this repository.

* Enable Developer mode in chrome://extensions.

* Click "Load unpacked extension" and choose the "lib" folder in your local copy of the repository.

* Take a copy of rules.json from this repository, amend them as appropriate and host them somewhere publicly accessible (e.g. GitHub, GitHub Gist or AWS S3).

* Configure the extension with the URL of the rules you're hosting, by using the "Options" link under chrome://extensions.

* To run all the specs, run `bundle install` followed by `rake`.

## License

© 2014 Go Free Range Ltd.

The FreeAgent Transaction Explainer is released under the [MIT License](https://github.com/freerange/recap/blob/master/LICENSE).
