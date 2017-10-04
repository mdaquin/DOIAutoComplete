
// add jquery if not there // not necessary, i.e. we could remove dependency to jQuery
//if (typeof jQuery == 'undefined') {
//  var script = document.createElement('script');
//  script.type = "text/javascript";
//  script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
//  // script.integrity = "sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=";
//  script.crossorigin="anonymous" 
//  document.getElementsByTagName('head')[0].appendChild(script);
// }

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
  // call DOI API to get JSON
  // get all inputs 
  // go through
  // go through each attribute of DOI
  // check if matching (might need to also get the labels before...
  // might need string similarity function... 
}
