// smooth scrolling when clicking navbar
var SmoothScroll = {

  $clickText: $('.navbar .nav-link, .scroll-link'),

  bindText: function() {
    this.$clickText.on("click", function(event) {

      // only scroll if on HP, otherwise open link regularly
      var onHomePage = location.pathname=="/";
      if (onHomePage) {
        event.preventDefault();
      }

      // $(this) refers to nav-link element.
      // if icon is clicked, event automatically bubbles
      // up and triggers this nav-link element.
      var destElement = $(this).attr('data-target');

      SmoothScroll.scroll(destElement);
    });
  },

  scroll: function(destElement) {

    $('html, body').animate({
        scrollTop: $(destElement).offset().top
    }, 800);
  },

  init: function() {
    this.bindText();
  },

};

SmoothScroll.init();





$('body').on('click', '.clickable', function() {
  window.location.href = this.getAttribute("data-location");
});

// bind to lowest element that exists when loading page
$('body').on('click', '.expand', function() {
  $(this).html("");
});












//https://github.com/mattboldt/typed.js/
// import Typed from 'typed.js';
var options = {
  strings: ["Thanks for dropping by!^500",
            "Just start scrolling and see it all :)"
           ],
  typeSpeed: 45,
  smartBackspace: true, // Default value
  backSpeed: 20,
  startDelay: 1500,
}

var typed = new Typed(".element", options);



// change elements of first page when  scrolling down
$(window).scroll(function() {

	// height of window on start
	var vh = window.innerHeight;

  if ($(this).scrollTop()>0.3*vh) {
  	$('#greetings').fadeOut();
    $('.navbar').addClass('navbar-bg');
  }
  else {
  	$('#greetings').fadeIn();
    $('.navbar').removeClass('navbar-bg');
  }
});






// Some click-copy logic: instantiate clipboard
var cb = new ClipboardJS('.btn-copy');



// so bootstrap tooltips are rendered nicely
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('.btn-copy').attr('data-placement', 'right');
var copyTitle = "click to copy";
$('.btn-copy').attr('title', copyTitle);


cb.on('success', function(e) {

    var btn = $(e.trigger);

    // set and display text
		btn.tooltip('hide')
        .attr('data-original-title', "copied!")
        .tooltip('show');

    // reset back to original text for future copies
    setTimeout(function(){
   		btn.tooltip()
   		   .attr('data-original-title', copyTitle);
    }, 1000);

});


// highlight button as user hovers over command
$(".bash").on("mouseover mouseout", function () {
    this.querySelector('.btn-copy').classList.toggle('btn-hide');
});


