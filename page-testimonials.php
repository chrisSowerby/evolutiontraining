<?php while (have_posts()) : the_post(); ?>


    <div id="testimonialsPageMove">	
      <?php get_template_part('templates/page', 'header'); ?>
      <?php get_template_part('templates/content', 'page'); ?>
    </div>

    <?php if(dynamic_sidebar('testimonials')) : else : endif; ?>


<?php endwhile; ?>

