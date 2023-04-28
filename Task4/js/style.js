var that = $(".option");

$(".option").click(function(){
    console.log($(that).children("div"))
    $(that).children("div")[0].style.display="none";
    $(that).removeClass("active");
    console.log($(".option").children("div")[0]);
    $(this).addClass("active");
    console.log($(this))
    $(this).children("div")[0].style.display="block";
    that = this;
 });
 