function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

var init = function() {

    //completed
    $("ul").on("click", "li", function() {
        $(this).toggleClass("complited");
    });

    //click on X delete
    $("ul").on("click", "span", function(event) {
        $(this).parent().fadeOut(500, function() {
            $(this).remove();
        });
        event.stopPropagation();
    });

    //add new todo
    $("input[type='text']").keypress(function(event) {
        //grabbing new todo text from input
        if (event.which === 13) {
            //create a new li and add to ul
            var toDoText = $(this).val();
            $(this).val = ("")
            $("ul").append("<li><span id='delete'>X</span>" + toDoText + "</li>");
        }
    });

    $("#addToDo").click(function() {
        $("input[type='text']").fadeToggle(100);
    });
    /* full remove of the tag
    $("span").click(function(event){
         $(this).parent().remove();
         eventstopPropaganation;
    });
    */

    /*
    first fadeOut then remove the element

    $("span").click(function(event){
         $(this).parent().fadeOut(500, function() {
           $(this).remove();
         });
         eventstopPropaganation;
    });

    */
}
ready(init);