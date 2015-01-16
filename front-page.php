<?php 
get_template_part('templates/page', 'header');
wp_enqueue_script( 'jquery-mobile' );
wp_enqueue_script( 'chris-sowerby-slider' );
?>

<!--[if gte IE 9]>
  <style type="text/css">
    .gradient {
       filter: none;
    }
  </style>
<![endif]-->
<div class="sliderGradient gradient">
<div class="container"> 
<div class="row">

<div class="col-md-12">
<div class="themeSlider">
<?php
//IMAGE SLIDER
     $params = array(
        'limit'   => 4, // use -1 for all 
        'orderby' =>'date ASC' // ASC = oldest first, DESC = newest first, 
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
    $image_size_type = $service->field( 'crop_image_if_too_big_to_fit' ); 
    if ($image_size_type == 1){
      //crop image if too big to fit = yes
      $image_size_type = "image-slider-crop";
    }
    else if ($image_size_type == 0){
      //crop image if too big to fit = no
      $image_size_type = "image-slider-shrink";
    }

    // options: original, thumbnail 150px, medium 300px, large 1024px
    //$services_photo_url    = pods_image_url ( $services_photo, $size = $image_size_type, $default = 0, $force = true );

    $thumbnail = pods_image( 
        $services_photo,
        $image_size_type,
        0,
        array(
            'alt' => trim(strip_tags($title))            
        ),
        true
    );

?>     

    <li>
        <ul>
            <?php echo $thumbnail; ?>             
           <!--  <img class="img-responsive" src="<?php echo $services_photo_url; ?>" alt=""> -->               
                <div class="inside-slide">                     
                    <h3><?php echo $title;?></h3>               
                    <p><?php echo $plain_text_description;?>. <a href="<?php echo esc_url($page_url); ?>">Find out more.</a></p>           
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
?>
<?php // themeSlider ?>
</div>

<?php // col-md-12 ?>
</div>

<?php // row ?>
</div> 

<?php // container ?>
</div>

<?php // gradient ?>
</div>

<div class="redBarHere">
  <div class="container"> 
    <div class="row">
        
        <div class="col-md-12">

            <p>Our Courses</p>

        <?php // col-md-12 ?>
        </div>

    <?php // row ?>
    </div> 

  <?php // container ?>
  </div>
</div>


<div class="container"> 
<div class="row">


<?php
//SERVICES BOXES
// for help see https://gist.github.com/Shelob9/7832561
/*$params = array(
      'search' => false,      
      'limit' => -1,
      'orderby' =>'name ASC' // or date DESC
)*/ 

     $params = array(
        'limit'   => 6, // use -1 for all 
        'orderby' =>'date ASC' // ASC = oldest first, DESC = newest first,
        // you can change the pods publish date in the dashboard to change order 
     );
     $service = pods( 'training_service', $params );

     if ( 0 < $service->total() ) { // if more than 1 found
          while ( $service->fetch() ) {

    $name = $service->field( 'name_of_training' );
    $services_photo = $service->field( 'image_for_this_type_of_training' );
    //$page_url = $service->field( 'permalink' );
    $page_url = $service->field( 'url_to_a_sub_page' );
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
    <p><?php echo $plain_text_description;?></p>

    
<?php
          } 
     } 

// Display the pagination
echo $service->pagination();
?>

<?php if (have_posts()) {
  while (have_posts()) {
    the_post(); // infinite loop if removed
    the_content(); // text from wizzywig
    the_title(''); // page name
  }
} ?>

<?php // row ?>
</div> 
<?php // container ?>
</div>