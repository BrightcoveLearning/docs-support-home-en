// Note that the toggle between the burger menu and full navigation menu is
// not in the script but rather in toc.js, because that script already had
// had a listener for changing window width

var BCLS_site = (function(window, document) {
  var all_sidenav_links = document.querySelectorAll(".sidenav a"),
    href = window.location.pathname,
    i,
    iMax,
    currentLink,
    currentLinkNextSib,
    parentNodeName,
    p1,
    p2,
    p3,
    pSib,
    pChild,
    pNextSib,
    p1NextSib,
    p1NextSibList,
    // for load in iframe
    header = document.querySelector('header'),
    side_nav = document.getElementById('side_nav'),
    footer = document.querySelector('footer'),
    talla_wrapper = document.getElementById('talla_wrapper'),
    open_new_tab = document.getElementById('open_new_tab'),
    bc_veggie_burger_wrapper = document.getElementById('bc_veggie_burger_wrapper'),
    in_prod_nav = document.getElementById('in_prod_nav'),
    forward_button = document.getElementById('forward_button'),
    back_button = document.getElementById('back_button');


  // if inside iframe, hide appropriate elements
  if (window.location !== window.parent.location) {
    var fby = fby || [];
    fby.push(['showTab', {id: '{{ site.feedbackify_id }}', position: 'right', color: '{{ site.product_color }}'}]);
    (function () {
        var f = document.createElement('script'); f.type = 'text/javascript'; f.async = true;
        f.src = '//cdn.feedbackify.com/f.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(f, s);
    })();
    hideElement(header);
    hideElement(footer);
    hideElement(side_nav);
    hideElement(talla_wrapper);
    hideElement(bc_veggie_burger_wrapper);
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

// utilities for adding/removing classes
function hasClass(el, name) {
  return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}
function addClass(el, name)
{
  if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
}
function removeClass(el, name)
{
  if (hasClass(el, name)) {
    el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
  }
}

function hideElement(el) {
  if (el) {
    el.setAttribute('style', 'display:none;');
  } else {
    console.log('The element ' + el + 'does not exist');
  }
}
  // side navigation
  iMax = all_sidenav_links.length;
  for (i = 0; i < iMax; i++) {
    currentLink = all_sidenav_links[i];
    currentLinkNextSib = currentLink.nextElementSibling;
    if (currentLink.getAttribute("href") === href) {
      addClass(currentLink, 'bcls-active');
      if (currentLink.getAttribute("href") !== "/") {
        p1 = currentLink.parentElement;
        p1NextSib = p1.nextElementSibling;
        if (p1NextSib && p1NextSib.firstElementChild) {
          p1NextSibList = p1NextSib.firstElementChild.nextElementSibling;
        }
        p2 = p1.parentElement;
        p3 = p2.parentElement;
        p4 = p3.parentElement;
        console.log('currentLink', currentLink);
        console.log('p1', p1);
        console.log('p2', p2);
        console.log('p3', p3);
        console.log('p4', p4);
        console.log('p1NextSib', p1NextSib);
        console.log('p1NextSibList', p1NextSibList);
        console.log('currentLinkNextSib', currentLinkNextSib);
        parentNodeName = p1.nodeName;
        pSib = p1.firstChild;
        if (p1.nodeName === 'H5') {
          pNextSib = p1.nextElementSibling;
          pNextSib.removeAttribute('style');
        } else if (currentLinkNextSib && p2.nodeName === 'UL' && p3.nodeName === 'NAV' && currentLinkNextSib.nodeName == "UL") {
          p2.removeAttribute('style');
          currentLinkNextSib.removeAttribute('style');
        } else if (p1.nodeName === 'LI' && p4.nodeName === 'UL') {
          p2.removeAttribute('style');
          p4.removeAttribute('style');
        } else if (p1.nodeName === 'LI' && p2.nodeName === 'UL' && p4.nodeName === 'UL') {
          p2.removeAttribute('style');
          p4.removeAttribute('style');
        } else if (p1NextSibList && p1.nodeName === 'LI' && p1NextSibList.nodeName === 'UL') {
            console.log('p1NextSib nodename', p1NextSib.nodeName);
            p2.removeAttribute('style');
            p1NextSibList.removeAttribute('style');
        } else if (p2.nodeName === 'UL' && p3.nodeName === 'UL') {
          p2.removeAttribute('style');
          p3.removeAttribute('style');
        } else if (p1.nodeName === 'LI') {
          p2.removeAttribute('style');
        }
      }
    }
  }

})(window, document);
