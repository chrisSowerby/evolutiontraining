<footer id="system-footer" class="content-info" role="contentinfo">
  <div class="container">
    <?php dynamic_sidebar('sidebar-footer'); ?>
	<div class="bottomMenu">
              <?php wp_nav_menu( array( 'theme_location' => 'secondary' ) ); ?>  
              <?php wp_nav_menu( array( 'theme_location' => 'footer_two' ) ); ?> 
    </div>
  </div>
</footer>
