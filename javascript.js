var alphabet = "abcdefghijklmnopqrstuvwxyz";
var letterArrayLower = alphabet.split("");
var letterArrayUpper = alphabet.toLocaleUpperCase().split("");
var letterArray = letterArrayLower.concat(letterArrayUpper);
var testArray = [];

var timingDelay = 3000;

var letter = {
    value : '',
    span : $(),
    position : function() {
        return letter.span.offset();
    },
    //returns font-size of letter
    size : function() {
        return Number(letter.span.css('font-size').match(/\d+/g));
    },
    styling : function() {
        return {
        'z-index' : '4999',
        'font-size' : letter.span.css('font-size'),
        'font-family' : letter.span.css('font-family'),
        'color' : letter.span.css('color'),
        'font-weight' : letter.span.css('font-weight'),
        };
    },
};

var timing = 1000;
/////////////////////////////////////Eagle
var eagle = {
    id : 'eagle',
    speed : 3000,
    targetArray : letterArray,
    targetFunction : findLetter,
    targetSpeed : function() {
        return Math.max(Math.floor(lineLength(letter.position().left, letter.position().top, 0, -100) * 3), 500);
    },
    endSpeed : function() {
        return Math.max(Math.floor(lineLength(letter.position().left, letter.position().top, window.innerWidth + 80, -100) * 4), 2000);
    },
    leftOffset : -35,
    topOffset : -55,
    letterLeftOffset : "35px",
    letterTopOffset : "55px",
    end : {
        'margin-left' : '100%',
        'margin-top' : '-100px',
    },
    start : {
        'margin-left' : '0',
        'margin-top' : '-100px',
    },
    outerStyling : {
        'position' : 'absolute',
        'z-index' : '5000',
        'height' : '80px',
        'width' : '80px',
    },
    innerStyling : {
        'position' : 'absolute',
        'z-index' : '5002',
        'height' : '100%',
        'width' : '100%',
        //'background-image' : 'url(https://word-gnomes-test-leosooter.c9users.io/eagle.gif)',
        'background-size' : 'contain',
    },
    imgDive : 'url(images/eagle.png)',
    imgFlap : 'url(images/eagle.gif)',
    addMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + this.speed + 'ms linear, margin-top ' + this.speed + 'ms ease-in, transform ' + this.speed + 'ms cubic-bezier(0,2,0,.71)');
    },
    removeMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + 0 + 'ms linear, margin-top ' + 0 + 'ms ease-in, transform ' + 0 + 'ms cubic-bezier(.25, 1.5, .75 ,.8)');
    },
    angle : function() {
        var height = window.innerHeight - 30 - letter.position().top;
        var width = window.innerWidth + 80 - letter.position().left;
        return Math.min(height/width * 80, 60);
    },
    attack : function() {
        createAnimal(this);
        this.speed = this.targetSpeed();

        this.addMovement();
        action(this, changeImage, this.imgDive);
        action(this, angleChange, 45);
        timedAction(this, attackLetter, this.speed - 250);

        action(this, changeImage, this.imgFlap);
        action(this, angleChange, -10);
        timedAction(this, delay, 270);

        action(this, grabLetter);
        action(this, changeSpeed, this.endSpeed());
        timedAction(this, gotToEnd);

        timingDelay = timing;
        console.log(this.id + " " + timingDelay);

        timing = 0;
    },
};
////////////////////////////////Shark
var shark = {
    id : 'shark',
    speed : 4000,
    targetArray : ['h1','h2'],
    targetFunction : letterInTag,
    targetSpeed : function() {
        return Math.max(Math.floor(lineLength(letter.position().left, letter.position().top, window.innerWidth + 80, window.innerHeight - 30) * 4), 2000);
    },
    leftOffset : -10,
    topOffset : -15,
    letterLeftOffset : "-5px",
    letterTopOffset : "30px",
    start : {
        'margin-left' : window.innerWidth + 80 + 'px',
        'margin-top' : window.innerHeight - 30 + 'px',
    },
    end : {
        'margin-left' : '-10%',
        'margin-top' : window.innerHeight - 30 + 'px',
    },
    outerStyling : {
        'position' : 'absolute',
        'z-index' : '5000',
        'height' : '80px',
        'width' : '80px',
    },
    innerStyling : {
        'position' : 'absolute',
        'z-index' : '5002',
        'height' : '100%',
        'width' : '100%',
        'background-image' : 'url(images/shark.gif)',
        'background-size' : 'contain',
    },
    addMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + this.speed + 'ms linear, margin-top ' + this.speed + 'ms ease-in, transform ' + this.speed + 'ms cubic-bezier(.25, 1.5, .75 ,.8)');
    },
    removeMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + 0 + 'ms linear, margin-top ' + 0 + 'ms ease-in, transform ' + 0 + 'ms cubic-bezier(.25, 1.5, .75 ,.8)');
    },
    angle : function() {
        var height = Math.floor(window.innerHeight - 30 - letter.position().top);
        var width = Math.floor(window.innerWidth + 80 - letter.position().left);
        return Math.min(height/width * 80, 60);
    },
    attack : function() {
        createAnimal(this);
        this.speed = this.targetSpeed();
        this.addMovement();
        action(this, angleUp);
        timedAction(this, attackLetter);

        action(this, grabLetter);
        action(this, angleDown);

        timedAction(this, gotToEnd);

        action(this, angleLevel);
        action(this, turn);
        timedAction(this, delay, 3000);
        action(this, changeSpeed, 6000);

        timedAction(this, goToStart, 6000);

        action(this, turnBack);


        timingDelay = timing;
        console.log(this.id + " " + timingDelay);

        timing = 0;
    },
    traverse : function() {

    },
};
////////////////////////////////////Cheetah
var cheetah = {
    targetArray : letterArrayUpper,
    targetFunction : findLetter,
    id : 'cheetah',
    speed : 3000,
    targetSpeed : function() {
        return Math.floor((window.innerWidth - letter.position().left) * 1.8);
    },
    endSpeed : function() {
        return Math.floor(letter.position().left * 2.8);
    },
    leftOffset : 0,
    topOffset : 0,
    letterLeftOffset : "0",
    letterTopOffset : "0",
    start : {
        'margin-left' : window.innerWidth - 100 + 'px',
        'margin-top' : '0',
    },
    end : {
        'margin-left' : '-90px',
        'margin-top' : '0',
    },
    outerStyling : {
        'position' : 'absolute',
        'z-index' : '5000',
        'height' : '38px',
        'width' : '90px',
    },
    innerStyling : {
        'position' : 'absolute',
        'z-index' : '5002',
        'height' : '100%',
        'width' : '100%',
        'background-image' : 'url(images/cheetah.gif)',
        'background-size' : 'contain',
    },
    addMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + this.speed + 'ms linear, margin-top ' + this.speed + 'ms linear, transform ' + this.speed + 'ms linear');
    },
    removeMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + 0 + 'ms linear, margin-top ' + 0 + 'ms ease-in, transform ' + 0 + 'ms cubic-bezier(.25, 1.5, .75 ,.8)');
    },
    angle : function() {
        var height = window.innerHeight - 30 - letter.position().top;
        var width = window.innerWidth + 80 - letter.position().left;
        return Math.min(height/width * 80, 60);
    },
    attack : function() {
        this.alignWithLetter();
        this.speed = this.targetSpeed();
        this.addMovement();

        timedAction(this, attackLetter);

        //timedAction(this, delay, 50);

        action(this, grabLetter);
        action(this, changeSpeed, this.endSpeed());
        timedAction(this, gotToEnd);


        timingDelay = timing;
        console.log(this.id + " " + timingDelay);

        timing = 0;
    },
    traverse : function() {

    },
    alignWithLetter : function() {
        cheetah.start = {
            'margin-left' : window.innerWidth + 'px',
            'margin-top' : letter.position().top + 10 + 'px',
        };
        cheetah.end = {
            'margin-left' : '-90px',
            'margin-top' : letter.position().top + 10 + 'px',
        };
        createAnimal(cheetah);
    },
};
///////////////////////////////Octopus
var octopus = {
    id : 'octopus',
    outerDiv : "",
    innerDiv : "",
    speed : 2000,
    targetArray : ['h1','h2','h3','strong'],
    targetFunction : letterInTag,
    targetSpeed : function() {
        return Math.floor((window.innerWidth - letter.position().left) * 10);
    },
    endSpeed : function() {
        return Math.floor((window.innerWidth - letter.position().left) * 10);
    },
    leftOffset : -20,
    topOffset : -30,
    letterLeftOffset : "20px",
    letterTopOffset : "30px",
    start : {
        'margin-left' : window.innerWidth - 100 + 'px',
        'margin-top' : '0',
    },
    end : {
        'margin-left' : '-90px',
        'margin-top' : '0',
    },
    outerStyling : {
        'position' : 'absolute',
        'z-index' : '5000',
        'height' : '60px',
        'width' : '60px',
    },
    innerStyling : {
        'position' : 'absolute',
        'z-index' : '5002',
        'height' : '100%',
        'width' : '100%',
        'background-image' : 'url(images/octopus.png)',
        'background-size' : 'contain',
        'opacity' : '.02',
    },
    imgSitting : 'url(images/octopus.png)',
    imgSwim : 'url(images/octopusSwim.gif)',
    imgSwim2 : 'url(images/octopusSwim2.gif)',
    imgSettle : 'url(images/octopusSettle.gif)',
    changeImage : function(img) {
        this.innerDiv.css('background-image', img);
    },
    addMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + this.speed + 'ms ease-out, margin-top ' + this.speed + 'ms cubic-bezier(.25, 4, .75 ,4), transform ' + this.speed + 'ms cubic-bezier(.25, 4, .75 ,4)');
        this.innerDiv.css('transition', 'opacity 2000ms ease');
    },
    removeMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + 0 + 'ms linear, margin-top ' + 0 + 'ms ease-in, transform ' + 0 + 'ms cubic-bezier(.25, 1.5, .75 ,.8)');
    },
    angle : function() {
        var height = window.innerHeight - 30 - letter.position().top;
        var width = window.innerWidth + 80 - letter.position().left;
        return Math.min(height/width * 80, 60);
    },
    attack : function() {
        this.speed = 2000;
        this.alignWithLetter();
        this.addMovement();
        timedAction(this, delay, 2000);

        action(this, changeImage, this.imgSwim);
        action(this, fadeIn, 1);
        action(this, angleChange, -10);
        timedAction(this, attackLetter, 1000);

        action(this, changeImage, this.imgSettle);
        timedAction(this, delay, 1200);

        action(this, grabLetter);
        timedAction(this, delay, 1000);

        action(this, changeImage, this.imgSwim2);
        action(this, angleChange, 40);
        timedAction(this, delay, 300);

        action(this, changeSpeed, this.endSpeed());
        timedAction(this, gotToEnd);

        timingDelay = timing;
        console.log(this.id + " " + timingDelay);

        timing = 0;

    },
    traverse : function() {

    },
    alignWithLetter : function() {

        octopus.start = {
            'margin-left' : (letter.position().left + 300) + 'px',
            'margin-top' : (letter.position().top + 60) + 'px',
        };
        octopus.end = {
            'margin-left' : window.innerWidth + 100 + 'px',
            'margin-top' : (letter.position().top + 100) + 'px',
        };
        createAnimal(octopus);
    },
};


//////////////////////////////////// T-Rex
var tRex = {
    targetArray : letterArrayUpper,
    targetFunction : findLetter,
    id : 't-rex',
    speed : 2000,
    targetSpeed : function() {
        return Math.floor((window.innerWidth - letter.position().left) * 8);
    },
    endSpeed : function() {
        return Math.floor(letter.position().left * 8);
    },
    leftOffset : -40,
    topOffset : -130,
    letterLeftOffset : "0",
    letterTopOffset : "0",
    start : {
        'margin-left' : window.innerWidth - 100 + 'px',
        'margin-top' : '0',
    },
    end : {
        'margin-left' : '-90px',
        'margin-top' : '0',
    },
    outerStyling : {
        'position' : 'absolute',
        'z-index' : '5000',
        'height' : '150px',
        'width' : '300px',
    },
    innerStyling : {
        'position' : 'absolute',
        'z-index' : '5002',
        'height' : '100%',
        'width' : '100%',
        'background-image' : 'url(images/t-rex-fast1.gif)',
        'background-size' : 'contain',
    },

    //
    imgWalk : 'url(images/t-rex-fast1.gif)',

    // 2750ms action
    imgBite : 'url(images/t-rex-bite.gif)',

    // 750ms action plus 1000ms buffer
    imgGrab : 'url(images/t-rexGrab.gif)',

    // 1750ms action plus 1250ms buffer
    imgGulp : 'url(images/t-rexGulp.gif)',
    addMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + this.speed + 'ms linear, margin-top ' + this.speed + 'ms linear, transform ' + this.speed + 'ms linear');
    },
    removeMovement : function() {
        this.outerDiv.css('transition', 'margin-left ' + 0 + 'ms linear, margin-top ' + 0 + 'ms ease-in, transform ' + 0 + 'ms cubic-bezier(.25, 1.5, .75 ,.8)');
    },
    angle : function() {
        var height = window.innerHeight - 30 - letter.position().top;
        var width = window.innerWidth + 80 - letter.position().left;
        return Math.min(height/width * 80, 60);
    },
    attack : function() {
        this.alignWithLetter();
        this.addEatDiv();
        this.speed = this.targetSpeed();
        this.addMovement();

        timedAction(this, attackLetter);
        action(this, changeImage, this.imgGrab);
        timedAction(this, delay, 750);

        action(this, swallowLetter);
        action(this, eatLetter);
        action(this, changeImage, this.imgGulp);
        timedAction(this, delay, 1750);

        action(this, changeSpeed, this.endSpeed());
        action(this, changeImage, this.imgWalk);
        timedAction(this, gotToEnd);

        timingDelay = timing;
        console.log(this.id + " " + timingDelay);

        timing = 0;
    },
    addEatDiv : function() {
      var eatDiv = $('<div id="eat-div"></div>');
      var downAngle = '-65deg';

        eatDiv.css({
            '-moz-transform' : 'rotate(' + downAngle + ')',
            '-ms-transform' : 'rotate(' + downAngle + ')',
            '-webkit-transform' : 'rotate(' + downAngle + ')',
            'transform' : 'rotate(' + downAngle + ')',
        });

      eatDiv.css({
          'position' : 'absolute',
          'height' : '5px',
          'width' : '60px',
          'margin-left' : '10px',
          'margin-top' : '70px',
          //'background' : 'red',
          'transform-origin' : 'right center',
          'transition' : 'padding-top 50ms 900ms ease-out, padding-left 50ms 900ms ease-out, transform 850ms steps(5, start)',
      });
      this.outerDiv.prepend(eatDiv);
      this.eatDiv = eatDiv;
    },
    eatLetter : function() {
        console.log('eating letter');
        var upAngle = '75deg';
        $('#eat-div').css({
            '-moz-transform' : 'rotate(' + upAngle + ')',
            '-ms-transform' : 'rotate(' + upAngle + ')',
            '-webkit-transform' : 'rotate(' + upAngle + ')',
            'transform' : 'rotate(' + upAngle + ')',
            'padding-left' : '20px',
            'padding-top' : '20px',
        });

        setTimeout(function() {
            $('.captured-letter').css('visibility', 'hidden');
        },950);
    },

    alignWithLetter : function() {
        this.start = {
            'margin-left' : window.innerWidth + 'px',
            'margin-top' : letter.position().top + this.topOffset + 'px',
        };
        this.end = {
            'margin-left' : '-310px',
            'margin-top' : letter.position().top + this.topOffset + 'px',
        };
        createAnimal(this);
    },
};







function action(animal, action, value) {
    setTimeout(function() {
        action(animal, value);
    }, timing);
    timing += 10;
}

function timedAction(animal, action, delay = animal.speed) {
    setTimeout(function() {
        action(animal);
    }, timing);
    timing += delay;
}


//Untimed functions
function turn(animal) {
    animal.removeMovement();
    animal.outerDiv.css('transform', 'rotateY(180deg)');
    setTimeout(function() {
        animal.addMovement();
    }, 9);
}

function turnBack(animal) {
    animal.removeMovement();
    animal.outerDiv.css('transform', 'rotateY(0)');
    setTimeout(function() {
        animal.addMovement();
    }, 9);
}

function angleUp(animal) {
    animal.outerDiv.css({
        '-moz-transform' : 'rotate(' + animal.angle() + 'deg)',
        '-ms-transform' : 'rotate(' + animal.angle() + 'deg)',
        '-webkit-transform' : 'rotate(' + animal.angle() + 'deg)',
        'transform' : 'rotate(' + animal.angle() + 'deg)',
    });
}

function angleDown(animal) {
    animal.outerDiv.css({
        '-moz-transform' : 'rotate(-' + (animal.angle() - 5) + 'deg)',
        '-ms-transform' : 'rotate(-' + (animal.angle() - 5) + 'deg)',
        '-webkit-transform' : 'rotate(-' + (animal.angle() - 5) + 'deg)',
        'transform' : 'rotate(-' + (animal.angle() - 5) + 'deg)',
    });
}

function angleLevel(animal) {
    animal.outerDiv.css({
        '-moz-transform' : 'none',
        '-ms-transform' : 'none',
        '-webkit-transform' : 'none',
        'transform' : 'none',
    });
}

function angleChange(animal, value) {
    animal.outerDiv.css({
        '-moz-transform' : 'rotate(' + value + 'deg)',
        '-ms-transform' : 'rotate(' + value + 'deg)',
        '-webkit-transform' : 'rotate(' + value + 'deg)',
        'transform' : 'rotate(' + value + 'deg)',
    });
}

function grabLetter(animal) {
    var newSpan = $('<span></span>');
    newSpan.css(letter.styling());
    newSpan.css({
        'position' : 'absolute',
        'transform' : '(rotate(75deg))',
        'margin-left' : animal.letterLeftOffset,
        'margin-top' : animal.letterTopOffset,
    });
    newSpan.addClass('captured-letter');
    newSpan.text(letter.value);
    animal.outerDiv.prepend(newSpan);
    letter.span.css('visibility', 'hidden');
    letter.span.removeClass('target-letter');
}

function swallowLetter(animal) {
    var newSpan = $('<span></span>');
    newSpan.css(letter.styling());
    newSpan.css({
        'position' : 'absolute',
        'transform' : '(rotate(75deg))',
        'margin-left' : animal.letterLeftOffset,
        'margin-top' : animal.letterTopOffset,
    });
    newSpan.addClass('captured-letter');
    newSpan.text(letter.value);
    animal.eatDiv.append(newSpan);
    letter.span.css('visibility', 'hidden');
    letter.span.removeClass('target-letter');
}

function eatLetter(animal) {
    animal.eatLetter();
}

function changeSpeed(animal, value) {
    animal.speed = value;
    setTimeout(function() {
        animal.addMovement();
    }, 5);
}

function fadeIn(animal, value) {
    animal.innerDiv.css('opacity', value + '');
}

function changeImage(animal, value) {
    animal.innerDiv.css('background-image', value);
}

//Timed functions
function attackLetter(animal) {
    animal.outerDiv.css('margin-left', letter.position().left + animal.leftOffset +'px');
    animal.outerDiv.css('margin-top', letter.position().top + animal.topOffset +'px');
}

function gotToEnd(animal) {
    animal.outerDiv.css(animal.end);
}

function goToStart(animal) {
    animal.outerDiv.css(animal.start);
    $('.captured-letter').remove();
}

function moveLeft(animal) {
    animal.outerDiv.css('margin-left', animal.outerDiv.offset().left - 500 + 'px');
}

function delay(){
}



//////////////////////////////////////////////////////

function activate(animal, type, array) {
    if(type.name == "findLetter"){
        console.log(type.name);
        if(checkArray(array)) {
            type(array);
            animal.attack();
        }
        else{
            return false;
        }
    }
    else if(type.name == 'letterInTag') {
        console.log(type.name);
        type(array);
        animal.attack();
    }
    else {
        console.log('function ' + type.name);
    }
}

function createAnchor() {
    var anchor = $('<div id="anchor"></div>');
    $('body').prepend(anchor);
}

function createAnimal(animal) {
    var outerDiv = $('<div id ="' + animal.id + '-Outer"></div>');
    var innerDiv = $('<div id ="' + animal.id + '-Inner"></div>');
    outerDiv.css(animal.outerStyling);
    innerDiv.css(animal.innerStyling);
    outerDiv.append(innerDiv);
    outerDiv.css(animal.start);

    $('#anchor').append(outerDiv);
    animal.outerDiv = outerDiv;
    animal.innerDiv = innerDiv;
}


function letterInTag(tag) {
    var elements = $(tag + '');
    var elementArray = [];
    elements.each(function() {
        var visible = $(this).is(':visible') && $(this).css('color') !== $(this).css('background-color') && $(this).css('visibility') !== 'hidden' && $(this).css('opacity') > 0;
        var hasText = $(this).text().length > 0 && $(this).children().text().length === 0;
        if(visible && hasText){
            elementArray.push($(this));
        }
    });
    if(elementArray.length) {
        tagLetter();
    }
    else{
        console.log("No targets found for Tag " + elements.prop('tagName'));
        return false;
    }

    function tagLetter() {
        var targetElement = randArray(elementArray);
        var index = randMinMax(0, targetElement.text().length-1);
        if(targetElement.text().charAt(index) !== ' ') {
           spanLetter(targetElement, index);
        }
        else{
            console.log('letter was a space');
            tagLetter();
        }
    }
}

//Selects a random letter from the array, finds it in the DOM and wraps it with a span element
function findLetter(array) {
    var value = randArray(array);
    var elementArray = createTargetArray(value);
    if(elementArray.length > 0){
       //Select one element from the array of potential elements
        var parentElement = randArray(elementArray);
        spanLetter(parentElement, parentElement.text().indexOf(value));
    }
    else{
        findLetter(array);
    }
}

//Returns false if none of the letters in the array can be found in the DOM
function checkArray(array) {
    var i;
    var targets = 0;
    for(i=0; i<array.length; i++) {
        var targetArray = createTargetArray(array[i]);
        if(targetArray.length) {
            targets ++;
        }
    }
    return targets;
}

//Returns an array of elements that contain the target letter
function createTargetArray(value) {
    var potentialElement = $('*:contains(' + value + ')');
    var elementArray = [];
    var i;

    //Filter out the elements that directly contain text and push them into an array
    for(i=0; i<potentialElement.length; i++){
        //All elements that contain the target letter at any level
        var target = $(potentialElement[i]);

        var visible = target.is(':visible') && target.css('color') !== target.css('background-color') && target.css('visibility') !== 'hidden' && target.css('opacity') > 0;

        var hasText = target.children().text().length === 0;

        var above = function(value){
            return target.offset().top < (window.innerHeight - value);
        };

        //Checks that elements have text as direct child, are visible, and are in the top portion of the page.
        if(visible && hasText && above(200)){
            elementArray.push(target);
        }
    }
    return elementArray;
}

function spanLetter(parent, index) {
    console.log('Spanning ')
    //Split text containing target letter into array
    var textArray = parent.text().split('');
    letter.value = textArray[index];
    console.log('Spanning ' + textArray[index]);
    //Replace letter with new letter wrapped in span element
    textArray.splice(index,1,'<span class="target-letter">' + textArray[index] + '</span>');

    //Convert text array back to string and replace text in DOM
    var newText = textArray.join('');
    parent.html(newText);

    letter.span = $('.target-letter');
}
var predators = [eagle, shark, cheetah, octopus];

$(document).ready(function() {
    createAnchor();

    setTimeout(function() {
        activate(eagle, letterInTag, ['strong']);
    }, 3000);
    setTimeout(function() {
        activate(octopus, letterInTag, ['li','strong','h3']);
    }, 16000);
    setTimeout(function() {
       activate(cheetah, findLetter, letterArrayUpper);
    }, 30000);

    setTimeout(function() {
       activate(shark, letterInTag, ['h1','h2']);
    }, 36000);

    //startPredators();

});

function startPredators() {
    setTimeout(function() {
        console.log('timing delay = ' + timingDelay);
        var animal = randArray(predators);
        activate(animal, animal.targetFunction, animal.targetArray);
        startPredators();
    }, timingDelay + 3000);
}


///////////////////////////////Utility Functions
function showArray(array) {
    var i;
    for(i=0; i<array.length; i++){
        console.log(array[i]);
    }
}

function randMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randArray(array){
    var i = randMinMax(0, array.length-1);
    return array[i];
}

function lineLength(x1,y1,x2,y2) {
    var xLength = Math.abs(x1 - x2);
    var yLength = Math.abs(y1 - y2);
    var length = Math.round(Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2)));
    return length;
}
