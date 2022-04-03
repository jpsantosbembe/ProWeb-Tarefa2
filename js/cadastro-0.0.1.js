var Inputmask = require('inputmask');


var selector = document.getElementById("fnumero");

var im = new Inputmask("99-9999999");
im.mask(selector);
alert("teste")