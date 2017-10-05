
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
  console.log(DOI);
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
    var textinput = jQuery("input");
    console.log(textinput);
    textinput.each(function (){
       if (jQuery(this).is(":text"))
         for(var att in data){
          if (match(jQuery(this), att)) {
            console.log("found "+att);
            fillContent(jQuery(this), data[att]);
          }
         }
    });
  });
}

var synonyms = {
   author: ["authors", "author list", "authors list"], 
   page: ["pages"],
   doi: ["digital object identifer (doi)", "digital object identifer"],
   "container-title": ["journal", "conference", "conference name", "proceedings"],
   created: ["date", "publication date"]
}

function match(el, attr){
  var name ="xxxx";
  if (el.attr("name"))
       name = superTrim(el.attr("name").toLowerCase());
  var lattr = superTrim(attr.toLowerCase());
  var label = "xxxx"; 
  if (el.prev())
      label = superTrim(el.prev().text().toLowerCase());
  console.log(name+" - "+label);
  if (lattr==name) return true;
  if (lattr==label) return true;  
  if (synonyms[lattr])
    for(var i in synonyms[lattr]){
      if (synonyms[lattr][i]==name) return true
      if (synonyms[lattr][i]==label) return true;
    }
}
  
  function fillContent(el, data){
     var st = getStringContent(data); 
     el.val(superTrim(st));
  }
  
  function getStringContent(data){
     if (isArray(data)){
         var st = "";
         var first = true;
         for(var i in data){
           if (!first) 
             if (data[0] && data[0].family) st +=" and ";
             else st +=", ";
           first = false;
           st+= getStringContent(data[i]);
         } 
       return st;
     } else if (isObject(data)){
           if (data["date-time"]) return data["date-time"].replace(/T.*$/g,'').replace(/-/g,"/");
           if (data.family && data.given) return data.given+" "+data.family;
           else return JSON.stringify(data);
     }
     return JSON.stringify(data);
  }

  function superTrim(s){
    return s.replace(/['"]+/g, '').replace(/\*+/g, '').trim();
  }

function isObject ( obj ) {
   return obj && (typeof obj  === "object");
}

function isArray ( obj ) { 
  return isObject(obj) && (obj instanceof Array);
}
