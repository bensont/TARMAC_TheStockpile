$(document).ready(function notEmpty() {
  var e = document.getElementById("legsSelect");
  var f = document.getElementById("coverSelect");
  var strUser = f.options[f.selectedIndex].value + ", " + e.options[e.selectedIndex].value;
  document.getElementById('product-details').innerHTML = strUser;
  document.getElementById("legsSelect").onchange = notEmpty;
  document.getElementById("coverSelect").onchange = notEmpty;
})
