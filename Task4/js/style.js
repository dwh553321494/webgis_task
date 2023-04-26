$(".option").click(function(){
    $(".option").removeClass("active");
    console.log($(".option").children("div")[0].style);

    $(".option").children("div")[0].style.display="none";
    $(this).addClass("active");
    $(this).children("div")[0].style.display="block";
 });
 