function getContent(url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            $("#content").html(this.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

//on click topnavigation
$("#home").click(function() {
    getContent("/");
}); 

$("#installation").click(function() {
    getContent("/installation");
}); 
    
$("#projektoprettelse").click(function() {
    getContent("/projektoprettelse");
}); 
