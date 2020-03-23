// little script that allows me to not render
// stuff I don't want to if I'm previewing the project on
// my site in an iframe or something
function getParamValue(paramName){
    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split('&'); //get key-value pairs
    for (var i = 0; i < qArray.length; i++) 
    {
        var pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName) 
            return pArr[1]; //return value
    }
}
// if the file was passed in as EXAMPLE.html?preview=true
if(getParamValue('preview')) {
  // hide everything with the class 'noPreview'
  var elems = document.getElementsByClassName('noPreview');
  for (var i = 0; i < elems.length; i++){
    elems[i].style.display = "none"
  }
}