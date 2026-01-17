(function($) {

    "use strict";

    /*------------------------------------
      HT Predefined Variables
    --------------------------------------*/
    var jQuerywindow = jQuery(window),
        jQuerydocument = jQuery(document),
        jQuerybody = jQuery('body');

    //Check if function exists
    jQuery.fn.exists = function() {
        return this.length > 0;
    };


    /*------------------------------------
      HT PreLoader
    --------------------------------------*/
    function preloader() {
        jQuery('#ht-preloader').fadeOut();
    };


    /*------------------------------------
      HT menu
    --------------------------------------*/
    function menu() {
        jQuery('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
            if (!jQuery(this).next().hasClass('show')) {
                jQuery(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
            }
            var jQuerysubMenu = jQuery(this).next(".dropdown-menu");
            jQuerysubMenu.toggleClass('show');

            jQuery(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
                jQuery('.dropdown-submenu .show').removeClass("show");
            });

            return false;
        });
    };

    /*------------------------------------
      HT Counter
    --------------------------------------*/
    function counter() {
        var elementSelector = jQuery('.count-number');
        elementSelector.each(function() {
            elementSelector.appear(function(e) {
                var el = this;
                var updateData = jQuery(el).attr("data-count");
                var od = new Odometer({
                    el: el,
                    format: 'd',
                    duration: 2000
                });
                od.update(updateData);
            });
        });
    };


    /*------------------------------------
      HT Magnific Popup
    --------------------------------------*/
    function magnificpopup() {
        jQuery('.popup-gallery').magnificPopup({
            delegate: 'a.popup-img',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        });
        if (jQuery(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
            jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }

    };


    /*------------------------------------
      HT Scroll to top
    --------------------------------------*/
    function scrolltop() {
        var $backtotop = $('.scroll-top').length;
        if ($backtotop != '') {
            var progressPath = document.querySelector('.scroll-top path');
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
            var updateProgress = function() {
                var scroll = jQuery(window).scrollTop();
                var height = jQuery(document).height() - jQuery(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            }
            updateProgress();
            jQuery(window).scroll(updateProgress);
            var offset = 50;
            var duration = 550;
            jQuery(window).on('scroll', function() {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery('.scroll-top').addClass('active-progress');
                } else {
                    jQuery('.scroll-top').removeClass('active-progress');
                }
            });
            jQuery('.scroll-top').on('click', function(event) {
                event.preventDefault();
                jQuery('html, body').animate({
                    scrollTop: 0
                }, duration);
                return false;
            })
        };
    };


    /*------------------------------------
      HT Fixed Header
    --------------------------------------*/
    function fxheader() {
        jQuery(window).on('scroll', function() {
            var sticky = jQuery('#header-wrap'),
                scroll = jQuery(window).scrollTop();

            if (scroll >= 300) sticky.addClass('fixed-header');
            else sticky.removeClass('fixed-header');
        });
    };

    /*------------------------------------------
      HT Text Color, Background Color And Image
    ---------------------------------------------*/
    function databgcolor() {
        jQuery('[data-bg-color]').each(function(index, el) {
            jQuery(el).css('background-color', jQuery(el).data('bg-color'));
        });
        jQuery('[data-text-color]').each(function(index, el) {
            jQuery(el).css('color', jQuery(el).data('text-color'));
        });
        jQuery('[data-bg-img]').each(function() {
            jQuery(this).css('background-image', 'url(' + jQuery(this).data("bg-img") + ')');
        });
    };

    /*------------------------------------
      HT Mixitup
    --------------------------------------*/
    var $mixitup = jQuery('.mix-container').length;

    function mixitupsec() {
        if ($mixitup != '') {
            var containerEl = document.querySelector('.mix-container');
            var mixer = mixitup(containerEl);
        };
    };

    /*------------------------------------
      HT Activeclass
    --------------------------------------*/
    function activeclass() {
        jQuery('.featured-item').mouseenter(function() {
            jQuery('.featured-item.featured-active').removeClass('featured-active');
            jQuery(this).removeClass('.featured-item').addClass('featured-active');
        });

        jQuery('.service-item').mouseenter(function() {
            jQuery('.service-item.service-active').removeClass('service-active');
            jQuery(this).removeClass('.service-item').addClass('service-active');
        });

        jQuery('.tab-a').click(function() {
            jQuery(".ht-tab-pane").removeClass('tab-active');
            jQuery(".ht-tab-pane[id='" + jQuery(this).attr('href') + "']").addClass("tab-active");
            jQuery(".tab-a").removeClass('active-a');
            jQuery(this).parent().find(".tab-a").addClass('active-a');
            return false;
        });
    };

    /*------------------------------------
      HT ProgressBar
    --------------------------------------*/
    function progressbar() {
        var progressBar = jQuery('.progress');
        if (progressBar.length) {
            progressBar.each(function() {
                var Self = jQuery(this);
                Self.appear(function() {
                    var progressValue = Self.data('value');

                    Self.find('.progress-bar').animate({
                        width: progressValue + '%'
                    }, 1000);
                });
            })
        }
    };

    /*------------------------------------
      HT Countdown
    --------------------------------------*/
    function countdown() {
        jQuery('.countdown').each(function() {
            var jQuerythis = jQuery(this),
                finalDate = jQuery(this).data('countdown');
            jQuerythis.countdown(finalDate, function(event) {
                jQuery(this).html(event.strftime('<li><span>%-D</span><p>Days</p></li>' + '<li><span>%-H</span><p>Hours</p></li>' + '<li><span>%-M</span><p>Minutes</p></li>' + '<li><span>%S</span><p>Seconds</p></li>'));
            });
        });
    };


    /*------------------------------------
      HT Contact Form
    --------------------------------------*/
    function contactform() {
        // when the form is submitted
        jQuery('#contact-form, #main-form').on('submit', function(e) {

            // if the validator does not prevent form submit
            if (!e.isDefaultPrevented()) {
                var url = "php/contact.php";

                // POST values in the background the the script URL
                jQuery.ajax({
                    type: "POST",
                    url: url,
                    data: jQuery(this).serialize(),
                    success: function(data) {
                        // data = JSON object that contact.php returns

                        // we recieve the type of the message: success x danger and apply it to the 
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        // let's compose Bootstrap alert box HTML
                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                        // If we have messageAlert and messageText
                        if (messageAlert && messageText) {
                            // inject the alert to .messages div in our form
                            jQuery('#contact-form, #main-form').find('.messages').html(alertBox).show().delay(2000).fadeOut('slow');
                            // empty the form
                            jQuery('#contact-form, #main-form')[0].reset();
                        }
                    }
                });
                return false;
            }
        })
    };

    /*------------------------------------
      HT btnproduct
    --------------------------------------*/
    function btnproduct() {
        jQuery('.btn-product-up').on('click', function(e) {
            e.preventDefault();
            var numProduct = Number(jQuery(this).next().val());
            if (numProduct > 1) jQuery(this).next().val(numProduct - 1);
        });
        jQuery('.btn-product-down').on('click', function(e) {
            e.preventDefault();
            var numProduct = Number(jQuery(this).prev().val());
            jQuery(this).prev().val(numProduct + 1);
        });
    };

    /*------------------------------------
      HT Search
    --------------------------------------*/
    function search() {
        // Search Toggle
        jQuery("#search-input-box").hide();
        jQuery("#search, #search-sticky").on("click", function() {
            jQuery("#search-input-box").slideToggle();
            jQuery("#search-input").focus();
        });
        jQuery("#close-search").on("click", function() {
            jQuery('#search-input-box').slideUp(500);
        });
    };

    /*------------------------------------
      HT Particles
    --------------------------------------*/

    function particles() {
        jQuery("#particles-js").each(function() {
            particlesJS({
                "particles": {
                    "number": {
                        "value": 160,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#1360ef"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#f94f15"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 1,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 4,
                            "size_min": 0.3,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": false,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 600
                        }
                    }
                },
                "retina_detect": true
            });

        })
    }



    /*------------------------------------
      HT Window load and functions
    --------------------------------------*/
    jQuery(document).ready(function() {
        menu(),
            counter(),
            scrolltop(),
            fxheader(),
            databgcolor(),
            activeclass(),
            progressbar(),
            countdown(),
            contactform(),
            btnproduct(),
            search(),
            particles();
    });

    jQuery(window).on('load', function() {
        preloader(),
            magnificpopup(),
            mixitupsec();
    });

})(jQuery);