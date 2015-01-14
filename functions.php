<?php
/**
 * Roots includes
 *
 * The $roots_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 * @link https://github.com/roots/roots/pull/1042
 */
$roots_includes = array(
  'lib/utils.php',           // Utility functions
  'lib/init.php',            // Initial theme setup and constants
  'lib/wrapper.php',         // Theme wrapper class
  'lib/sidebar.php',         // Sidebar class
  'lib/config.php',          // Configuration
  'lib/activation.php',      // Theme activation
  'lib/titles.php',          // Page titles
  'lib/nav.php',             // Custom nav modifications
  'lib/gallery.php',         // Custom [gallery] modifications
  'lib/scripts.php',         // Scripts and stylesheets
  'lib/extras.php',          // Custom functions
);

foreach ($roots_includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion', 'roots'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);

/*x_crop_position accepts 'left' 'center', or 'right'
y_crop_position accepts 'top', 'center', or 'bottom'*/
add_image_size( 'image-slider-shrink', 1140 ); // fit to this width with unlimited height
add_image_size( 'image-slider-crop', 1140, 450, array( 'center', 'center' ) ); // Hard crop
add_theme_support( 'image-slider-shrink' );
add_theme_support( 'image-slider-crop' );
add_theme_support( 'post-thumbnails' ); 

//register css and js
//see this for help: http://code.tutsplus.com/articles/how-to-include-javascript-and-css-in-your-wordpress-themes-and-plugins--wp-24321
function wptuts_scripts_important()
{
    // Deregister the included library
    //wp_deregister_script( 'jquery' );     
    // Register the library again from Google's CDN
    //wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', array(), null, false );
     
    // Register the script like this for a plugin:
    //wp_register_script( 'custom-script', plugins_url( '/js/custom-script.js', __FILE__ ), array( 'jquery' ) );
    // or
    // Register the script like this for a theme:
    wp_register_script( 'chris-sowerby-slider', get_template_directory_uri() . '/assets/js/chris-sowerby-slider.js', array( 'jquery' ), '20140112', true); // version | true = footer
    wp_register_script( 'jquery-mobile', get_template_directory_uri() . '/assets/js/jquery-mobile-1-4-5.js', array(), '20140112', true); // version | true = footer
 
    //use this in your theme template to add the script on that page:  wp_enqueue_script( 'chris-sowerby-slider' );
    // For either a plugin or a theme, you can then enqueue the script:
    
}
add_action('wp_enqueue_scripts', 'wptuts_scripts_important', 999); // last param is position in page