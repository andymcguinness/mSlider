$(document).ready(function(){
    /**********************************************************************************
        Creating an instance && using our beautiful slider
    **********************************************************************************/
    /* Creating our slider instance */
    var testSlider = new MSlider;

    /* Click event handler area */
    // The nav
    $(document).on('click', '.nav-wrapper li a', testSlider.mRun.bind(testSlider));
    // The arrows
    $(document).on('click', '.slider-nav a.right-arrow', testSlider.mRun.bind(testSlider));
    $(document).on('click', '.slider-nav a.left-arrow', testSlider.mRun.bind(testSlider));
    // The buttons
    $(document).on('click', '.slider a.slide-toggle', testSlider.mRun.bind(testSlider));
    // Play/pause
    $(document).on('click', '.slider-nav a.play-pause', testSlider.playPause.bind(testSlider));
});
