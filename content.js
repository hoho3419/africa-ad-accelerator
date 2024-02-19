(function () {

  // 유튜브 Checks for ads and manipulates the video or uses skip button if present
  function YThandleVideoAd() {
    const video = document.querySelector('video');
    const adElement = document.querySelector('.video-ads.ytp-ad-module');
    // Support for Hulu
    const adVideo = document.querySelector('#ad-video-player');
    if (video && adElement && adElement.children.length > 0) {
      muteAndSpeedUp(video, 16.0)
    }
    // Skip button seems to be acessible at initialization, if its ever present
    const skipButton = document.querySelector('.ytp-ad-skip-button-modern.ytp-button');
    if (skipButton) {
      skipButton.click();
      console.log('유튜브 광고 스킵 버튼 클릭');
    }
    if (adVideo) {
      muteAndSpeedUp(adVideo, 15.0);
      // const ad = document.querySelector('.video-stream.html5-main-video'); video-stream html5-main-video
    }
  } 
  // 네이버 TV and 치지직
  function NTVhandleVideoAd() {
    const skipButton = document.querySelector('.btn_skip');
    if (skipButton) {
      skipButton.click();
      console.log('네이버 광고 스킵 버튼 클릭');
    }
  }
  // 아프리카 TV
  function AFTVhandleVideoAd() {
    const vi = document.getElementById('livePlayer');
    const ad = document.getElementById('pipMedia');
    const a = document.querySelector('.da_area');

    if(ad.style.display !== 'none'){
      ad.remove();
      a.remove();
      vi.play();
    }
  }

  function muteAndSpeedUp(videoElement, playbackRate) {
    videoElement.muted = true;
    videoElement.playbackRate = playbackRate;
  }

  function initializeAdHandling() {
    const url = window.location.origin;
    let fn;

    if(url === 'https://www.youtube.com'){ // 유튜브
      YThandleVideoAd();
      fn = YThandleVideoAd;
    }
    else if(url === 'https://tv.naver.com'){ // 네이버 티비
      NTVhandleVideoAd();
      fn = NTVhandleVideoAd;
    }
    else if(url === 'https://chzzk.naver.com'){ // 치지직 
      NTVhandleVideoAd()
      fn = NTVhandleVideoAd;
    }
    else if(url === 'https://www.afreecatv.com'){ // 아프리카
      AFTVhandleVideoAd()
      fn = AFTVhandleVideoAd;
    }

    const observer = new MutationObserver(fn);
    observer.observe(document.body, { childList: true, subtree: true });
  }
  // Delay before executing the script (required for Hulu)
  setTimeout(initializeAdHandling, 2000);
})();