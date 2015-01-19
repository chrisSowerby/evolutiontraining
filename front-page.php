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
$i = 0;
while ( $service->fetch() ) {
$i++;
$name = $service->field( 'name_of_training' );
$services_photo = $service->field( 'image_for_this_type_of_training' );
//$page_url = $service->field( 'permalink' );
$page_url = $service->field( 'url_to_a_sub_page' );
$plain_text_description = $service->field( 'training_description' );
if ($i == 1) {
echo '<div class="row">';
}
if ($i %4 == 0) { // if divisable by 4
echo '<div class="row">';
  }
  ?>
  <div class="col-md-4">
    <div class="courseOutput">
      <div class="shadowLeft"></div>
      <div class="shadowRight"></div>
      <div class="courseOutputTitle">
        <h3>
        <a href="<?php echo esc_url($page_url); ?>">
          <?php echo $name; ?>
        </a>
        </h3>
      </div>
      <?php // options: original, thumbnail 150px, medium 300px, large 1024px
      $services_photo_url    = pods_image_url ( $services_photo, $size = 'medium', $default = 0, $force = false ); ?>
      <img src="<?php echo $services_photo_url; ?>">
      <p><?php echo $plain_text_description;?></p>
    </div>
  </div>
  <?php
  if ($i %3 == 0) {
echo '</div>';
}
}
}
if ( $service->total() == 5 || $service->total() == 8 || $service->total() == 11 || $service->total() == 14 || $service->total() == 17) {
?>
<div class="col-md-4">
    <div class="courseOutput">
      <div class="shadowLeft"></div>
      <div class="shadowRight"></div>
      <div class="courseOutputTitle">
        <h3>New Course coming soon...</h3>
      </div>
            <img src="<?php echo get_template_directory_uri()."/assets/img/6.png"; ?>">
      <p>We have plans to add new courses in the future. Please check back here soon. If you have a course request please fill out a form on the contact us page.</p>
    </div>
  </div>
<?php
}
// Display the pagination
//echo $service->pagination();
?>
<?php // row ?>
</div>
<div class="row">
<div class="col-md-12">
<?php if (have_posts()) {
while (have_posts()) {
the_post(); // infinite loop if removed


//the_title(''); // page name


// video
?>
<div id="headingHere" class="main-content"> </div>



<div id="player" style="display:none;">
<iframe id="homeVideo" style="width:100%; height:420px;" src="//www.youtube.com/embed/<?php if(dynamic_sidebar('homepage_video')) : else : endif; ?>" allowfullscreen></iframe>
</div>

<div class="vidCover"> 
<img class="theCover img-responsive" src="<?php echo get_template_directory_uri()."/assets/img/vidcover.png"; ?>" alt="click image to play video." />
<img class="img-responsive" src="<?php echo get_template_directory_uri()."/assets/img/vidimage.png"; ?>" alt="screenshot of video" />
</div>





<div class="main-content"> <?php
the_content(); // text from wizzywig
?> </div> <?php


}
} ?>
<?php // col 12 ?>
</div>

<?php // row ?>
</div>
<?php // container ?>
</div>

<br>
<div class="redBarHere">
<div class="container">
<div class="row">
  
  <div class="col-md-12">
    <p>Group Companies</p>
    <?php // col-md-12 ?>
  </div>
  <?php // row ?>
</div>
<?php // container ?>
</div>
</div>

<div class="container">
<div class="row">  
  <div class="col-md-12">
    <div class="groupImages"><a href="http://evolutionforwarding.co.uk"><img class="img-responsive"src="<?php echo get_template_directory_uri()."/assets/img/forwarding.png"; ?>"></a></div>
    <div class="groupImages"><a href="http://evolutionhazpack.co.uk"><img class="img-responsive"src="<?php echo get_template_directory_uri()."/assets/img/hazpack.png"; ?>"></a></div>
  </div>
  <?php // row ?>
</div>
<?php // container ?>
</div>
