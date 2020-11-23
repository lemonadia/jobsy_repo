<?php
/*
* Template Name: Homepage
*/
?>
<?php get_header(); ?>

<section class="justify-center flex items-center bg-primary hero-hp">
    <div class="container max-width-lg">
        <div class="grid gap-md@lg">
            <div class="col-5@md flex flex-column justify-center padding-top-md">
                <h1 class="padding-bottom-xxs">Jobsy, pracownicy tymczasowi, na których możesz polegać.</h1>
                <p>Zatrudniaj pracowników lub zdobądź pracę dorywczą. <span>Łatwiej i szybciej</span>, niż kiedykolwiek.
                </p>
                <div class="padding-top-lg">
                    <a href="" class="btn btn--black margin-bottom-xs margin-right-sm"><span>Szukam pracy</span></a>
                    <a href="" class="btn btn--transparent"><span>Jestem pracodawcą</span></a>
                </div>
            </div>
            <img class="hero-image" src="<?php echo get_stylesheet_directory_uri(); ?>/images/hero-home.png"
                alt="chłopak w okularach">

        </div>
    </div>
</section>

<section class="sectors padding-top-xxl padding-bottom-xxl position-relative">
    <div class="container max-width-lg">
        <h1 class="text-center padding-bottom-xxs">Szeroki wybór sektorów pracy</h1>
        <p class="text-center">Działamy w zróżnicowanych branżach.</p>
        <div class="flex justify-center items-center padding-top-xl">
            <div>
                <div class="sectors-icons">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/talerz.png">
                    <h4 class="padding-top-xs">Catering</h4>
                </div>
                <div class="sectors-icons">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/megafon.png">
                    <h4 class="padding-top-xs">Catering</h4>
                </div>
                <div class="sectors-icons">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/mapa.png">
                    <h4 class="padding-top-xs">Catering</h4>
                </div>
                <div class="sectors-icons">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/torba.png">
                    <h4 class="padding-top-xs">Catering</h4>
                </div>
                <div class="flex justify-center padding-top-xl">
                    <div class="sectors-icons">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/restaurant.png">
                        <h4 class="padding-top-xs">Catering</h4>
                    </div>
                    <div class="sectors-icons">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/domy.png">
                        <h4 class="padding-top-xs">Catering</h4>
                    </div>
                    <div class="sectors-icons">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/spinacz.png">
                        <h4 class="padding-top-xs">Catering</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="hp-blue bg-dark-blue padding-top-xl padding-top-xxxl@md padding-bottom-xxl">
    <div class="container max-width-lg">
        <div class="grid gap-md@md  flex flex-column flex-row@sm items-center">
            <div class="col-5@lg offset-1@md">
                <div class="div-size">
                    <img class="img-hp" src="<?php echo get_stylesheet_directory_uri(); ?>/images/conditions.png"
                        alt="dziewczyna kawa kawiarnia">
                </div>
            </div>
            <div class="col-5@lg">
                <h1 class="padding-top-md padding-top-0@md margin-bottom-md margin-bottom-sm@md">Pracuj na swoich
                    warunkach</h1>
                <div>
                    <ul>
                        <li class="list-rectangle padding-bottom-sm">
                            <span>Pobierz aplikację i otrzymuj spersonalizowane oferty pracy</span>
                        </li>
                        <li class="list-rectangle padding-bottom-sm">
                            <span>Sam określ stawkę,za jaką chcesz pracować</span>
                        </li>
                        <li class="list-rectangle padding-bottom-sm">
                            <span>Pozostaw nam załatwienie formalności związanych z umową</span>
                        </li>
                        <li class="list-rectangle padding-bottom-sm">
                            <span>Otrzymaj wynagrodzenie za pracę ju w 48 godzin od jej ukończenia</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
</section>

<section class="hp-blue-two bg-dark-blue padding-top-xl padding-bottom-xxxl">
    <div class="container max-width-lg">
        <div class="grid  gap-md@md flex flex-row@sm flex-column-reverse items-center">
            <div class="col-5@md offset-1">
                <h1 class="margin-bottom-md margin-bottom-sm@md margin-right-xxxs@md padding-top-md padding-top-0@md ">
                    Docieraj do najlepszych pracowników</h1>
                <div>
                    <ul>
                        <li class="list-rectangle padding-bottom-sm">
                            <span>Przeglądaj profile kandydatów</span>
                        </li>
                        <li class="list-rectangle padding-bottom-sm">
                            <span>Bezpłatnie zamieszczaj oferty pracy</span>
                        </li>
                        <li class="list-rectangle padding-bottom-sm">
                            <span>Oszczędzaj czas, pozostawiając nam formalności</span>
                        </li>
                        <li class="list-rectangle padding-bottom-sm">
                            <span>Zapłać dopiero w momencie, gdy znajdziesz odpowiednieko pracownika</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-5@lg">
                <img class="margin-left-xl@md img-hp"
                    src="<?php echo get_stylesheet_directory_uri(); ?>/images/hp-second.png"
                    alt="kobieta praca komputer">
            </div>
        </div>
</section>

<section class="announcments bg-secondary">
    <div class="announcments-container">
        <div class="grid">
            <div class="col-8@lg">
                <h1>Czym różni się Jobsy od portali ogłoszeniowych:</h1>
            </div>
        </div>
        <div class="grid gap-xl@md padding-top-lg">
            <div class="col-6@lg">
                <div class="padding-bottom-lg padding-right-lg@md">
                    <div class="flex items-center padding-bottom-xs flex-column flex-row@md">
                        <span class="ann-icon"><img
                                src="<?php echo get_stylesheet_directory_uri(); ?>/images/light.png"></span>
                        <h3>Jasne zasady</h3>
                    </div>
                    <div>
                        <p>Dzięki dokładnie sprecyzowanym i całkowicie transparentnym ofertom, dokładnie wiesz na czym
                            polega praca.</p>
                    </div>
                </div>
                <div></div>
            </div>
            <div class="col-6@lg">
                <div class="padding-bottom-lg padding-right-lg@md">
                    <div class="flex items-center padding-bottom-xs flex-column flex-row@md">
                        <span class="ann-icon"><img
                                src="<?php echo get_stylesheet_directory_uri(); ?>/images/money.png"></span>
                        <h3>Atrakcyjne stawki</h3>
                    </div>
                    <div>
                        <p>W Jobsy Ty decydujesz, na którą ofertę odpowiedzieć i za jaką stawkę pracować.</p>
                    </div>
                </div>
            </div>

        </div>
        <div class="grid gap-xl@md">
            <div class="col-6@lg">
                <div class="padding-bottom-lg padding-right-lg@md">
                    <div class="flex items-center padding-bottom-xs flex-column flex-row@md">
                        <span class="ann-icon"><img
                                src="<?php echo get_stylesheet_directory_uri(); ?>/images/award.png"></span>
                        <h3>Inwestycja w przyszłość</h3>
                    </div>
                    <div>
                        <p>Tworząc profil na Jobsy i zbierając opinie, budujesz swoją wiarygodność i zwiększasz szanse
                            na lepsze zarobki.</p>
                    </div>
                </div>
                <div></div>
            </div>
            <div class="col-6@lg">
                <div class="padding-bottom-lg padding-right-lg@md">
                    <div class="flex items-center padding-bottom-xs flex-column flex-row@md">
                        <span class="ann-icon"><img
                                src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-clock.png"></span>
                        <h3>Szybkie wynagrodzenie</h3>
                    </div>
                    <div>
                        <p>Już po 48 godzinach od realizacji zlecenia, wynagrodzenie znajdzie się na Twoim koncie.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid gap-xl@md">
            <div class="col-6@lg">
                <div class="padding-bottom-lg padding-right-lg@md">
                    <div class="flex items-center padding-bottom-xs flex-column flex-row@md">
                        <span class="ann-icon"><img
                                src="<?php echo get_stylesheet_directory_uri(); ?>/images/hand.png"></span>
                        <h3>Minimum formalności</h3>
                    </div>
                    <div>
                        <p>Umowy podpisywane są elektronicznie, a rozliczeniami zajmujemy się my. Ty możesz skupić się
                            wyłącznie na pracy.</p>
                    </div>
                </div>
                <div></div>
            </div>
            <div class="col-6@lg padding-left">
                <div class="padding-bottom-lg padding-right-lg@md">
                    <div class="flex items-center padding-bottom-xs flex-column flex-row@md">
                        <span class="ann-icon"><img
                                src="<?php echo get_stylesheet_directory_uri(); ?>/images/triangles.png"></span>
                        <h3>Oszczędność czasu</h3>
                    </div>
                    <div>
                        <p>Dbamy o to, aby Twoje zatrudnienie przebiegło szybko i sprawnie, a obie strony były
                            zadowolone ze współpracy.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <img class="photo-announcment" src="<?php echo get_stylesheet_directory_uri(); ?>/images/girl-red.png"
        alt="kobieta dziewczyna uśmiech praca">
</section>


<section class="customer-logos padding-top-xl padding-bottom-xl">
    <div class="container max-width-lg">
        <h1 class="text-center padding-bottom-xxxs">Zaufali nam</h1>
        <p class="text-center">Zaufało nam wiele firm i pracowników. <br>Dołącz do nich już dziś.</p>
        <ul class="flex flex-wrap flex-column flex-row@md gap-xl@md flex-center padding-top-xs">
            <li>
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/forbes.png">
            </li>
            <li>
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/google.png">
            </li>
            <li>
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/netflix.png">
            </li>
            <li>
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/hbo.png">
            </li>
            <li>
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/apple.png">
            </li>
            <li>
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/kia.png">
            </li>
        </ul>
    </div>
</section>



<section class="simple bg-purple padding-top-xxxl@md padding-bottom-xl">
    <img class="mobile-coffe " src="<?php echo get_stylesheet_directory_uri(); ?>/images/mobile-coffe.png"
        alt="iphone telefon kawa promocja aplikacja jobsy">
    <div class="container max-width-lg">
        <div class="grid">
            <div class="col-4@lg margin-top-lg@md">
                <h2 class="padding-bottom-xs">Jak proste jest <br>korzystanie z Jobsy</h2>
                <p>Opracowaliśmy naszą aplikację w taki sposób, aby korzystanie z niej było maksymalnie intuicyjne.
                    Rekrutacja i poszukiwanie pracy jeszcze nigdy nie były tak proste!</p>
                <a href="" class="btn btn--green margin-bottom-sm margin-right-xxl@lg"><span>Szukasz pracy, pobierz
                        aplikację</span></a>
                <a href="" class="btn btn--white"><span>Zacznij zatrudniać, zarejestruj się</span></a>
            </div>
            <div class="col@md">
                <div class="mac-hp">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/hp-macbook.png"
                        alt="macbook komputer jobsy">
                </div>
            </div>
        </div>
    </div>
</section>



<?php get_footer();