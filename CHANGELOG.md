# Changelogs

## 1.0

- First version of the script

## 1.1

- Fix the issue when the like button was not clicked if you quickly go on fullscreen or if
it doesn't have time to find the like button in the DOM.

- The script is now on my Github page.

## 1.2

- Change the match meta from "https://www.youtube.com/watch*" to "https://www.youtube.com/*" because
- YT use a JS router and the script was not loaded if you go to a video from the YT home page.

## 1.3

- Change the like button query selector to match the new one.
- Better page navigation handeling.

## 1.4

- Change the query selector of the subscribe button to match the good one that is displayed and check its
visibility. That fix the issue that could like a video even if you are not subscribed to the channel.
- Update changelog layout

## 1.5

- Update code to make it works with the new YT interface

## 1.6

- Update like button query selector to make it works with the new YT interface

## 1.7

- Add an option interface
- Add a license

## 1.8

- Fix issue [#1](https://github.com/blackstar0169/youtube-autolike-script/issues/1)
- Update like button query selector to make it works with the new YT interface
- Change the MonkeyConfig script source for my forked one to fix security errors
