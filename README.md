# mSlider Documentation
This documentation should help explain how to use & abuse the mSlider. Mostly this is a note to self.

## 0 -- Basics
The slider is based around sliding absolutely-positioned divs around. It uses jQuery's .animate(), which is not the most efficient method, but it allowed me access to a callback which I sorely needed at the time. Given time & need, I might rewrite this to use Modernizr, CSS3 transitions, and some alternate method for callbacks.

## 1 -- HTML
The HTML required for this slider is slightly heavy, but that's because the slider doesn't provide it for you. If you set up the slider correctly, everything should fire. You can then tweak and change the normal/active/hover/etc. styles as you need.

###### The Wrapper
First, you have the wrapper of the slider itself:

    <div class="mSlider" id="your-id">

This is the wrapper that contains all of the guts of the slider, so it's very important you include it! Make the id whatever you want, but you must remember it -- you need it to instantiate the slider later.

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

That's the basic shell of the slider. You can have (n) slides, which is pretty cool, though personally, I think 1,042 might be a bit much. When you instantiate the slider, you can tell it how many slides you have. 4 is the default, so feel free not to put a number if it's just 4.

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

Note that the hrefs here relate back to the slide ID's. This is purposeful, and integral. Please don't forget to do this!! For each slide, you must make a nav chunk. With this slider, that's non-negotiable.

## The JS
Now that you've got your HTML there, you can start implementing the JS. Crazy! How to define a new slider:

    var testSlider = new mSlider('#your-id', n);

In this instantiation, the '#your-slider' is the id you gave the wrapper earlier. n here is the number of slides you have; remember, if that number is 4, this argument is optional.

Pretty simple, right? That's all there is to it! If you'd like the extra feature of buttons on one slide that go to the next (or whichever), you can add them! When you make the button, just like the nav pieces, you have to set the href to whatever slide you're aiming for, and shazam! You're set. Also, make sure it has the .slide-toggle class. Otherwise it won't do anything. Sad trombone.

## The CSS
The CSS provides extremely basic styling -- truly nothing exciting. It DOES, however, provide extremely necessary positioning, as well as some active/hover states. These can/will be added onto/tweaked, but this is enough to make the slider completely functional.
