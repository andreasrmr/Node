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
$("#nodeInstall").click(function() {
    getContent("/nodeInstall");
}); 
    
$("#nodeProjektoprettelse").click(function() {
    getContent("/nodeProjektoprettelse");
}); 

$("#nodeHttpRequests").click(function() {
    getContent("/nodeHttpRequests");
}); 

$("#jquery").click(function() {
    getContent("/jquery");
}); 
