<?php get_template_part('templates/page', 'header'); ?>

<?php
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


?>



