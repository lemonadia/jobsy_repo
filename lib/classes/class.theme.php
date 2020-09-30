<?php

class LESSCODE_Theme {
	
	public function run() {
		add_filter( 'mb_settings_pages', array( &$this, 'load_options' ) );
		add_action( 'wp_enqueue_scripts', array( &$this, 'enqueue_scripts' ), 1000 );
        add_filter('upload_mimes', array( &$this, 'cc_mime_types'));

	}
	
	// public function lc_theme_textdomain() {
	// 	load_theme_textdomain( 'lc', get_template_directory() . '/languages' );
	// }
	
	public function enqueue_scripts() {
		$theme_version = wp_get_theme()->get( 'Version' );
		wp_enqueue_style( 'codyframe', get_template_directory_uri() . '/assets/css/lc.css', array(), $theme_version );
		wp_enqueue_script( 'codyframe', get_template_directory_uri() . '/assets/js/scripts.js', array(), $theme_version, true );
		wp_deregister_script( 'jquery' );
		wp_enqueue_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', array(), '', false );
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
	

	// Allow SVG
    public function cc_mime_types($mimes) {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }
	
	
	// Register Menu
	public function register_primary_menu() {
		register_nav_menu( 'izo_primary', __( 'Primary Menu', 'izo' ) );
		register_nav_menu( 'izo_mobile', __( 'Mobile Menu', 'izo' ) );
	}
	
}