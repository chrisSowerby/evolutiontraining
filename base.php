<?php get_template_part('templates/head'); ?>
<body <?php body_class(); ?>>

  <!--[if lt IE 9]>
    <div class="alert alert-warning">
      <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'roots'); ?>
    </div>
  <![endif]-->

  <?php
    do_action('get_header');
    get_template_part('templates/header');
  ?>
   
      <?php if (roots_display_sidebar()) { ?>
        <div class="container paddingFooterPush">
            <div class="row">
              <div class="col-md-8">
                  <?php  include roots_template_path();?>
              </div>

              <div class="col-md-4">
                  <?php  include roots_sidebar_path();?>
              </div>
            </div>
        </div>
      <?php } else { ?>

         <?php include roots_template_path();?>

      <?php } ?>
    </div><!-- /.content -->
  </div><!-- /.wrap -->

  <?php get_template_part('templates/footer'); ?>

  <?php wp_footer(); ?>

</body>
</html>
