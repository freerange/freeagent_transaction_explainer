## Description

A Chrome Extension which explains bank transactions in FreeAgent according to a set of customisable rules.

## Motivation

We use [FreeAgent](http://www.freeagent.com/) to do our book-keeping at [Free Range](http://gofreerange.com/). We have a number of recurring transactions (e.g. monthly subscription to GitHub) that we want to explain in the same way, and manually copying the values from the previously explained transaction is time consuming. Documenting those rules in executable code is much better.

## Installation

* Clone this repository.

* Enable Developer mode in chrome://extensions.

* Click "Load unpacked extension" and choose the "lib" folder in your local copy of the repository.

* Take a copy of rules.json from this repository, amend them as appropriate and host them somewhere publicly accessible (e.g. GitHub, GitHub Gist or AWS S3).

* Configure the extension with the URL of the rules you're hosting, by using the "Options" link under chrome://extensions.

## Usage

* Visit an unexplained bank transaction on FreeAgent and click the FreeAgent icon that appears in the Chrome Omnibox.

* If you open the console in the Chrome developer tools then you should see each rule being checked for a match. If a match is found then you'll see the transaction being updated.

[Check out the 5 second movie demo](https://docs.google.com/a/gofreerange.com/file/d/0Byppog2awIncRjVnd2M4THlzMVU/edit)

*NOTE.* This video is of the older bookmarklet version. We plan to update it soon.

You can also trigger the extension to explain a transaction using the keyboard shortcut which by default is `Command+E` on a Mac or `Ctrl+E` on a PC. You can change the key combination by clicking the [Keyboard Shortcuts](chrome://extensions/configureCommands) link at the bottom of the [Chrome Extensions](chrome://extensions) page and setting the "Activate the extension" value for "FreeAgent Transaction Explainer".

## License

© 2014 Go Free Range Ltd.

The FreeAgent Transaction Explainer is released under the [MIT License](https://github.com/freerange/recap/blob/master/LICENSE).
