// --- jQuery Easing Fallback ---
// If the jQuery Easing plugin is not loaded, define a basic "swing" easing function.
if (typeof jQuery.easing === "undefined") {
    jQuery.easing = {
        def: "swing",
        swing: function (x, t, b, c, d) {
            // Basic swing easing (matches jQuery's default)
            return c * (t /= d) * t + b;
        }
    };
}

var clickCount = 0; // Initialize the click count
var timeoutId; // Initialize a variable to store the timeout ID

function initInshot() {
    "use strict";
    // loader ------------------
    $(".spinner").fadeOut(500, function () {
        $("#main").animate({ opacity: "1" }, 500);
    });

    // Background image ------------------
    $(".bg").each(function () {
        if ($(this).attr("data-bg")) {
            $(this).css("background-image", "url(" + $(this).data("bg") + ")");
        }
    });

    // css ------------------
    function dhk() {
        $(".alt").each(function () {
            $(this).css({
                "top": "50%",
                "margin-top": -$(this).height() / 2 + "px"
            });
        });
    }
    dhk();
    $(window).on("resize", dhk);

    // Isotope------------------
    if ($(".gallery-items").length) {
        var $gallery = $(".gallery-items").isotope({
            singleMode: true,
            columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
            itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three",
            transformsEnabled: true,
            transitionDuration: "700ms",
            resizable: true
        });
        $gallery.imagesLoaded(function () {
            $gallery.isotope("layout");
        });

        $(".gallery-filters").on("click", "a.gallery-filter", function (event) {
            event.preventDefault();
            var filterValue = $(this).attr("data-filter");
            $gallery.isotope({ filter: filterValue });
            $(".gallery-filters a.gallery-filter").removeClass("gallery-filter-active");
            $(this).addClass("gallery-filter-active");
        });
    }

    $(".gallery-item").on('touchstart', function() {
        $(this).trigger('hover');
    }).on('touchend', function(){
        $(this).trigger('hover');
    });

    // Swiper------------------
    if (typeof Swiper !== "undefined") {
        if ($(".slider-wrap").length > 0) {
            var g = new Swiper(".slider-wrap .swiper-container", {
                slidesPerView: "auto",
                centeredSlides: false,
                spaceBetween: 10,
                grabCursor: true,
                freeMode: true,
                mousewheelControl: true,
                mousewheelReleaseOnEdges: true,
                mousewheelSensitivity: 1,
                preloadImages: false,
                lazy: { loadPrevNext: true },
                updateOnImagesReady: true,
                pagination: '.swiper-pagination',
                paginationType: 'fraction',
                nextButton: ".swiper-button-next",
                prevButton: ".swiper-button-prev"
            });
        }
        if ($(".portfolio-wrap").length > 0) {
            var prwrap = new Swiper(".portfolio-wrap .swiper-container", {
                slidesPerView: "auto",
                centeredSlides: false,
                spaceBetween: 10,
                grabCursor: true,
                freeMode: true,
                mousewheelControl: true,
                mousewheelReleaseOnEdges: true,
                mousewheelSensitivity: 1,
                preloadImages: false,
                lazy: { loadPrevNext: true },
                updateOnImagesReady: true,
                scrollbar: '.swiper-scrollbar',
                scrollbarHide: false,
                nextButton: ".swiper-button-next",
                prevButton: ".swiper-button-prev"
            });
        }
        if ($(".center-carousel").length > 0) {
            var cf = $(".center-carousel").data("cen");
            var cfl = $(".center-carousel").data("loopcar");
            var gCenter = new Swiper(".center-carousel .swiper-container", {
                slidesPerView: "auto",
                centeredSlides: cf,
                spaceBetween: 20,
                grabCursor: true,
                freeMode: false,
                loop: cfl,
                mousewheelControl: true,
                mousewheelReleaseOnEdges: true,
                mousewheelSensitivity: 1,
                preloadImages: false,
                lazy: { loadPrevNext: true },
                updateOnImagesReady: true,
                pagination: '.swiper-pagination',
                paginationType: 'fraction',
                nextButton: ".swiper-button-next",
                prevButton: ".swiper-button-prev"
            });
        }
        if ($(".single-slider").length > 0) {
            var m = new Swiper(".single-slider .swiper-container", {
                pagination: ".swiper-pagination",
                paginationType: "fraction",
                effect: $(".single-slider").data("effects"),
                loop: true,
                grabCursor: true,
                autoHeight: true,
                nextButton: ".swiper-button-next",
                prevButton: ".swiper-button-prev"
            });
        }
        if ($(".album-list").length > 0) {
            var swiperAlbum = new Swiper('.album-list .swiper-container', {
                scrollbarHide: true,
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween: 5,
                grabCursor: true,
                freeMode: true,
            });
        }
    } else {
        console.warn("Swiper is not defined. Please ensure the Swiper library is loaded.");
    }

    $(".filter-buttons").on("click", function () {
        var value = $(this).attr('data-filter');
        $(".filter-buttons").removeClass("active-cat");
        $(this).addClass("active-cat");
 
        setTimeout(function () {
            if (value == "all") {
                $('.filter-gal .swiper-slide').show('1000', function () {
                    if (typeof prwrap !== "undefined") {
                        prwrap.update({ updateTranslate: true });
                    }
                    $('.portfolio-wrap .swiper-container .swiper-wrapper, .portfolio-wrap .swiper-container-horizontal>.swiper-scrollbar .swiper-scrollbar-drag')
                        .css({"transform": "translate3d(0px, 0px, 0px)"});
                });
            } else {
                $('.filter-gal .swiper-slide').not('.' + value).hide('3000', function () {
                    if (typeof prwrap !== "undefined") {
                        prwrap.update({ updateTranslate: true });
                    }
                    $('.portfolio-wrap .swiper-container .swiper-wrapper, .portfolio-wrap .swiper-container-horizontal>.swiper-scrollbar .swiper-scrollbar-drag')
                        .css({"transform": "translate3d(0px, 0px, 0px)"});
                });
                $('.filter-gal .swiper-slide').filter('.' + value).show('3000', function () {
                    if (typeof prwrap !== "undefined") {
                        prwrap.update({ updateTranslate: true });
                    }
                    $('.portfolio-wrap .swiper-container .swiper-wrapper, .portfolio-wrap .swiper-container-horizontal>.swiper-scrollbar .swiper-scrollbar-drag')
                        .css({"transform": "translate3d(0px, 0px, 0px)"});
                });
            }
        }, 900);
    });

    $(".shibtn").on("click", function () {
        $(".det-overlay").fadeIn(400);
        $(".hid-det-anim").animate({ left: 0 }, 400);
        return false;
    });
    $(".close-det, .det-overlay").on("click", function () {
        $(".det-overlay").fadeOut(400);
        $(".hid-det-anim").animate({ left: "-650px" }, 400);
        return false;
    });

    if ($(".fs-gallery-wrap").length > 0) {
        var h = $(".fs-gallery-wrap").data("autoplayslider"),
            i = $(".fs-gallery-wrap").data("slidereffect");
        var j = new Swiper(".fs-gallery-wrap .swiper-container", {
            autoplay: h,
            autoplayDisableOnInteraction: false,
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            effect: i,
            speed: 1000,
            grabCursor: true,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
            loop: true,
            mousewheelControl: true,
            mousewheelReleaseOnEdges: true,
            mousewheelSensitivity: 1,
        });
    }

    // Fullscreen functions ------------------
    function showfs() {
        $("#wrapper").addClass("fs-mode-active");
        $("footer.fixed-footer").animate({ bottom: "-100px" }, 200);
        $("header.main-header").animate({ top: "-100px" }, 200);
        $(".fs-mode").removeClass("isfs");
        $(".det-overlay, .fix-pr-det").addClass("isfsdet");
    }
    function hidefs() {
        $("#wrapper").removeClass("fs-mode-active");
        $("footer.fixed-footer").animate({ bottom: 0 }, 200);
        $("header.main-header").animate({ top: 0 }, 200);
        $(".fs-mode").addClass("isfs");
        $(".det-overlay, .fix-pr-det").removeClass("isfsdet");
    }
    $(".fs-mode").on("click", function () {
        if ($(".fs-mode").hasClass("isfs")) showfs();
        else hidefs();
        return false;
    });

    // LightGallery ------------------
    $(".image-popup, .single-popup-image").lightGallery({
        selector: "this",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        counter: false
    });
    var o = $(".lightgallery"),
        p = o.data("looped");
    o.lightGallery({
        selector: ".lightgallery a.popup-image, .lightgallery a.popgal",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        loop: p,
        counter: false
    });

    $(".filter-button").on("click", function () {
        $(".hid-filter").slideToggle(500);
    });
    $(".show-exfilter").on("click", function (a) {
        a.preventDefault();
        $(".product-mainfilter").slideToggle(500);
    });

    // appear ------------------
    $(".stats").appear(function () {
        $(".num").countTo();
    });
    $(".skillbar-box").appear(function () {
        $("div.skillbar-bg").each(function () {
            $(this).find(".custom-skillbar").delay(600).animate({
                width: $(this).attr("data-percent")
            }, 1500);
        });
    });

    // share ------------------
    var r = $(".share-wrapper");
    function shareOpen() {
        A(); // Assuming A() is defined elsewhere for closing search, etc.
        r.animate({ right: 0 }, 500);
        r.removeClass("isShare");
    }
    function shareClose() {
        r.animate({ right: "-130px" }, 500);
        r.addClass("isShare");
    }
    $(".show-share").on("click", function () {
        if (r.hasClass("isShare")) shareOpen();
        else shareClose();
    });
    var u = $(".share-container");
    u.share({
        networks: ["facebook", "pinterest", "googleplus", "twitter", "linkedin"]
    });

    // tabs ------------------
    $(".tabs-menu a").on("click", function (a) {
        a.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var b = $(this).attr("href");
        $(".tab-content").not(b).css("display", "none");
        $(b).fadeIn();
    });

    // scroll to ------------------
    $(".custom-scroll-link").on("click", function () {
        var a = 70;
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") || location.hostname == this.hostname) {
            var b = $(this.hash);
            b = b.length ? b : $("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                $("html,body").animate({ scrollTop: b.offset().top - a }, {
                    queue: false,
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
                return false;
            }
        }
    });

    // to top ------------------
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $(".to-top").fadeIn(500);
        } else {
            $(".to-top").fadeOut(500);
        }
    });
    $('<a class="to-top"><i class="fa fa-angle-up"></i></a>').appendTo("#main");
    $(".to-top").on("click", function (a) {
        a.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 800);
        return false;
    });

    // show/hide cart ------------------
    $(".show-cart").on("click", function () {
        $(".cart-overlay").fadeIn(400);
        $(".cart-modal").animate({ right: 0 }, 400);
        return false;
    });
    $(".cart-overlay, .close-cart").on("click", function () {
        $(".cart-overlay").fadeOut(400);
        $(".cart-modal").animate({ right: "-350px" }, 400);
        return false;
    });

    // Contact form ------------------
    $("#contactform").submit(function () {
        var a = $(this).attr("action");
        $("#message").slideUp(750, function () {
            $("#message").hide();
            $("#submit").attr("disabled", "disabled");
            $.post(a, {
                name: $("#name").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                comments: $("#comments").val(),
            }, function (a) {
                document.getElementById("message").innerHTML = a;
                $("#message").slideDown("slow");
                $("#submit").removeAttr("disabled");
                if (null != a.match("success")) $("#contactform").slideDown("slow");
            });
        });
        return false;
    });
    $("#contactform input, #contactform textarea").keyup(function () {
        $("#message").slideUp(1500);
    });

    // mailchimp ------------------
    $("#subscribe").ajaxChimp({
        language: "eng",
        url: "https://yahoo.us21.list-manage.com/subscribe/post?u=9761df42b55083878a3bce81b&amp;id=31aba40cba&amp;f_id=00d3e7e6f0"
    });
    $.ajaxChimp.translations.eng = {
        submit: "Submitting...",
        0: '<i class="fa fa-check"></i> We will be in touch soon!',
        1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
        2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
    };

    // Video ------------------
    var v = $(".background-youtube").data("vid");
    var f = $(".background-youtube").data("mv");
    $(".background-youtube").YTPlayer({
        fitToBackground: true,
        videoId: v,
        pauseOnScroll: true,
        mute: f,
        callback: function () {
            var a = $(".background-video").data("ytPlayer").player;
        }
    });
    var w = $(".background-vimeo").data("vim");
    $(".background-vimeo").append('<iframe src="//player.vimeo.com/video/' + w + '?background=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
    $(".video-holder").height($(".media-container").height());
    if ($(window).width() > 1024) {
        if ($(".video-holder").length > 0) {
            if ($(".media-container").height() / 9 * 16 > $(".media-container").width()) {
                $(".background-vimeo iframe").height($(".media-container").height()).width($(".media-container").height() / 9 * 16);
                $(".background-vimeo iframe").css({
                    "margin-left": -1 * $("iframe").width() / 2 + "px",
                    top: "-75px",
                    "margin-top": "0px"
                });
            } else {
                $(".background-vimeo iframe").width($(window).width()).height($(window).width() / 16 * 9);
                $(".background-vimeo iframe").css({
                    "margin-left": -1 * $("iframe").width() / 2 + "px",
                    "margin-top": -1 * $("iframe").height() / 2 + "px",
                    top: "50%"
                });
            }
        }
    } else if ($(window).width() < 760) {
        $(".video-holder").height($(".media-container").height());
        $(".background-vimeo iframe").height($(".media-container").height());
    } else {
        $(".video-holder").height($(".media-container").height());
        $(".background-vimeo iframe").height($(".media-container").height());
    }
    $(".video-container").css("width", $(window).width() + "px");
    $(".video-container").css("height", parseInt(720 / 1280 * $(window).width()) + "px");
    if ($(".video-container").height() < $(window).height()) {
        $(".video-container").css("height", $(window).height() + "px");
        $(".video-container").css("width", parseInt(1280 / 720 * $(window).height()) + "px");
    }

    // Navigation show/hide ------------------
    $(".menubutton").on("click", function () {
        $(".top-bar-menu").slideToggle(300);
    });
    $(".cat-button").on("click", function () {
        $(".category-nav-inner ul").slideToggle(300);
    });
    $(".product-cat-mains").matchHeight();
    var x = $(".show-fixed-search"),
        y = $(".fixed-search");
    function z() {
        x.removeClass("vissearch");
        y.fadeIn(300);
        t(); // Assuming function t() is defined elsewhere to hide search
    }
    function A() {
        x.addClass("vissearch");
        y.fadeOut(300);
    }
    x.on("click", function () {
        if ($(this).hasClass("vissearch")) z();
        else A();
    });
    $(".search-form-bg").on("click", function () {
        A();
    });
    $(".blog-btn").on("click", function () {
        $(this).parent(".blog-btn-filter").find("ul").slideToggle(500);
        return false;
    });
    $(".scroll-nav").addClass("black-bg");
    // Window scroll ------------------
    $(window).bind("scroll", function () {
        $("section").each(function () {
            var a = $(this);
            var sn = $(".scroll-nav");
            var b = a.position().top - $(window).scrollTop();
            if (b <= 0) {
                $("section").removeClass("current2");
                a.addClass("current2");
            } else {
                a.removeClass("current2");
                sn.removeClass("black-bg");
            }
            if ($(".current2").hasClass("parallax-section"))
                sn.addClass("black-bg");
            else
                sn.removeClass("black-bg");
        });
    });
    // Sidebar / menu ------------------
    var sbo = $(".sb-overlay"),
        sbm = $(".hiiden-sidebar-wrap"),
        sbmb = $(".sidebar-button-wrap");

    function B() {
        sbo.fadeIn(300);
        sbm.animate({ right: 0 }, 300);
        sbmb.removeClass("vis-m");
        $("html, body").addClass("hidhtml");
    }
    function C() {
        sbm.animate({ right: "-470px" }, 300);
        sbo.fadeOut(300);
        sbmb.addClass("vis-m");
        $("html, body").removeClass("hidhtml");
    }
    sbo.on("click", function () {
        C();
    });
    sbmb.on("click", function () {
        if ($(this).hasClass("vis-m")) B();
        else C();
    });
    $(".nav-button-wrap").on("click", function () {
        $(".nav-holder").slideToggle(500);
    });
    var D = function () {
        $(".box-item").on("touchstart", function () {
            $(this).trigger("hover");
        }).on("touchend", function () {
            $(this).trigger("hover");
        });
    };
    D();
    if ($(window).width() < 1064) {
        $(".nav-holder nav li").on("click", function () {
            $(this).find("ul").toggleClass("visul");
        });
        $(".nav-holder nav li ul").parent("li").addClass("lidec");
    }
}

function initparallax() {
    var a = {
        Android: function () { return navigator.userAgent.match(/Android/i); },
        BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
        iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
        Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
        Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
        any: function () { return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows(); }
    };
    var trueMobile = a.any();
    if (!trueMobile) {
        var b = new Scrollax();
        b.reload();
        b.init();
    } else {
        $(".background-video").remove();
    }
}

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

// Use window load to ensure all images and assets are fully loaded before initialization.
$(window).on('load', function () {
    console.log("Window fully loaded, initializing Swiper and other components.");
    initInshot();
    initparallax();
});
