/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */



(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages


    // make multi dropdowns work
    $(".dropdown-submenu > a").first().attr("dropdown-toggle","dropdown").addClass("dropdown-toggle");
    $(".dropdown-submenu > a").append('<b class="caret"></b>'); 

    $(".dropdown-submenu > a").first().click(function(){
      if ($(this).parent().hasClass("open")) {
        $(this).parent().removeClass("open");
      } else {
        $(this).parent().addClass("open");
      }

      return false;
    });

    // make footer go to the bottom of page...
    var windowHeight = $(window).height();
    var systemHeader = $("#system-header").outerHeight(); // outerHeight gets any padding or borders as well
    var systemBody = $("#system-body").outerHeight();
    var systemFooter = $("#system-footer").outerHeight();
    var overallHeight = systemHeader + systemBody + systemFooter;
    
    console.log("systemHeader : "+systemHeader);
    console.log("systemBody : "+systemBody);
    console.log("systemFooter : "+systemFooter);


      if (overallHeight < windowHeight) {
          var paddingPush = windowHeight - overallHeight;
          $("#system-body").css("padding-bottom", paddingPush+"px");

      }

    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page




$('.main-content > h1').first().prependTo("#headingHere");



$('.vidCover img').click(function() {
$('.vidCover img, .vidCover').fadeOut(400);
$("#homeVideo")[0].src += "?rel=0;&autoplay=1";
$('#player').delay(400).fadeIn(1200);
});

/*setTimeout(function(){
$( "#imageID" ).trigger( "click" );
}, 2500);*/





    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
