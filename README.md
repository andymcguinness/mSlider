# MSlider Documentation
This documentation should help explain how to use & abuse the MSlider. Mostly this is a note to self.

## 0 -- Basics
The slider is based around sliding absolutely-positioned divs around. It uses jQuery's .animate(), which is not the most efficient method, but it allowed me access to a callback which I sorely needed at the time. Given time & need, I might rewrite this to use Modernizr, CSS3 transitions, and some alternate method for callbacks.

## 1 -- HTML
The HTML required for this slider is slightly heavy, but that's because the slider doesn't provide it for you. If you set up the slider correctly, everything should fire. You can then tweak and change the normal/active/hover/etc. styles as you need.

###### The Wrapper
First, you have the wrapper of the slider itself:

    <div id="mSlider">

This is the wrapper that contains all of the guts of the slider, so it's very important you include it!

###### The Slider
Next, we have the slider itself (not the nav):

    <div class="slider">
        <div class="slider-nav"> <!-- Absolutely positioned, absolutely necessary -->
            <a class="left-arrow"></a>
            <a class="right-arrow"></a>
            <a class="play-pause"></a>
        </div>
        <div id="slide1" class="slide active"> <!-- Begin your user-generated slides -->
            . . .
        </div>
        <div id="slide2" class="slide">
            . . .
        </div>
        .
        .
        .
        <div id="slide(n)" class="slide">
            . . .
        </div>
    </div>

That's the basic shell of the slider. You can have (n) slides, which is pretty cool, though personally, I think 1,042 might be a bit much. Just be aware that if you go over 4 slides, you will have to change some stuff in the JavaScript, particularly in the logic for the left/right sliding. It's commented, but you shouldn't have any problem figuring out what you have to do. In the future, I'll redo the constructor to take a numSlides argument or something like that, so to create a new slider, you would call "var testSlider = new MSlider('10');" or somesuch.

###### The Nav
Finally, we have the slider's nav. The structure of that looks like:

    <div class="nav">
        <ul class="nav-wrapper">
            <li class="slide1 active">
                <a href="#slide1">
                    . . .
                </a>
            </li>
            <li class="slide2">
                <a href="#slide2">
                    . . .
                </a>
            </li>
            .
            .
            .
            <li class="slide(n)">
                <a href="#slide(n)">
                    . . .
                </a>
            </li>
        </ul>
    </div>

Why do we have a mystery wrapped in a puzzle wrapped in an enigma? Well, we have the wrapper div that's probably full-width, then we have the nav itself which sits inside, and can float around however you desire. Just a style choice for me.

Note that the hrefs here relate back to the slide ID's. This is purposeful, and integral. Please don't forget to do this!! As many slides as you have, you need a nav chunk. With this slider, that's non-negotiable.

## The JS
Now that you've got your HTML there, you can start implementing the JS. Crazy! How to define a new slider:

    var testSlider = new MSlider;

And you have yourself a brand new slider! Unfortunately, click event handling doesn't come built-in yet, so here's some click events you have to add:

    // The nav
    $(document).on('click', '.nav li a', testSlider.mRun.bind(testSlider));

    // The arrows
    $(document).on('click', '.slider-nav a.right-arrow', testSlider.mRun.bind(testSlider));
    $(document).on('click', '.slider-nav a.left-arrow', testSlider.mRun.bind(testSlider));

    // Play/pause
    $(document).on('click', '.slider-nav a.play-pause', testSlider.playPause.bind(testSlider));

Pretty simple, right? That's all there is to it! If you'd like the extra feature of buttons on one slide that go to the next (or whichever), you can add:

    $(document).on('click', 'a.slide-toggle', testSlider.mRun.bind(testSlider));

When you make the button, just like the nav pieces, you have to set the href to whatever slide you're aiming for, and shazam! You're set. Also, make sure it has the .slide-toggle class. Otherwise it won't do anything. Sad trombone.

If you're curious about why .bind() has to be there, the simple reason is that otherwise, mRun/playPause's built-in this keyword would be equal to the event object, which is not the scope we want -- we need it to be reset to be scoped to the actual slider instance. That way, we can call other methods without a hitch.

## The CSS
The CSS provides extremely basic styling -- truly nothing exciting. It DOES, however, provide extremely necessary positioning, as well as some active/hover states. These can/will be added onto/tweaked, but this is enough to make the slider completely functional.
