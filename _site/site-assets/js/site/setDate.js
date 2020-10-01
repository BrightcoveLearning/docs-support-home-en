var BCLS_set_date = ( function (window, document) {
  var  bc_copyright = document.getElementById('bc_copyright'),
    c = bc_copyright.textContent,
    y = new Date().getFullYear();
    if (bc_copyright) {
      bc_copyright.innerHTML = '&copy;' + y + '&nbsp;' + c;
    }
})(window, document);