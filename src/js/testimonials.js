$(function () {

  // Testimonials
  $('#testimonials-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        slideBy:3,
        items: 3
      }
    },
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    nav: false,
    autoWidth:false,
    // onInitialized: function () {
    //   $('#carouselTestimonials3').css({opacity: 0});
    //   setTimeout(function () {
    //     $('#carouselTestimonials3').find('.parallax-window').parallax({
    //       imageSrc: '../assets/img/backgrounds/testimonials.png'
    //     });
    //     $('#carouselTestimonials3').animate({opacity: 1}, 1000);
    //   },1000)
    // }
  });
})
