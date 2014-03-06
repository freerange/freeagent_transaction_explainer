## What's this?

It's a little bit of JavaScript that automates some of the process of us explaining our transactions in FreeAgent.

## Why?

We use [FreeAgent](http://www.freeagent.com/) do our own accounting at [Free Range](http://gofreerange.com/). We have a number of recurring transactions (e.g. monthly subscription to GitHub) that we want to explain in the same way, and manually copying the values from the previously explained transaction is time consuming. Documenting those rules in executable code is much better.

## How do I use it?

While you're more than welcome to use the rules in our version of the project, you'll probably want to fork this repository so that you can customise them.

We currently use it in Chrome through a bookmarklet. To use our rules, add a bookmark and set the name to 'FA transaction explainer' (or similar) and set the URL to `javascript:var s = document.createElement('script'); s.setAttribute('src', 'https://raw.github.com/freerange/free_agent_transaction_explainer/master/freeagent-transaction-helper.js'); document.body.appendChild(s);`

With the bookmarklet added, you should be able to view an unexplained transaction in FreeAgent and (assuming you've got rules that match the transaction) you'll see the form completed automatically.
