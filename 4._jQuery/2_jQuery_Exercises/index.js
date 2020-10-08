//1
$("body").css("text-align", "center");
//2
$("#title h2").text("New Title");

//4
$(".temp").css("display", "none");
//$(".temp").hide()


//6. Change the li's inside of the ordered list to be bold.
$("#first-list li").css("font-weight", "bold");

//7. Change the last li to be underlined.  Hint: cHNldWRvIHNlbGVjdG9ycw==
$("#first-list").children().last().css("text-decoration", "underline");

//8
$("#first-list li:nth-child(2)").css("text-decoration", "line-through");

//11. Remove the first label element in the unused box.
//temporary text label
$(".unused-box label").remove();

//12. Add a paragraph that says "Second Sentence".
$(".unused-box").append("<p>Second Sentence</p>");

//13. After finishing 12 add a paragraph before it that says "First Sentence".
//$(".unused-box").after("<p>First Sentence</p>"); //does it after the element not within its child
$(".unused-box").prepend("<p>First Sentence </p>")

//14. You can finally change the class name of unused-box to used-box.
//$(".unused-box").removeClass("unused-box").addClass("used-box");
$(".unused-box").attr("class", "used-box");

//15. You know what. Let's additionally add a class name on the box called used-boxed-clicked. 
//Every time the box is clicked it should toggle this class (add if not there or remove if there).
$(".used-box").on("click", (event) => {
    $(event.currentTarget).toggleClass("used-boxed-clicked");
})