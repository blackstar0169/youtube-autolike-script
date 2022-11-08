// ==UserScript==
// @name         YouTube autolike
// @namespace    https://github.com/blackstar0169/youtube-autolike-script
// @version      1.5
// @description  Auto-like YouTube video if you are subscribed to the author's channel.
// @author       blackstar0169
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var watcher = null;
    var likeSelector = '#segmented-like-button button';
    var subscribeSelector = '#subscribe-button button';

    function getObjectProperty(obj, keyStr) {
        var keys = keyStr.split('.');

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (obj && Array.isArray(obj)) {
                key = parseInt(key);
                if (isNaN(key) || typeof obj[key] === 'undefined') {
                    return undefined;
                }
            } else if (!obj || !obj.hasOwnProperty(key)) {
                return undefined;
            }
            obj = obj[key];
        }
        return obj;
    }

    // Check if the video is already liked
    function isLiked() {
        var btn = document.querySelector(likeSelector);
        return btn ? btn.getAttribute('aria-pressed') == 'true' : false;
    }

    function isSubscribed() {
        var btn = document.querySelector(subscribeSelector);
        return (btn && btn.classList.contains('yt-spec-button-shape-next--tonal')) ||
            getObjectProperty(window.ytInitialPlayerResponse, 'annotations.0.playerAnnotationsExpandedRenderer.featuredChannel.subscribeButton.subscribeButtonRenderer.subscribed');
    }

    // Try to click on the like button. Return true un success
    function autoLike() {
        // If the user is subscribed to this channel
        if (isSubscribed()) {
            var likeBtn = document.querySelector(likeSelector);

            if (likeBtn && !isLiked()) {
                likeBtn.click();
                return true;
            }
        }

        return false;
    }

    // jQuery 3.6.0 implementation of `visible` function
    function isVisible(el) {
        return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
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
