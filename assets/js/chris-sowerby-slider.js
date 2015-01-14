//jquery by helpchrisplz - chris sowerby
//also loading skin\frontend\rwd\default\js\slider\jquery.mobile.custom.touch.min.js for swipe detection.

window.console = window.console || {log:function(){}}; //stop errors in old ie when testing this script.

( function($) {

/* if (typeof jQuery.ui == 'undefined') {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js";
  $("head").append(s);
} */

$(window).load(function () {
$slider = $('#imageSlider');
var usePauseOnHover = true;
var usePausedTooltip = true;
var autoSlideChange = 99995000;
var useTimer = false; // needs work
var effectDuration = 450; 
var useHoverFade = true;
var hoverFadeDuration = 600;
var hoverFadeWait = 1500;
var usePrevAndNextButtons = true;
var prevIcon = "&#8678;";
var nextIcon = "&#8680;";
var usePagination = true;
var setSlideHeights = false;
var slideEffect = "fade"; // fade or slide
var maxSlideWidth = 1140; // This is used to calculate the inner slides scale vale when viewed on mobile devices.
var maxSlideHeight = 450; // This is used to calculate the inner slides scale vale when viewed on mobile devices.
var refreshInterval;
var refreshIntervalHeights;
var timerRefreshInterval;
var childNumbers = 0; // this must be 0

function setRefreshInterval() {
  refreshInterval = setInterval( moveRight, autoSlideChange);  
}
function clearRefreshInterval() {
  clearInterval(refreshInterval);
}
if (usePrevAndNextButtons == true) {
  $slider.prepend('<div class="control_next"><p>'+nextIcon+'</p></div><div class="control_prev"><p>'+prevIcon+'</p></div>');
}
if (usePagination == true) { 
  function loadPagination() { 
    $slider.find('> ul li').each(function(){  
      childNumbers++;   

      //var addSlideBtn = "<span class='slidechildNumber"+childNumbers+"'>"+childNumbers+"</span>";
      var addSlideBtn = "<span class='fullWidthImage"+childNumbers+"'></span>";
      
      //#slideBtns span
      $(this).addClass('fullWidthImage'+childNumbers);
     $('#slideBtns').append(addSlideBtn);
    });
    $("#slideBtns span:nth-child(1)").addClass("slideBtns");
    if (childNumbers == 1) { $("#slideBtns").css({"display":"none"}); };
  }
  loadPagination();
}
if (useTimer == true) {  
  $slider.append('<div id="timerAnimation"></div>');
  function animateTheTimer() {
    $("#timerAnimation").animate({
      width: maxSlideWidth
    }, autoSlideChange);
    console.log("animateTheTimer")
  }
  function startTheTimer() {
    animateTheTimer();
    var timerRefreshInterval = setInterval( animateTheTimer, autoSlideChange);  
    console.log("startTheTimer")
  }
  function clearTheTimer() {
    clearInterval(timerRefreshInterval);
    $("#timerAnimation").stop().css("width","0px");   
    console.log("clearTheTimer")
  }
  startTheTimer();  
}
//call imageSliderResizeMyWindow function when the window is resized
var imageSliderResizeTimer;
$(window).resize(function() {
    clearTimeout(imageSliderResizeTimer);
    imageSliderResizeTimer = setTimeout(imageSliderResizeMyWindow, 100); 
});

function imageSliderResizeMyWindow() {  
  slideWidth = $slider.parent().width();  
  // Fixes ie container bug including padding in with the width.
    if (slideWidth > maxSlideWidth) { slideWidth = maxSlideWidth; }   
  var theScale = slideWidth / maxSlideWidth;
  // Calculate the actual slides height after its scaled.
  var slideHeight = theScale * maxSlideHeight; 
  $slider.parent().height(slideHeight).css({"width":"inherit","max-width":"100%"}); //,"height":"auto"

  //console.log("theScale: "+theScale)
  //console.log("slideHeight: "+slideHeight)
  //console.log("slideWidth: "+slideWidth)

  // this is how we can target parts of the inner slide to set css on them at diffrent widths a bit like media queries.
  if ($(window).width() < 600) {
    $slider.parent().hide();
    // expand the iframe out to the slides height and width.
    // $slider.find('iframe').css({width: maxSlideWidth, height: maxSlideHeight});
    // $slider.css("transform", "scale(1, 1)").parent().height(maxSlideHeight); 
  } else {
    $slider.parent().show();
    $("#imageSlider:not(.imageSliderDoomsDay)").css("transform", "scale("+theScale+", "+theScale+")")
    $(".imageSliderDoomsDay").css({"zoom":theScale});
  }
  // fix IE8 transform origin
  $slider.css({"margin-left":"0px", "margin-top":"0px"}); 
} // end function imageSliderResizeMyWindow

  // shuffle the deck how we want it.
  $slider.find('> ul li:last-child').prependTo('#imageSlider > ul');

function doNextBtnRight() {   
  $("#slideBtns").find(".slideBtns").removeClass("slideBtns")
  .next().addClass("slideBtns");
  
  if(!$("#slideBtns span").hasClass("slideBtns")){
    $("#slideBtns span:nth-child(1)").addClass("slideBtns");
  }
}
function doNextBtnLeft() {   
  $("#slideBtns").find(".slideBtns").removeClass("slideBtns")
  .prev().addClass("slideBtns");
  
  if(!$("#slideBtns span").hasClass("slideBtns")){
    $("#slideBtns span:last-child").addClass("slideBtns");
  }
}

function setTheHight() { 
//used if content is difrent sizes. 
  slideHeight = $slider.find("> ul > li:nth-child(" + childPosition + ") > ul").height() + 20;
  $slider.animate({height: slideHeight}, 100);  
}    

    function moveLeft(done, quickJumpSpeed) { 
      if (useTimer == true) { 
        clearTheTimer();
      }
      if(typeof quickJumpSpeed != 'undefined') {
        var savedEffectDuration = effectDuration;
        effectDuration = quickJumpSpeed;        
      }    
        if (done != "buttons already done") { 
          doNextBtnLeft();
        }  
        if (slideEffect == "fade" && slideCount != 1) {
          $slider.find('> ul').animate({ 
              opacity: 0.0
          }, effectDuration, function () {
              $slider.find('> ul li:last-child').prependTo('#imageSlider > ul');             
          });
          setTimeout(function(){
             $slider.find('> ul').animate({opacity: 1.0}, effectDuration);
          }, effectDuration);
        }
        if (slideEffect == "slide" && slideCount != 1) {
          $slider.find('> ul').animate({
              left: + slideWidth
          }, effectDuration, function () {
              $slider.find('> ul li:last-child').prependTo('#imageSlider > ul');
              $slider.find('> ul').css('left', '0');
          }); 
        }
      if (setSlideHeights == true){
        setTimeout(function(){ 
          setTheHight();
        }, 420);      
      }

      // reset the effect duration back to its default
      effectDuration = savedEffectDuration; 
      if (useTimer == true) { //&& usePauseOnHover != true
        startTheTimer();
    }
    } //end moveLeft();

    function moveRight(done, quickJumpSpeed) { 
      if (useTimer == true) { 
        clearTheTimer();
      }     
      if(typeof quickJumpSpeed != 'undefined') {
        var savedEffectDuration = effectDuration;
        effectDuration = quickJumpSpeed;        
      } 
        if (done != "buttons already done") {
          doNextBtnRight();
        } 
      
        if (slideEffect == "fade" && slideCount != 1) {          
          $slider.find('> ul').animate({
             opacity: 0.0           
          }, effectDuration, function () {
              $slider.find('> ul li:first-child').appendTo('#imageSlider > ul');                        
          }); 
          setTimeout(function(){
            $slider.find('> ul').animate({opacity: 1.0}, effectDuration);
          }, effectDuration);
        }
      
        if (slideEffect == "slide" && slideCount != 1) {

          // fix problem with animation when there is only 2 slides.
          if (slideCount == 2) {
            $slider.find('> ul').css({"margin-left":"0px"});
            $slider.find('> ul li:first-child').appendTo('#imageSlider > ul');

            $slider.find('> ul').animate({             
               left: - slideWidth
            }, effectDuration, function () {
                $slider.find('> ul li:first-child').appendTo('#imageSlider > ul');          
                $slider.find('> ul').css('left', '0');          
            });
            
            setTimeout(function(){
              $slider.find('> ul').css({"margin-left":"-"+slideWidth+"px"});
              $slider.find('> ul li:first-child').appendTo('#imageSlider > ul');
            }, effectDuration);

          } else {
            // if more than two slides do this...
            $slider.find('> ul').animate({             
               left: - slideWidth
            }, effectDuration, function () {
                $slider.find('> ul li:first-child').appendTo('#imageSlider > ul');          
                $slider.find('> ul').css('left', '0');          
            });
          }
        }

      if (setSlideHeights == true){
        setTimeout(function(){
          setTheHight(); 
        }, 420); 
      }
     
      // reset the effect duration back to its default
      effectDuration = savedEffectDuration; 
      if (useTimer == true) { //&& usePauseOnHover != true
        startTheTimer();        
    } 
    } // end moveRight();

    $('.control_prev').click(function () {      
      moveLeft();       
      clearRefreshInterval();
      if (usePauseOnHover == false) {
      setRefreshInterval();
    } 
    });

    $('.control_next').click(function () {      
      moveRight();
      clearRefreshInterval();
    if (usePauseOnHover == false) {
      setRefreshInterval();
    }     
    }); 

// this block of code is to change the slide if usePagination is set to true.
$('#slideBtns span').click(function () {  
  clearRefreshInterval();
  // the one you click on
   var numberFromCurrentClass = $(this).prevAll().length + 1; 
  
  // the one that is active
   var numberFromClickedToEnd = $("#slideBtns .slideBtns").prevAll().length + 1; 
  
  //remove old class and update to new position
  $("#slideBtns .slideBtns").removeClass("slideBtns");
  $(this).addClass("slideBtns");  
   //console.log("numberFromCurrentClass "+numberFromCurrentClass)
   //console.log("numberFromClickedToEnd "+numberFromClickedToEnd)
  // if i click on 1 but 2 is active becasue the clicked on is less than the active we need to call move left else move right by the amount of difference between the 2 numbers.
  if (numberFromCurrentClass < numberFromClickedToEnd) {
    var newNumber = numberFromClickedToEnd - numberFromCurrentClass; 
    //console.log("minus = "+newNumber)    
    for ( var i = 0; i < newNumber; i++ ) {     
        moveLeft("buttons already done",1);         
    }    
  } else {
    var newNumber = numberFromCurrentClass - numberFromClickedToEnd;  
    //console.log("plus = "+newNumber)    
    for ( var i = 0; i < newNumber; i++ ) {         
    moveRight("buttons already done",1);          
    }    
  }
  if (usePauseOnHover == false) {
    setRefreshInterval();
  }        
});
// height doesnt get set sometimes so just makeing sure it does here.
if (setSlideHeights == true){
  setTheHight();
  refreshIntervalHeights = setInterval( goDoSetHeights, 11000);
  function goDoSetHeights(){ 
    setTheHight();
  } 
}
$slider.fadeIn(800);

// images smaller than the maxSlideWidth will break the responsive bits so makeing sure here     
$slider.find("> ul > li > ul img").each(function (){

  // get this original image dimensions: width and height 
  var newImg = new Image(); 
  newImg.src = $(this).attr('src');
  var originalImageHeight = newImg.height;
  var originalImageWidth = newImg.width;

  // force image width to be the slides max width
  $(this).width(maxSlideWidth); 
  var imageThreshold = 405;
  var maxThreshold = maxSlideHeight + imageThreshold;
  // stretch images that are too small in height and then only shrink the height if they fall within 275px of the max height
  if (originalImageHeight <= maxThreshold && originalImageHeight != maxSlideHeight) {
    console.log("image malformed! original width: "+originalImageWidth+", original height: "+originalImageHeight+" and is now malformed to this new width: "+maxSlideWidth+" and this new height: "+maxSlideHeight+" click the link below to see the original image: "+newImg.src+"\n");
    $(this).height(maxSlideHeight);
  }
  if (originalImageHeight > maxThreshold) {
      console.log("Original image is not able to be shrunk or stretched as it is not within the allowed threshold. Please make your image is within "+imageThreshold+"px of the allowed height ("+maxSlideHeight+"px).\n Your image height is "+originalImageHeight+". Image src: "+newImg.src);
  }
});

$slider.css({"transform-origin": "0px 0px 0px","-webkit-transform-origin":"0px 0px 0px"});
if (usePauseOnHover == true) {
    $slider.on("mouseenter", function() {
        clearRefreshInterval();
      if (useTimer == true) { 
        clearTheTimer();
      }       
    }).on("mouseleave", function() {
      clearRefreshInterval();   
        setRefreshInterval();
      if (useTimer == true) {
        clearTheTimer();
        startTheTimer();
    }
    });
}
if (usePausedTooltip == true && usePauseOnHover == true) {
  $('<p class="usePausedTooltip">Stopped.</p>').appendTo($slider);
  $slider.hover(function(){
    $('.usePausedTooltip').fadeIn('slow');
  }, function() {       
    $('.usePausedTooltip').fadeOut('slow');
  });
}
if (useHoverFade == true) {
  $("body").append('<div class="fadeHover"></div>');
  $slider.hover(function () {
    hoverInterval = setInterval(doSlideHover, hoverFadeWait);
    function doSlideHover(){
      $('.fadeHover').addClass("fadeHoverActive").stop().fadeTo( hoverFadeDuration, 0.6 );
    }
  }, function () {
    clearInterval(hoverInterval);
    $('.fadeHover').stop().fadeTo( hoverFadeDuration, 0 );
    setTimeout(function(){
    $('.fadeHover').removeClass("fadeHoverActive");
    }, hoverFadeDuration);
  });
}
slideCount = $slider.find('> ul li').length;
if (slideCount == 1) { childPosition = 1; } else { childPosition = 2; };
slideWidth = $slider.parent().width();
$slider.css({ width: maxSlideWidth, height: maxSlideHeight });

sliderUlWidth = slideCount * maxSlideWidth;
if (slideCount != 1) {    
  $slider.find('> ul').css({ width: sliderUlWidth, marginLeft: - maxSlideWidth });
}
imageSliderResizeMyWindow();  // beam her up scotty
setRefreshInterval();
 // Ie 8 doesnt load the function uless we wait
setTimeout(function(){
  imageSliderResizeMyWindow();
  // This messes with the fade in effect so lets wait before adding it.
  // This adds an ease animation that makes the slider look nice when it grows or shrinks
  $slider.css({"transition":"all 0.4s ease-in-out","-webkit-transition":"all 0.4s ease-in-out","-moz-transition":"all 0.4s ease-in-out","-o-transition":"all 0.4s ease-in-out"})
      .parent().css({"transition":"all 0.4s ease-in-out","-webkit-transition":"all 0.4s ease-in-out","-moz-transition":"all 0.4s ease-in-out","-o-transition":"all 0.4s ease-in-out"});
}, 1000);
$slider.swiperight(function() {
    clearRefreshInterval();
    moveLeft();
    setRefreshInterval(); 
});
$slider.swipeleft(function() {
    clearRefreshInterval();
    moveRight();
    setRefreshInterval(); 
}); 
});
} ) ( jQuery );