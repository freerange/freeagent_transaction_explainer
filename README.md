## What's this?

It's a little bit of JavaScript that automates some of the process of us explaining our transactions in FreeAgent.

## Why?

We use [FreeAgent](http://www.freeagent.com/) do our own accounting at [Free Range](http://gofreerange.com/). We have a number of recurring transactions (e.g. monthly subscription to GitHub) that we want to explain in the same way, and manually copying the values from the previously explained transaction is time consuming. Documenting those rules in executable code is much better.

## How do I use it?

While you're more than welcome to use the rules in our version of the project, you'll probably want to fork this repository so that you can customise them.

We currently use it in Chrome through a bookmarklet. To use our rules, add a bookmark and set the name to 'FA transaction explainer' (or similar) and set the URL to `javascript:var s = document.createElement('script'); s.setAttribute('src', 'https://raw.github.com/freerange/free_agent_transaction_explainer/master/freeagent-transaction-helper.js'); document.body.appendChild(s);`

With the bookmarklet added, you should be able to view an unexplained transaction in FreeAgent and (assuming you've got rules that match the transaction) you'll see the form completed automatically.

### Note

You might see the following error JavaScript in Chrome:

    Refused to execute script from 'https://raw.github.com/freerange/free_agent_transaction_explainer/master/freeagent-transaction-helper.js' because its MIME type ('text/plain') is not executable, and strict MIME type checking is enabled.

You can fix the problem by changing the domain in the URL from `raw.github.com` to `rawgit.com`.

### Caching

It looks as if `rawgit.com` sets a `Cache-Control: max-age=300` HTTP header and so you may have to wait up to 5 mins for a newly published version to be loaded by the browser.

## What's it look like?

[Check out the 5 second movie demo](https://docs.google.com/a/gofreerange.com/file/d/0Byppog2awIncRjVnd2M4THlzMVU/edit)

## Why isn't it a...?

### Userscript

I don't really understand how Userscripts work in Chrome (my primary browser). They don't seem to be able to use jQuery that's loaded in the FreeAgent site, and it was proving really hard to load jQuery in the userscript directly. I could've replaced my use of jQuery with plain old JavaScript, but I suspect that would've made it harder to continue working on this script.

### Chrome extension

While it'd be nice to have the script execute on page load (rather than through a bookmarklet), I didn't feel that the additional overhead of learning how to create a Chrome extension was worth it.

## Known limitations

There's a problem with the javascript being hosted on raw.github.com. It would appear that the bookmarklet doesn't get the latest version of the script until you've requested the raw script manually (i.e. by visiting it in a browser). I presume this is because of some caching somewhere along the line.
