<?php while (have_posts()) : the_post(); ?>
<div class="container">
	<div class="row">

<div id="contactPageMove">	
  <?php get_template_part('templates/page', 'header'); ?>
  <?php get_template_part('templates/content', 'page'); ?>
</div>

        <div class="contact-us-section">        
          <div class="clearfix">
          <div class="col-md-4">
           
              <div id="formDestination" class="contact-padding contact-page-form">
              <h3>Email us</h3>
              <br>
             
              </div>
           
          </div>
          <div class="col-md-4">
            <div id="mapDestination" class="map">
            	<h3>Find us</h3>
            	<br>
            </div>
          </div>
          <div class="col-md-4">
            <div id="mainContentDestination" class="contact-details">
            <h3>Our details</h3>
            <br>            

            </div>
          </div>
          </div>
        
        </div>


</div> 
</div>  
<?php endwhile; ?>

