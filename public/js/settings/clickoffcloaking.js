let isTitleAndFaviconEnabled = JSON.parse(localStorage.getItem('titleAndFaviconEnabled')) ?? false;

const originalTitle = document.title;
const originalFavicon = getFavicon();

document.getElementById('toggleTitleAndFavicon').checked = isTitleAndFaviconEnabled;

document.getElementById('toggleTitleAndFavicon').addEventListener('change', function () {
    isTitleAndFaviconEnabled = this.checked;
    localStorage.setItem('titleAndFaviconEnabled', JSON.stringify(isTitleAndFaviconEnabled));

    if (isTitleAndFaviconEnabled) {
        alert('Clickoff Cloaking enabled.');
    } else {
        alert('Clickoff Cloaking disabled.');
        resetTitleAndFavicon();
    }
});

document.addEventListener('visibilitychange', function () {
    if (isTitleAndFaviconEnabled) {
        if (document.hidden) {
         
            document.title = 'Google Slides';
            changeFavicon('/images/settings-images/googleslides.ico');
        } else {
          
            resetTitleAndFavicon();
        }
    }
});

window.addEventListener('blur', function () {
    if (isTitleAndFaviconEnabled) {
        document.title = 'Google Slides';
        changeFavicon('/images/settings-images/googleslides.ico');
    }
});

window.addEventListener('focus', function () {
    if (!document.hidden) {
        resetTitleAndFavicon();
    }
});

function resetTitleAndFavicon() {
    document.title = originalTitle;
    changeFavicon(originalFavicon);
}

function getFavicon() {
    const favicon = document.querySelector('link[rel="icon"]');
    return favicon ? favicon.href : '';
}

function changeFavicon(url) {
    let favicon = document.querySelector('link[rel="icon"]');

    if (favicon) {
        favicon.href = url;
    } else {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = url;
        document.head.appendChild(favicon);
    }
}
