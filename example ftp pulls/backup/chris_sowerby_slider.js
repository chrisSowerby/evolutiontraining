//jquery by helpchrisplz - chris sowerby
//var $ = jquery.noConflict();
//also loading skin\frontend\rwd\default\js\slider\jquery.mobile.custom.touch.min.js for swipe detection.
( function($) {

$(document).ready(function () {
// this is for scaleing but last i checked it doesnt work.
/* if (typeof jQuery.ui == 'undefined') {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js";
  $("head").append(s);
} */

});

$(window).load(function () {
$autoSlideChange = 999000;
$effectDuration = 450; 
$childNumbers = 0; // this must be 0
$useSlideBtns = true;
$setSlideHeights = false;
$slideEffect = "fade"; // fade or slide

var refreshInterval;
var refreshIntervalHeights; 

if ($useSlideBtns == true) {  
  $('#imageSlider > ul li').each(function(){  
    $childNumbers++;   

    //var addSlideBtn = "<span class='slidechildNumber"+$childNumbers+"'>"+$childNumbers+"</span>";
    var addSlideBtn = "<span class='fullWidthImage"+$childNumbers+"'></span>";
    
    //#slideBtns span
    $j(this).addClass('fullWidthImage'+$childNumbers);
   $('#slideBtns').append(addSlideBtn);
  });
  $("#slideBtns span:nth-child(1)").addClass("slideBtns");
  if ($childNumbers == 1) { $("#slideBtns").css({"display":"none"}); };
}


  
  //call resizeMyWindow function when the window is resized
var imageSliderResizeTimer;
$(window).resize(function() {
    clearTimeout(imageSliderResizeTimer);
    imageSliderResizeTimer = setTimeout(imageSliderResizeMyWindow, 100); 
});

function imageSliderResizeMyWindow() {

  slideCount = $('#imageSlider > ul li').length;  
  slideWidth = $('#imageSlider > ul li').width();
  
  var theParentWidth = $("#imageSlider").parent().width(); 
 
  slideWidth = theParentWidth; 
  $('#imageSlider > ul li').css("width",slideWidth); 

   if (slideCount == 1) { childPosition = 1; } else { childPosition = 2; }; 
   
   slideHeight = $("#imageSlider > ul > li:nth-child(" + childPosition + ") > ul .img-responsive").height();
   sliderUlWidth = slideCount * slideWidth;
  
  $('#imageSlider, #imageSlider ul > li').css({ width: slideWidth, minHeight: slideHeight });
  if ($(window).width() < 600) {
    $('#imageSlider iframe').css({ width: slideWidth, minHeight: slideHeight });
  }

/*    slideHeight = $("#imageSlider > ul > li:nth-child(" + childPosition + ") > ul .inside-slide").height() + 149;
  $('#imageSlider ul > li').css({height: slideHeight});*/
    
  if (slideCount != 1) {
    // need to plus height of inside-slide-video h2 and p
    $('#imageSlider > ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
  };
  //$('#imageSlider iframe').effect('scale', {scale:'content',percent:98}); // 
  
}
  $('#imageSlider > ul li:last-child').prependTo('#imageSlider > ul');

imageSliderResizeMyWindow(); 
  

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
  slideHeight = $("#imageSlider > ul > li:nth-child(" + childPosition + ") > ul").height() + 20;
  $('#imageSlider').animate({            height: slideHeight        }, 100);
  
}    

    function moveLeft(no) {        
        if (!no) {
          doNextBtnLeft();
        }  
        if ($slideEffect == "fade" && slideCount != 1) {
          $('#imageSlider > ul').animate({ 
              opacity: 0.0
          }, $effectDuration, function () {
              $('#imageSlider > ul li:last-child').prependTo('#imageSlider > ul');             
          });
          setTimeout(function(){
          	$('#imageSlider > ul').animate({opacity: 1.0}, $effectDuration);
          }, $effectDuration);
        }
        if ($slideEffect == "slide" && slideCount != 1) {
          $('#imageSlider > ul').animate({
              left: + slideWidth
          }, $effectDuration, function () {
              $('#imageSlider > ul li:last-child').prependTo('#imageSlider > ul');
              $('#imageSlider > ul').css('left', '0');
          }); 
        }
      if ($setSlideHeights == true){
        setTimeout(function(){ 
          setTheHight();
        }, 420);      
      }
    };

    function moveRight(no) { 
        if (!no) {
          doNextBtnRight();
        } 
      
        if ($slideEffect == "fade" && slideCount != 1) {          
          $('#imageSlider > ul').animate({
             opacity: 0.0           
          }, $effectDuration, function () {
              $('#imageSlider > ul li:first-child').appendTo('#imageSlider > ul');                        
          }); 
          setTimeout(function(){
          	$('#imageSlider > ul').animate({opacity: 1.0}, $effectDuration);
          }, $effectDuration);
        }
      
        if ($slideEffect == "slide" && slideCount != 1) {

        	// fix problem with animation when there is only 2 slides.
	        if (slideCount == 2) {
	        	$('#imageSlider > ul').css({"margin-left":"0px"});
	        	$('#imageSlider > ul li:first-child').appendTo('#imageSlider > ul');

	          $('#imageSlider > ul').animate({             
	             left: - slideWidth
	          }, $effectDuration, function () {
	              $('#imageSlider > ul li:first-child').appendTo('#imageSlider > ul');          
	              $('#imageSlider > ul').css('left', '0');          
	          });
	          
	          setTimeout(function(){
		          $('#imageSlider > ul').css({"margin-left":"-"+slideWidth+"px"});
		          $('#imageSlider > ul li:first-child').appendTo('#imageSlider > ul');
	          }, $effectDuration);

	        } else {
	        	// if more than two slides do this...
	          $('#imageSlider > ul').animate({             
	             left: - slideWidth
	          }, $effectDuration, function () {
	              $('#imageSlider > ul li:first-child').appendTo('#imageSlider > ul');          
	              $('#imageSlider > ul').css('left', '0');          
	          });
	      	}
        }

      if ($setSlideHeights == true){
        setTimeout(function(){
          setTheHight(); 
        }, 420); 
      }
    };

    $('.control_prev').click(function () {       
      clearInterval(refreshInterval);
      moveLeft();
      refreshInterval = setInterval( update, $autoSlideChange);
    });

    $('.control_next').click(function () {
      clearInterval(refreshInterval);
      moveRight();
      refreshInterval = setInterval( update, $autoSlideChange); 
    }); 

// this block of code is to change the slide if $useSlideBtns is set to true.
$('#slideBtns span').click(function () {  
  clearInterval(refreshInterval);
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
      if (i == 1) {
        moveLeft("no"); 
      } else {
        setTimeout(function(){ 
          moveLeft("no"); 
        }, 1000);
      }          
    }
    
  } else {
    var newNumber = numberFromCurrentClass - numberFromClickedToEnd;  
    //console.log("plus = "+newNumber)
    
    for ( var i = 0; i < newNumber; i++ ) {         
      if (i == 1) {
        moveRight("no");
      } else {
        setTimeout(function(){
          
          moveRight("no");
        }, 1000);
      }          
    }
    
  }          
        refreshInterval = setInterval( update, $autoSlideChange);    
});


refreshInterval = setInterval( update, $autoSlideChange);

if ($setSlideHeights == true){
setTheHight();
}

function update(){    
      moveRight();
}

// height doesnt get set sometimes so just makeing sure it does here.
if ($setSlideHeights == true){
  refreshIntervalHeights = setInterval( goDoSetHeights, 11000);
  function goDoSetHeights(){ 
    setTheHight();
  }
}


$('#imageSlider').fadeIn(800);
$("#imageSlider").swiperight(function() {
    clearInterval(refreshInterval);
    moveLeft();
    refreshInterval = setInterval( update, $autoSlideChange); 
});
$("#imageSlider").swipeleft(function() {
    clearInterval(refreshInterval);
    moveRight();
    refreshInterval = setInterval( update, $autoSlideChange); 
}); 

});

} ) ( jQuery );