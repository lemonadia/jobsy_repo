<?php get_header(); ?>

    <div class="container max-width-md padding-top-xxl padding-bottom-lg">
        <?php
        while ( have_posts() ) : the_post(); ?>
        <?php endwhile; // End of the loop.
        ?>
    </div>

<?php get_footer();