/**********************************************************************************
    Class name: mSlider
    Description: Creates a slider class with methods to slide left, slide right, toggle the
                         nav, set a setInterval, clear that setInterval, manage the slider function-
                         ality, and manage the play/pause functionality.

**********************************************************************************/
function mSlider(elem, numSlides) {
    /* Testing for the two passed in properties -- setting defaults/etc. for them */
    elem ? this.$elem = $(elem) : this.$elem = '';
    numSlides ? this.numSlides = numSlides : this.numSlides = 4;
    /* Defining other properties */
    this.$target;
    this.$active;
    this.$item;
    this.tmp;
    /* Assigning the setInterval handler to a property for easy clearing */
    this.slideInterval = this.startTimer();
    /* Delegate all our click events! */
    this.eventDelegator(elem);
}
mSlider.prototype.clearTimer = function() {
    this.slideInterval = window.clearInterval(this.slideInterval);
};
mSlider.prototype.eventDelegator = function(elem) {
    /* Click event handler area */
    // The nav
    $(document).on('click', elem + ' .nav-wrapper li a', this.mRun.bind(this));
    // The arrows
    $(document).on('click', elem +' .slider-nav a.right-arrow', this.mRun.bind(this));
    $(document).on('click', elem + ' .slider-nav a.left-arrow', this.mRun.bind(this));
    // The buttons
    $(document).on('click', elem + ' .slider a.slide-toggle', this.mRun.bind(this));
    // Play/pause
    $(document).on('click', elem + ' .slider-nav a.play-pause', this.playPause.bind(this));
    // Slide-toggle buttons (if there are any)
    if ($(elem).children('.slider').find('a.slide-toggle').length > 0) {
        $(document).on('click', elem + ' .slider a.slide-toggle', this.mRun.bind(this));
    }
};
mSlider.prototype.mRun = function(event, autoPlay) { // the brains of this thing; both args sorta optional, tests to deal with various cases ensue
    /* Event handling */
    if (event.target) { event.preventDefault ? event.preventDefault() : event.returnValue = false; } // if there is an event, preventing it, now with 100% more IE support!

    /* Autoplay destruction */
    if (!autoPlay) { // stopping the slideshow if it's playing && autoPlay isn't what triggered this
        this.clearTimer();
        this.$elem.children('.slider').find('a.play-pause .pause').removeClass('on').siblings('.play').addClass('on'); // just the easiest & most efficient -- why waste resources testing
    }

    /* Defining the $active and the event target */
    this.$active = this.$elem.children('.slider').find('.active');
    event.target ? this.$item = $(event.target) : this.$item = this.$elem.children('.slider').find('.right-arrow'); // is there an event? if not -- presume it's autoplay, let the rest of the logic work for us

    /* Defining the target slide, i.e. the one we're going to -- all of the following is basically to deal with the arrows */
    if (this.$item.parents('.slider-nav').length == 1){ // Is this one of our arrows?
        if (this.$item.hasClass('right-arrow') || this.$item.parents().hasClass('right-arrow')) { // Going to the right?
            this.tmp = parseFloat(this.$elem.children('.slider').find('.active').attr('id').replace('slide', '')) + 1; // Find the next incremented slide
            this.tmp < (this.numSlides + 1) ? this.$target = this.$elem.children('.slider').find('#slide' + this.tmp) : this.$target = this.$elem.children('.slider').find('#slide1'); // Is the next slide #slide5? That sucker don't exist. Go to #slide1. Otherwise, we're set
        } else if (this.$item.hasClass('left-arrow') || this.$item.parents().hasClass('left-arrow')) { // Going to the left? (we added the play/pause so this test is necessary)
            this.tmp = parseFloat(this.$elem.children('.slider').find('.active').attr('id').replace('slide', '')) - 1; // Exact inverse of above
            this.tmp > 0 ? this.$target = this.$elem.children('.slider').find('#slide' + this.tmp) : this.$target = this.$elem.children('.slider').find('#slide' + this.numSlides); // Ditto
        } else {
            return 0; // we'll never get here
        }
    } else { // Screw it, we're fine, it's probably got an href hardcoded
        this.$item[0].tagName == "H3" ? this.$target = this.$elem.children('.slider').find(this.$item.parent('a').attr('href')) : this.$target = this.$elem.children('.slider').find(this.$item.attr('href')); // event.target is different than just the assumed .this of a normal event handler, so we gotta test
    }

    /* The actual slider functionality -- whole lot goin' on here (not) */
    if (!this.$active.is(':animated') && this.$active.attr('id') != this.$target.attr('id')){ // if there is no item currently being animated && the target is not the currently active item
        // Now that we know where we're going/coming from, and now that we've verified sliding SHOULD happen, let's trigger an event
        this.$elem.trigger("slidingStart", [this.$target, this.$active]);
        if (this.$active.attr('id').replace('slide', '') < this.$target.attr('id').replace('slide','')){
            this.slideRight(this.$target, this.$active);
        } else {
            this.slideLeft(this.$target, this.$active);
        }
    }
    
    /* Managing our nav */
    this.$item.parents('.nav').length == 1 ? this.$item.parent('li').addClass('active').siblings('li').removeClass('active') : this.switchNav(this.$target); // if we clicked on a nav item, just do some jQuery, otherwise call the method
};
mSlider.prototype.playPause = function (event) {
    /* Event prevention */
    event.preventDefault ? event.preventDefault() : event.returnValue = false;

    if ($(event.target).hasClass('play')) {
        this.slideInterval = this.startTimer();
        this.$elem.children('.slider').find('.play').removeClass('on').siblings('.pause').addClass('on');
    } else {
        this.clearTimer();
        this.$elem.children('.slider').find('.pause').removeClass('on').siblings('.play').addClass('on');
    }
};
mSlider.prototype.slideLeft = function($toItem, $fromItem) {
    $fromItem.animate({ left: '100%' }, 500, function(){ $(this).removeClass('active'); }); // Animate the active guy to the right, then, when done, remove the active class
    if ($toItem.hasClass('lazy')) { // At the same time, snap the target item offscreen to the left (can't assume it's already there), then animate it in; once that's done, add the active class                   
        $toItem.css('background-image', 'url(' + $toItem.attr('data-original') + ')').css('left','-100%').animate({ left: '0' }, 500, function(){ $(this).addClass('active').removeClass('lazy'); }).queue( function() { $(this).parents('.mSlider').trigger("slidingComplete", [$toItem, $fromItem]); $(this).dequeue(); }); // extra lifting if it's being lazy loaded
    } else {
        $toItem.css('left','-100%').animate({ left: '0' }, 500, function(){ $(this).addClass('active'); }).queue( function() { $(this).parents('.mSlider').trigger("slidingComplete", [$toItem, $fromItem]); $(this).dequeue(); });
    }
};
mSlider.prototype.slideRight = function($toItem, $fromItem) {
    $fromItem.animate({ left: '-100%' }, 500, function(){ $(this).removeClass('active').css('left', '100%'); }); // Animate the active dudebro to the left offscreen, then once that's done, remove the active class & reset it off the screen to the right
    if ($toItem.hasClass('lazy')){ // At the same time, animate the target to the left to be in the screen, then once that's done, add the class of active, which seals the pact
        $toItem.css('background-image', 'url(' + $toItem.attr('data-original') + ')').animate({ left: '0' }, 500, function(){ $(this).addClass('active').removeClass('lazy'); }).queue( function() { $(this).parents('.mSlider').trigger("slidingComplete", [$toItem, $fromItem]); $(this).dequeue(); }); // extra lifting if it's being lazy loaded
    } else {
        $toItem.animate({ left: '0' }, 500, function(){ $(this).addClass('active'); }).queue( function() { $(this).parents('.mSlider').trigger("slidingComplete", [$toItem, $fromItem]); $(this).dequeue(); });
    }
};
mSlider.prototype.startTimer = function() {
    return window.setInterval(this.mRun.bind(this), 7000, {}, true); // scoping correctly is always necessary; also, passing an empty object in place of the event object
};
mSlider.prototype.switchNav = function($toItem) { // slide the nav along to the proper selection
    this.$elem.find('.nav').find('.' + $toItem.attr('id')).addClass('active').siblings('li').removeClass('active');
};
