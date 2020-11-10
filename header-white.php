


<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package test
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>

    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2.0">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <script>document.getElementsByTagName("html")[0].className += " js";</script>

	<?php wp_head(); ?>
</head>

<body <?php body_class( '' ); ?>>
<header class="header-v3 bg-secondary position-relative js-header-v3 padding-top-lg padding-top-xl@md">
  <div class="header-v3__container bg-secondary container max-width-lg">
    <div class="header-v3__logo">
      <a href="/">
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logowhite.png" alt="jobsy agencja pracy praca tymczasowa">
      </a>
    </div>

    <button class="reset header-v3__nav-control switch-icon switch-icon--slide-down js-switch-icon js-toggle-menu js-tab-focus" aria-label="Toggle menu">
      <svg class="switch-icon__icon switch-icon__icon--a" viewBox="0 0 16 16">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1">
          <line x1="0.5" y1="3.5" x2="15.5" y2="3.5"></line>
          <line x1="0.5" y1="8.5" x2="15.5" y2="8.5"></line>
          <line x1="0.5" y1="13.5" x2="15.5" y2="13.5"></line>
        </g>
      </svg>
      <svg class="switch-icon__icon switch-icon__icon--b" viewBox="0 0 16 16">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1">
          <line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line>
          <line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line>
        </g>
      </svg>
    </button>

    <nav class="header-v3__nav" role="navigation">
      <ul class="header-v3__nav-list">
        <div>
        <li class="header-v3__nav-item header-v3__nav-item--logo flex-shrink-0">
          <div class="header-v3__logo">
            <a href="#0">
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logowhite.png" alt="jobsy agencja pracy praca tymczasowa">
            </a>
          </div>
        </li>
        </div>
        <div class="flex"> 
        <div class="navigation-items">
        <li class="header-v3__nav-item"><a href="#0" class="header-v3__nav-link">Dla Pracownika</a></li>
        <li class="header-v3__nav-item"><a href="#0" class="header-v3__nav-link">Dla Firm</a></li>
        <li class="header-v3__nav-item"><a href="#0" class="header-v3__nav-link">O Nas </a></li>
      </div>
      <div>
      <!-- <a href="#0" class="btn  btn--register margin-left-xl"><span>Zarejestruj się</span> </a>
      <a href="#0" class="btn  btn--register margin-left-xs"><span>Zaloguj się</span> </a> -->
      </div>
        </div>
     
      </ul>
    </nav>
  </div>
</header>