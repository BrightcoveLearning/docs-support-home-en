/**
 * Removes selected elements if the doc is loaded in an iframe
 */
var BCLS_in_app = ( function (window, document) {
  var header = document.querySelector('header'),
    side_nav = document.getElementById('side_nav'),
    footer = document.querySelector('footer'),
    open_new_tab = document.getElementById('open_new_tab'),
    bc_veggie_burger_wrapper = document.getElementById('bc_veggie_burger_wrapper');


  function hideElement(el) {
    if (el) {
      el.setAttribute('style', 'display:none;');
    } else {
      console.log('The element ' + el + 'does not exist');
    }
  }

  function removeFeedbackify() {
    var t,
    feedbackify = document.getElementById('feedbackify');
    console.log('feedbackify', feedbackify);
    if (feedbackify) {
      var feedbackify_parent = feedbackify.parentNode;
      console.log('feedbackify_parent', feedbackify_parent);
      feedbackify_parent.removeChild(feedbackify);
    } else {
      console.log('retry');
      t = window.setTimeout(removeFeedbackify, 2000);
    }
}

  function removeSearch() {
    var t,
    searchEl = document.getElementById('nav-search-box');
    console.log('searchEl', searchEl);
    if (searchEl) {
      searchEl.setAttribute('style', 'display:none;')
    } else {
      console.log('retry');
      t = window.setTimeout(removeSearch, 2000);
    }
}

  
    // if inside iframe, hide appropriate elements
  if (window.location !== window.parent.location) {
    var fby = fby || [];
    fby.push(['showTab', {id: '{{ site.feedbackify_id }}', position: 'right', color: '#D33D00'}]);
    (function () {
        var f = document.createElement('script'); f.type = 'text/javascript'; f.async = true;
        f.src = '//cdn.feedbackify.com/f.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(f, s);
    })();
    hideElement(header);
    hideElement(footer);
    hideElement(side_nav);
    hideElement(bc_veggie_burger_wrapper);
    removeSearch(searchEl);
    // in_prod_nav.removeAttribute('style');
    open_new_tab.removeAttribute('style');
    open_new_tab.setAttribute('href', window.location.href);
    // removeFeedbackify();
    // forward_button.addEventListener('click', function() {
    //   window.history.forward();
    // });
    // back_button.addEventListener('click', function() {
    //   window.history.back();
    // });
  }

})(window, document);