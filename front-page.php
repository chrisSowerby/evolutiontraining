<?php 
get_template_part('templates/page', 'header');
wp_enqueue_script( 'jquery-mobile' );
wp_enqueue_script( 'chris-sowerby-slider' );
?>

<?php
//IMAGE SLIDER
     $params = array(
        'limit'   => 4, // use -1 for all 
        'orderby' =>'date DESC' // newest first
        // you can change the pods publish date in the dashboard to change order 
     );
     $service = pods( 'homepage_slider', $params );

     if ( 0 < $service->total() ) { // if more than 1 found

?>
  <div id="imageSliderParent"> <!-- This is the parent div. Keep it here -->
  <!--[if lt IE 9 ]> <div class="imageSliderDoomsDay" id="imageSlider"> <![endif]-->
  <!--[if (gt IE 8)|!(IE)]><!--> <div id="imageSlider"> <!--<![endif]-->
      <ul>




<?php
  while ( $service->fetch() ) {
    $title = $service->field( 'slide_title' );    
    $page_url = $service->field( 'url_to_a_sub_page' );
    $plain_text_description = $service->field( 'slide_description' );
    $services_photo = $service->field( 'slide_photo' );
    // options: original, thumbnail 150px, medium 300px, large 1024px
    $services_photo_url    = pods_image_url ( $services_photo, $size = 'image-slider', $default = 0, $force = true ); 
?>     

    <li>
        <ul>               
            <img class="img-responsive" src="<?php echo $services_photo_url; ?>" alt="">               
                <div class="inside-slide">                     
                    <h2>slide name</h2>               
                    <p>Short Description<a href="<?php echo esc_url($page_url); ?>"> . Find out more.</a></p>           
                </div>
        </ul>
    </li>












<?php
  } // loop





?>
      </ul>
      <div id="slideBtns"></div>
  </div>
</div>
<?php
     } // if any slides










//SERVICES BOXES
// for help see https://gist.github.com/Shelob9/7832561
/*$params = array(
      'search' => false,      
      'limit' => -1,
      'orderby' =>'name ASC' // or date DESC
)*/ 

     $params = array(
        'limit'   => 4, // use -1 for all 
        'orderby' =>'date DESC' // newest first
        // you can change the pods publish date in the dashboard to change order 
     );
     $service = pods( 'training_service', $params );

     if ( 0 < $service->total() ) { // if more than 1 found
          while ( $service->fetch() ) {

    $name = $service->field( 'name_of_training' );
    $services_photo = $service->field( 'image_for_this_type_of_training' );
    $page_url = $service->field( 'permalink' );
    $plain_text_description = $service->field( 'training_description' );

?>
     

    <h2>
      <a href="<?php echo esc_url($page_url); ?>">
         <?php echo $name; ?>
      </a>
    </h2>
    <?php // options: original, thumbnail 150px, medium 300px, large 1024px
    $services_photo_url    = pods_image_url ( $services_photo, $size = 'medium', $default = 0, $force = false ); ?>   
    <img src="<?php echo $services_photo_url; ?>">

    <br>
<?php
          } 
     } 

// Display the pagination
echo $service->pagination();

?>



