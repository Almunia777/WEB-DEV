//Check-off a task
$("ul").on("click","li", function(){
    $(this).toggleClass("done");
});

//Click on X to delete 
$("ul").on("click","span",  function(event){
    $(this).parent().fadeOut(1000, function(){
        $(this).remove();
    });
    event.stopPropagation();
});
$("input[type= 'text']").keypress(function(event){
    if(event.which === 13){
        //Grabbing to-do text
        var todo= $(this).val();
        $(this).val("");
        //Create new li and add it to ul
        $("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> "+todo+"</li>");
    }
});
$(".fa-plus").click(function(){
    $("input[type= 'text']").fadeToggle();
});