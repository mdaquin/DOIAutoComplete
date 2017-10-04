
// add jquery if not there // this migt not be necessary, i.e. we could remove dependency to jQuery
if (typeof jQuery == 'undefined') {
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
  // script.integrity = "sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=";
  script.crossorigin="anonymous" 
  document.getElementsByTagName('head')[0].appendChild(script);
}

createDialog();

function createDialog(){
  var div = document.createElement('div');
  div.id = "DOIAC_DIALOG";
  div.style = "position: fixed; top: 200px; left: 20%; width: 60%; background: red; height: 30px; border-radius: 15px;";
  var st = '<span style="font-weight: bold; color: black; width: 19%;">DOI:</span> '+ 
        '<input name="DOIAC_DOI_INPUT" id="DOIAC_DOI_INPUT" style="width: 60%" placeholder="copy-paste the DOI of your paper here" />'+ 
        '<a href="javascript:checkDOI();" style="padding: 10px 10px 10px 10px; background: green; width: 19%; border-radius: 10px">Submit</a>';
  div.innerHTML=st;
  document.getElementsByTagName('body')[0].appendChild(div);
}

// display dialog 
// on change click on the button 
//    get the DOI from API
//    check matching on each attribute to each input. Change value of input if matched.
