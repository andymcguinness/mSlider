$(document).ready(function(){
    /* Creating our slider instance */
    var testSlider = new mSlider('#test-id', 4);

    $("#test-id").on("slidingStart", function(event, $toItem, $fromItem) {
        console.log(event);
    });
    $("#test-id").on("slidingComplete", function(event, $toItem, $fromItem) {
        console.log(event);
    });
});
