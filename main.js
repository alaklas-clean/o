<!-- TikTok Pixel Code Start -->
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


  ttq.load('D5009PJC77U5H3D99I6G');
  ttq.page();
}(window, document, 'ttq');
<!-- TikTok Pixel Code End -->

(function(){
  var y = new Date().getFullYear();
  var yf = document.querySelectorAll('#year');
  for(var i=0;i<yf.length;i++) yf[i].textContent = y;

  var loaderWrap = document.getElementById('loader-wrap');
  var progressBar = document.getElementById('progressBar');
  var progressPercent = document.getElementById('progressPercent');
  var site = document.getElementById('site');

  const DURATION = 1200;
  const INTERVAL = 16;
  const TOTAL_STEPS = DURATION / INTERVAL;
  let stepCount = 0;

  var step = function(){
    stepCount++;
    const progress = Math.min(100, (stepCount / TOTAL_STEPS) * 100);
    const roundedProgress = Math.round(progress);

    if(progressBar) progressBar.style.width = progress + '%';
    if(progressPercent) progressPercent.textContent = roundedProgress + '%';

    if(stepCount < TOTAL_STEPS){
      setTimeout(step, INTERVAL);
    } else {
      setTimeout(function(){
        var headerImg = document.querySelector('.brand img');
        if(headerImg) headerImg.classList.add('fly-up');
        document.body.classList.add('show-site');
        loaderWrap.style.transition = 'opacity .6s ease';
        loaderWrap.style.opacity = '0';
        setTimeout(function(){ 
          loaderWrap.style.display = 'none'; 
        }, 600);
      }, 100);
    }
  };
  setTimeout(step, 50);

  function updateLogoTheme() {
    const isLight = document.documentElement.classList.contains('light');
    const logos = document.querySelectorAll('img[data-light][data-dark]');
    logos.forEach(img => {
      img.src = isLight ? img.getAttribute('data-light') : img.getAttribute('data-dark');
    });
  }

  updateLogoTheme();

  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');
  function applyTheme(name){
    if(name === 'light') document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
    localStorage.setItem('site_theme', name);
    if(themeIcon) themeIcon.textContent = (name === 'light') ? '☀️' : '🌙';
    if(themeToggle) themeToggle.setAttribute('aria-pressed', name === 'light');
  }
  var saved = localStorage.getItem('site_theme');
  if(saved) applyTheme(saved);
  else {
    var prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    applyTheme(prefers === 'light' ? 'light' : 'dark');
  }
  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      var cur = document.documentElement.classList.contains('light') ? 'light' : 'dark';
      var next = cur === 'light' ? 'dark' : 'light';
      applyTheme(next);
      setTimeout(updateLogoTheme, 50);
    });
  }
})();

// Attach contact click tracking (was inside DOMContentLoaded)
(function(){
  // 📞 زر الاتصال
  document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
    el.addEventListener("click", function () {
      if (window.ttq) {
        ttq.track('Contact', { method: 'phone' });
      }
    });
  });

  // 💬 زر واتساب
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(el) {
    el.addEventListener("click", function () {
      if (window.ttq) {
        ttq.track('Contact', { method: 'whatsapp' });
      }
    });
  });
})();

