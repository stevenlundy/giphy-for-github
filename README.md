# Giphy for GitHub
This is a Chrome extension that gives you the ability to easily add gifs from giphy into pull request comments.

## Adding to Chrome
You can find the extension in the [Chrome web store](https://chrome.google.com/webstore/detail/giphy-for-github/njpbcacdkcomjpddllidghnpjjdjbfoh)!

If you want to use the extension with GitHub Enterprise, you can pack your own version of the extension

1. Download the repo to a folder on your computer
1. add your enterprise URL (something like `http://github.companyname.com/*`) to the matches list in `manifest.json`
1. Go to chrome://extensions/
1. Enable developer mode
1. Click load unpacked extension...
1. Navigate to the directory where you downloaded the repo

## Using the extension
There are three ways to use the extension.

### Insert random giphy
Put your cursor where you want to insert the giphy and press the GIF button.

![random](https://cloud.githubusercontent.com/assets/4694092/13901134/38e4b60c-edd7-11e5-956c-4cb1bdb4bc63.gif)

### Insert giphy based on a word or phrase
Type a word or phrase that you want giphy'd.
Select the text and press the GIF button.

![phrase](https://cloud.githubusercontent.com/assets/4694092/13901133/38e46d96-edd7-11e5-967e-d1340df1ec68.gif)

### Insert specific giphy by id
Paste the id of the giphy you want.
Select the text and press the GIF button.

