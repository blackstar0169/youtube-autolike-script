// ==UserScript==
// @name         YouTube autolike
// @namespace    https://github.com/blackstar0169/youtube-autolike-script
// @version      1.3
// @description  Auto-like YouTube video if you are subscribed to the author's channel.
// @author       blackstar0169
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var watcher = null;
    var likeSelector = '#info-contents #menu ytd-toggle-button-renderer:first-child > a';
    var subscribeSelector = '.ytd-subscribe-button-renderer';

    // Check if the video is already liked
    function isLiked() {
        var likeBtn = document.querySelector(likeSelector);
        return likeBtn ? likeBtn.querySelector(':scope > .style-default-active') != null : false;
    }

    function autoLike() {
        var subscribeBtn = document.querySelector(subscribeSelector + '[subscribed]');

        // If the button exsits, the user is subscribed to this channel
        if (subscribeBtn) {
            var likeBtn = document.querySelector(likeSelector);

            if (likeBtn && !isLiked()) {
                likeBtn.click();
                return true;
            }
        }

        return false;
    }

    // Watch untile the like button has or has been pressed
    function startWatcher() {
        if (watcher === null) {
            watcher = setInterval(function () {
                if (document.querySelector(subscribeSelector)) {
                    if (isLiked() || autoLike()) {
                        clearInterval(watcher);
                        watcher = null;
                    }
                }
            }, 1000);
        }
    }

    // Wait for the interface load event
    window.addEventListener("yt-navigate-finish", startWatcher, true);
})();
