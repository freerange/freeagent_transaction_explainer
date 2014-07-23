## What's this?

It's a Chrome Extension that automates some of the process of us explaining our transactions in FreeAgent.

## Why?

We use [FreeAgent](http://www.freeagent.com/) to do our own accounting at [Free Range](http://gofreerange.com/). We have a number of recurring transactions (e.g. monthly subscription to GitHub) that we want to explain in the same way, and manually copying the values from the previously explained transaction is time consuming. Documenting those rules in executable code is much better.

## How do I use it?

* Clone this repository.

* Enable Developer mode in chrome://extensions.

* Click "Load unpacked extension" and choose the "lib" folder in your local copy of the repository.

* Take a copy of rules.json from this repository, amend them as appropriate and host them somewhere publicly accessible.

  * Serve the rules with the correct Content-Type of `application/json`.

  * Serve the rules with the `Access-Control-Allow-Origin` CORS header set such that requests from *.freeagent.com are allowed.

  * If you host your rules on GitHub then you can use a rawgit.com URL to access them with these headers set. *NOTE.* It looks as if rawgit.com sets a `Cache-Control: max-age=300` HTTP header and so you may have to wait up to 5 mins for a newly published version to be loaded by the browser.

* Configure the extension with the URL of the rules you're hosting, by using the "Options" link under chrome://extensions.

* Visit an unexplained transaction on FreeAgent and click the FreeAgent icon that appears in the Chrome Omnibox.

* If you open the console in the Chrome developer tools then you should see each rule being checked for a match. If a match is found then you'll see the transaction being updated.

## What's it look like?

[Check out the 5 second movie demo](https://docs.google.com/a/gofreerange.com/file/d/0Byppog2awIncRjVnd2M4THlzMVU/edit)

*NOTE.* This video is of the older bookmarklet version. We plan to update it soon.
