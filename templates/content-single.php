<?php while (have_posts()) : the_post(); ?>

   

  <article <?php post_class(); ?>>
    <header>
      <h1 class="entry-title"><?php the_title(); ?></h1>
      

<?php

// check if the post has a Post Thumbnail assigned to it.
if ( has_post_thumbnail() ) {
  the_post_thumbnail();
}

/*the_post_thumbnail('thumbnail');       // Thumbnail (default 150px x 150px max)
the_post_thumbnail('medium');          // Medium resolution (default 300px x 300px max)
the_post_thumbnail('large');           // Large resolution (default 640px x 640px max)
the_post_thumbnail('full');            // Original image resolution (unmodified)

the_post_thumbnail( array(100,100) );  // Other resolutions*/
?>
    </header>
    <div class="entry-content">
      <?php the_content(); ?>
    </div>
    <footer>
      <?php wp_link_pages(array('before' => '<nav class="page-nav"><p>' . __('Pages:', 'roots'), 'after' => '</p></nav>')); ?>
    </footer>
    <?php comments_template('/templates/comments.php'); ?>
  </article>
<?php endwhile; ?>


<?php
    //get Pods object for current post
    $service = pods( 'training_service', get_the_id());
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
    <p><?php echo $plain_text_description; ?></p>




<!-- <ul class="featuredWrapper">

<?php
  /*$pageID = get_the_id();
  $params = array(
    'where'=>"display.ID = $pageID",
    'limit'=>1);
  $features = pods( 'feature', $params );*/
?>

  <li class="featuredBox featured1">
    <?php //while ( $features->fetch() ) : ?>
      <div class="text"><?php //echo $features->display( 'post_title' ); ?></div>
        <?php //echo $features->display( 'post_content' ); ?>
    <?php // endwhile ?>
  </li>
</ul> -->

<?php get_template_part('templates/entry-meta'); ?>