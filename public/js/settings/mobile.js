let areAdsDisabled = JSON.parse(localStorage.getItem('adsDisabled'));

if (areAdsDisabled === null) {
    areAdsDisabled = false;
}

if (!areAdsDisabled) {
    enableAds();
}

document.getElementById('toggleAds').addEventListener('change', function () {
    areAdsDisabled = !areAdsDisabled;
    localStorage.setItem('adsDisabled', JSON.stringify(areAdsDisabled));

    if (areAdsDisabled) {
        disableAds();
        alert('Ads Disabled. 😔');
    } else {
        enableAds();
        alert('Ads Enabled.');
    }
});

document.getElementById('toggleAds').checked = !areAdsDisabled;

function enableAds() {
    const adScriptElement = document.createElement('script');
    adScriptElement.type = 'text/javascript';
    adScriptElement.src = '//crockerydestructivespoken.com/88/0e/1a/880e1a89f0863fdfa6aa44da31d955a3.js';
    adScriptElement.async = true;
    document.body.appendChild(adScriptElement);
}

function disableAds() {
    const adScriptElement = document.querySelector('script[src="//crockerydestructivespoken.com/88/0e/1a/880e1a89f0863fdfa6aa44da31d955a3.js"]');
    if (adScriptElement) {
        adScriptElement.remove();
    }
}
