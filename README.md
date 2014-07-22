# mSlider Documentation
This documentation should help explain how to use & abuse the mSlider. Mostly this is a note to self.

## The Basics
The slider is based around sliding absolutely-positioned divs around. It uses jQuery's `.animate()`, which is not the most efficient method, but it allowed me access to a callback which I sorely needed at the time. Given time & need, I might rewrite this to use Modernizr, CSS3 transitions, and some alternate method for callbacks.

## The HTML
The HTML required for this slider is slightly heavy, but that's because the slider doesn't provide it for you. If you set up the slider correctly, everything should fire. You can add content within the slides to your heart's content -- the `.slide` div is what gets moved, so all your content will go with it.

###### The Wrapper
First, you have the wrapper of the slider itself:

    <div class="mSlider" id="your-id">

This is the wrapper that contains all of the guts of the slider, so it's very important you include it! Make the id whatever you want, but you _must_ remember it -- you need it to instantiate the slider later.

###### The Slider
Inside that wrapper, we have the slider itself (not the nav):

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
Finally, we have the slider's nav, which is a sibling to the `.slider`. The structure of that looks like:

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

Note that the hrefs here relate back to the slide ids. This is purposeful, and integral. Please don't forget to do this! For each slide, you _must_ make a nav chunk. With this slider, that's non-negotiable.

## The JS
Now that you've got your HTML there, you can start implementing the JS. Crazy! How to define a new slider:

    var testSlider = new mSlider('#your-id', n);

In this instantiation, the `#your-slider` is the id you gave the wrapper earlier. `n` here is the number of slides you have; remember, if that number is 4, this argument is optional.

Pretty simple, right? That's all there is to it! If you'd like the extra feature of buttons on one slide that go to the next (or whichever), you can add them! When you make the button, just like the nav pieces, you have to set the href to whatever slide you're aiming for, and shazam! You're set. Also, make sure it has the `.slide-toggle` class. Otherwise it won't do anything. Sad trombone.

## The CSS
The CSS provides extremely basic styling -- truly nothing exciting. It DOES, however, provide extremely necessary positioning, as well as some active/hover states. These can/will be added onto/tweaked, but this is enough to make the slider completely functional.

## The Events
This slider provides two events -- `slidingStart` and `slidingComplete`. These events both pass two parameters: the **target slide** (the slide we're going to or have just animated into view), and the **active slide** (the slide that was active, but is now being/has now been animated offscreen). You can easily hook into these events using jQuery. Your callback would look something like this:

    $("#your-id").on("slidingStart", function(event, $toItem, $fromItem) {
        // Do something fun!
    });
    $("#your-id").on("slidingComplete", function(event, $toItem, $fromItem) {
        // Do something even more fun!
    });

You have to hook it to the slider's id, since that's where I set the event to fire to. Doesn't make sense to have to hook it to each slide, right?

## A Demo
If you pull this repo down locally and open it with MAMP/WAMP/whatever, you can see a very bare demo. The index.html file contains the bare-bones structure, so you can see what the html looks like all put together. You can even use this as a starting point if you'd like!
