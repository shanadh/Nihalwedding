document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     STATIONERY & THEME SETUP
     ========================================================================== */
  
  // Set target countdown dates
  // Main event is on July 12, 2026, but countdown specifically targets July 11, 2026
  const COUNTDOWN_TARGET = new Date('July 11, 2026 17:00:00').getTime();

  /* ==========================================================================
     COUNTDOWN TIMER
     ========================================================================== */
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = COUNTDOWN_TARGET - now;

    // Element selectors for Hero Countdown (if present) and Dedicated Countdown Section
    const heroDaysVal = document.getElementById('hero-days');
    const heroHoursVal = document.getElementById('hero-hours');
    const heroMinutesVal = document.getElementById('hero-minutes');
    const heroSecondsVal = document.getElementById('hero-seconds');

    const daysVal = document.getElementById('days');
    const hoursVal = document.getElementById('hours');
    const minutesVal = document.getElementById('minutes');
    const secondsVal = document.getElementById('seconds');

    if (distance < 0) {
      // If the countdown is finished, show zeros
      const expiredText = "00";
      if (daysVal) {
        daysVal.innerHTML = expiredText;
        hoursVal.innerHTML = expiredText;
        minutesVal.innerHTML = expiredText;
        secondsVal.innerHTML = expiredText;
      }
      if (heroDaysVal) {
        heroDaysVal.innerHTML = expiredText;
        heroHoursVal.innerHTML = expiredText;
        heroMinutesVal.innerHTML = expiredText;
        heroSecondsVal.innerHTML = expiredText;
      }
      return;
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format numbers to have a leading zero if less than 10
    const formatNum = (num) => (num < 10 ? '0' + num : num);

    // Update Hero Countdown
    if (heroDaysVal) heroDaysVal.innerText = formatNum(days);
    if (heroHoursVal) heroHoursVal.innerText = formatNum(hours);
    if (heroMinutesVal) heroMinutesVal.innerText = formatNum(minutes);
    if (heroSecondsVal) heroSecondsVal.innerText = formatNum(seconds);

    // Update Dedicated Countdown Section
    if (daysVal) daysVal.innerText = formatNum(days);
    if (hoursVal) hoursVal.innerText = formatNum(hours);
    if (minutesVal) minutesVal.innerText = formatNum(minutes);
    if (secondsVal) secondsVal.innerText = formatNum(seconds);
  }

  // Initial call and run every second
  updateCountdown();
  setInterval(updateCountdown, 1000);



  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile nav when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  /* ==========================================================================
     SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once animation triggers
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // offset slightly to trigger just before entering view
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
