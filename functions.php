<?php
// Defines
define( 'LC_DIR', get_stylesheet_directory() );
define( 'LC_LIB', LC_DIR . '/lib' );
define( 'LC_LIB_CLASS', LC_LIB . '/classes' );
define( 'LC_HELP_CLASS', LC_LIB . '/helpers' );
define( 'LC_URI', get_stylesheet_directory_uri() );
define( 'LC_URI_ASSETS', LC_URI . '/assets' );
define( 'LC_URI_CSS', LC_URI_ASSETS . '/css' );
define( 'LC_URI_JS', LC_URI . '/js' );

// Classes
require_once LC_LIB_CLASS . '/class.theme.php';


// Run theme
//$LC_theme = new LC_Theme();
//$LC_theme->run();



function codyframe_ie_support() {
	?>
	<script>if(! ('CSS' in window) || !CSS.supports('color', 'var(--color-var)')) {var cfStyle = document.getElementById('codyframe-css');if(cfStyle) {var href = cfStyle.getAttribute('href');href = href.replace('style.css', 'style-fallback.css');cfStyle.setAttribute('href', href);}}</script>
	<?php
}









