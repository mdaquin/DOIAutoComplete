
// add jquery if not there - should aim at making unnecessary (mostly ajax call now)
if (typeof jQuery == 'undefined') {
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
  // script.integrity = "sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=";
  script.crossorigin="anonymous" 
  document.getElementsByTagName('head')[0].appendChild(script);
}

// show dialog
createDialog();

function createDialog(){
  var div = document.createElement('div');
  div.id = "DOIAC_DIALOG";
  div.style = "position: fixed; top: 200px; left: 20%; width: 60%; background: #883344; border-radius: 15px; padding-top: 10px; padding-bottom: 10px;";
  var st = '<span style="margin-top: 10px; margin-bottom: 10px; margin-left: 10px; font-weight: bold; color: white; width: 19%;">DOI:</span> '+ 
        '<input name="DOIAC_DOI_INPUT" id="DOIAC_DOI_INPUT" style="margin-top: 10px; margin-bottom: 10px; margin-left: 10px; width: 60%" placeholder="copy-paste the DOI of your paper here" />'+ 
        '<a href="javascript:checkDOI();" style="margin-top: 10px; margin-bottom: 10px; margin-left: 10px; padding: 10px 10px 10px 10px; background: #338844; width: 19%; border-radius: 10px; color: white;">Submit</a>';
  div.innerHTML=st;
  document.getElementsByTagName('body')[0].appendChild(div);
}

// process DOI and auto-fill input fields
function checkDOI(){
  document.getElementById('DOIAC_DIALOG').style='visibility: hidden';
  var DOI = document.getElementById('DOIAC_DOI_INPUT').value;
  alert(DOI);
  // check if the https or the doi.org or the slash are already there.
  var url = 'https://doi.org/'+DOI;
  jQuery.ajax({
    url: url,
    dataType: 'json',
    accepts: {
        json: 'application/json'
    }
}).done(function(data){
    console.log(data);
    var textinput = jQuery("<input>").is("[type=text]");
    textinput.each(function (){
       foreach (var att in data){
        if (match(jQuery(this), att) {
            console.log("found "+att);
            fillContent(jQuery(this), data[att]);
        }
    });
  });
}

var synonyms = {
   author: ["authors", "author list", "authors lists"]
}

function match(el, attr){
  var name = el.attr(name);
  if (attr==name) return true;
  if (synonyms[attr])
    foreach(var i in synonyms[attr]){
      if (synonyms[attr][i]==name) return true;
    }
}
