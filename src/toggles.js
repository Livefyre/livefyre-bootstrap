/* ----------------------------------
 * TOGGLE v1.0.0
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 * ---------------------------------- */

!function () {

  var start     = {};
  var touchMove = false;
  var distanceX = false;
  var toggle    = false;
    
  // IE9,10 don't support the CustomEvent
  // constructor. mzl.la/TLH4q1 
  if (!window.CustomEvent) {
    function CustomEvent ( eventType, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );       
    evt.initCustomEvent( eventType, params.bubbles, params.cancelable, params.detail )
    return evt;
   };

    CustomEvent.prototype = window.Event.prototype;
  }

  var findToggle = function (target) {
    var i, toggles = document.querySelectorAll('.lf-toggle');
    for (; target && target !== document; target = target.parentNode) {
      for (i = toggles.length; i--;) { if (toggles[i] === target) return target; }
    }
  }

  // Substitutes for classList.contains in the click event listener so we can ensure IE9 compatibility. 
  var hasClass = function (element, cls) { 
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  window.addEventListener('touchstart', function (e) {
    e = e.originalEvent || e;

    toggle = findToggle(e.target);

    if (!toggle) return;

    var handle      = toggle.querySelector('.lf-toggle-handle');
    var toggleWidth = toggle.offsetWidth;
    var handleWidth = handle.offsetWidth;
    var offset      = toggle.classList.contains('active') ? toggleWidth - handleWidth : 0;

    start     = { pageX : e.touches[0].pageX - offset, pageY : e.touches[0].pageY };
    touchMove = false;

    // todo: probably should be moved to the css
    toggle.style['-webkit-transition-duration'] = 0;
  });

  window.addEventListener('touchmove', function (e) {
    e = e.originalEvent || e;

    if (e.touches.length > 1) return; // Exit if a pinch

    if (!toggle) return;

    var handle      = toggle.querySelector('.lf-toggle-handle');
    var current     = e.touches[0];
    var toggleWidth = toggle.offsetWidth;
    var handleWidth = handle.offsetWidth;
    var offset      = toggleWidth - handleWidth;

    touchMove = true;
    distanceX = current.pageX - start.pageX;

    if (Math.abs(distanceX) < Math.abs(current.pageY - start.pageY)) return;

    e.preventDefault();

    if (distanceX < 0)      return handle.style.webkitTransform = 'translate3d(0,0,0)';
    if (distanceX > offset) return handle.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)';

    handle.style.webkitTransform = 'translate3d(' + distanceX + 'px,0,0)';

    toggle.classList[(distanceX > (toggleWidth/2 - handleWidth/2)) ? 'add' : 'remove']('active');
  });

  window.addEventListener('touchend', function (e) {
    if (!toggle) return;

    var handle      = toggle.querySelector('.lf-toggle-handle');
    var toggleWidth = toggle.offsetWidth;
    var handleWidth = handle.offsetWidth;
    var offset      = toggleWidth - handleWidth;
    var slideOn     = (!touchMove && !toggle.classList.contains('active')) || (touchMove && (distanceX > (toggleWidth/2 - handleWidth/2)));

    if (slideOn) handle.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)';
    else handle.style.webkitTransform = 'translate3d(0,0,0)';

    toggle.classList[slideOn ? 'add' : 'remove']('active');

    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent('toggle',
      true,
      true,
      { detail: { isActive: slideOn },
    });

    toggle.dispatchEvent(evt);

    touchMove = false;
    toggle    = false;
  });

  window.addEventListener('click', function (e) {
    toggle = findToggle(e.target);
    if (!toggle) return;
    var handle      = toggle.querySelector('.lf-toggle-handle');
    var toggleWidth = toggle.offsetWidth;
    var handleWidth = handle.offsetWidth;
    var offset      = toggleWidth - handleWidth;
    //var slideOn     = (!touchMove && !toggle.classList.contains('active')) || (touchMove && (distanceX > (toggleWidth/2 - handleWidth/2)));

    // Replace with custom hasClass function since IE9 doesn't recognize classList:
    // var slideOn  = !toggle.classList.contains('active');
    var slideOn     = !hasClass(toggle, 'active');

    if (slideOn) handle.style.webkitTransform = 'translate3d(' + offset + 'px,0,0)';
    else handle.style.webkitTransform = 'translate3d(0,0,0)';

    // Replace with less-elegant conditional since IE9 doesn't recognize classList:
    // toggle.classList[slideOn ? 'add' : 'remove']('active');
    if (slideOn) toggle.className += ' active';
    else toggle.className = toggle.className.replace(' active','');

    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent('toggle',
      true,
      true,
      { detail: { isActive: slideOn },
    });

    toggle.dispatchEvent(evt);

    touchMove = false;
    toggle    = false;
  });

}();